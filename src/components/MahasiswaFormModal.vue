<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Mahasiswa, ModalMode } from '@/types'

interface Props {
  isOpen: boolean
  mode: ModalMode
  mahasiswaData?: Mahasiswa | null
}

const props = withDefaults(defineProps<Props>(), { mahasiswaData: null })
const emit = defineEmits<{ close: []; submit: [data: Omit<Mahasiswa, 'id'>] }>()

const form = ref({ nim: '', nama: '', jurusan: '', angkatan: new Date().getFullYear() })
const errors = ref({ nim: '', nama: '', jurusan: '', angkatan: '' })

watch(() => props.isOpen, (open) => {
  if (open) {
    if (props.mode === 'edit' && props.mahasiswaData) {
      form.value = { nim: props.mahasiswaData.nim, nama: props.mahasiswaData.nama, jurusan: props.mahasiswaData.jurusan, angkatan: props.mahasiswaData.angkatan }
    } else {
      form.value = { nim: '', nama: '', jurusan: '', angkatan: new Date().getFullYear() }
    }
    errors.value = { nim: '', nama: '', jurusan: '', angkatan: '' }
  }
})

const title = computed(() => props.mode === 'add' ? 'Tambah Mahasiswa' : 'Edit Mahasiswa')
const submitLabel = computed(() => props.mode === 'add' ? 'Simpan' : 'Update')

const jurusanOptions = ['Teknik Informatika', 'Sistem Informasi', 'Manajemen Informatika', 'Teknik Komputer', 'Ilmu Komputer']

function validate() {
  let valid = true
  errors.value = { nim: '', nama: '', jurusan: '', angkatan: '' }
  if (!form.value.nim.trim()) { errors.value.nim = 'NIM wajib diisi'; valid = false }
  if (!form.value.nama.trim()) { errors.value.nama = 'Nama wajib diisi'; valid = false }
  if (!form.value.jurusan) { errors.value.jurusan = 'Program studi wajib dipilih'; valid = false }
  if (!form.value.angkatan || form.value.angkatan < 2000 || form.value.angkatan > 2099) { errors.value.angkatan = 'Angkatan tidak valid'; valid = false }
  return valid
}

function handleSubmit() { if (!validate()) return; emit('submit', { ...form.value }) }
function handleOverlayClick(e: MouseEvent) { if ((e.target as HTMLElement).classList.contains('modal-overlay')) emit('close') }
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm"
        @click="handleOverlayClick"
      >
        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div v-if="isOpen" class="bg-white rounded-2xl w-full max-w-[520px] shadow-2xl overflow-hidden" role="dialog" :aria-label="title">

            <!-- Header -->
            <div class="flex items-center justify-between px-6 py-4 bg-[#f8faf6] border-b border-[#edf0ea]">
              <h2 class="text-base font-bold text-[#2c3e2c]">{{ title }}</h2>
              <button @click="emit('close')" class="text-[#8a9a8a] hover:text-[#2c3e2c] hover:bg-[#edf0ea] p-1 rounded-md transition-colors bg-transparent border-none cursor-pointer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" novalidate class="flex flex-col gap-4 p-6">

              <!-- NIM + Angkatan row -->
              <div class="grid grid-cols-2 gap-3.5">
                <div class="flex flex-col gap-1">
                  <label for="nim" class="text-sm font-semibold text-[#3a4e3a]">NIM</label>
                  <input id="nim" v-model="form.nim" type="text" placeholder="Masukkan NIM"
                    :class="['w-full px-3 py-2.5 border rounded-lg text-sm text-[#2c3e2c] outline-none transition-colors font-[inherit] bg-white', errors.nim ? 'border-red-400' : 'border-[#cdd8cd] focus:border-[#7d8f69]']" />
                  <span v-if="errors.nim" class="text-xs text-red-500">{{ errors.nim }}</span>
                </div>
                <div class="flex flex-col gap-1">
                  <label for="angkatan" class="text-sm font-semibold text-[#3a4e3a]">Angkatan</label>
                  <input id="angkatan" v-model.number="form.angkatan" type="number" placeholder="2023"
                    :class="['w-full px-3 py-2.5 border rounded-lg text-sm text-[#2c3e2c] outline-none transition-colors font-[inherit] bg-white', errors.angkatan ? 'border-red-400' : 'border-[#cdd8cd] focus:border-[#7d8f69]']" />
                  <span v-if="errors.angkatan" class="text-xs text-red-500">{{ errors.angkatan }}</span>
                </div>
              </div>

              <!-- Nama -->
              <div class="flex flex-col gap-1">
                <label for="nama" class="text-sm font-semibold text-[#3a4e3a]">Nama Lengkap</label>
                <input id="nama" v-model="form.nama" type="text" placeholder="Masukkan nama lengkap"
                  :class="['w-full px-3 py-2.5 border rounded-lg text-sm text-[#2c3e2c] outline-none transition-colors font-[inherit] bg-white', errors.nama ? 'border-red-400' : 'border-[#cdd8cd] focus:border-[#7d8f69]']" />
                <span v-if="errors.nama" class="text-xs text-red-500">{{ errors.nama }}</span>
              </div>

              <!-- Jurusan -->
              <div class="flex flex-col gap-1">
                <label for="jurusan" class="text-sm font-semibold text-[#3a4e3a]">Program Studi</label>
                <select id="jurusan" v-model="form.jurusan"
                  :class="['w-full px-3 py-2.5 border rounded-lg text-sm text-[#2c3e2c] outline-none transition-colors font-[inherit] bg-white', errors.jurusan ? 'border-red-400' : 'border-[#cdd8cd] focus:border-[#7d8f69]']">
                  <option value="" disabled>Pilih program studi</option>
                  <option v-for="j in jurusanOptions" :key="j" :value="j">{{ j }}</option>
                </select>
                <span v-if="errors.jurusan" class="text-xs text-red-500">{{ errors.jurusan }}</span>
              </div>

              <!-- Actions -->
              <div class="flex gap-2.5 justify-end pt-1">
                <button type="button" @click="emit('close')"
                  class="px-5 py-2 bg-[#f0f4ee] hover:bg-[#e4eae2] text-[#4a6a4a] border border-[#cdd8cd] rounded-lg text-sm font-semibold cursor-pointer transition-colors font-[inherit]">
                  Batal
                </button>
                <button type="submit"
                  class="px-5 py-2 bg-[#7d8f69] hover:bg-[#6a7a58] text-white rounded-lg text-sm font-semibold cursor-pointer transition-colors font-[inherit]">
                  {{ submitLabel }}
                </button>
              </div>

            </form>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
