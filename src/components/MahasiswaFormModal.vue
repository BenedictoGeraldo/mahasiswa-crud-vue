<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Mahasiswa, ModalMode } from '@/types'

interface Props {
  isOpen: boolean
  mode: ModalMode
  mahasiswaData?: Mahasiswa | null
}

const props = withDefaults(defineProps<Props>(), {
  mahasiswaData: null,
})

const emit = defineEmits<{
  close: []
  submit: [data: Omit<Mahasiswa, 'id'>]
}>()

const form = ref({
  nim: '',
  nama: '',
  jurusan: '',
  angkatan: new Date().getFullYear(),
})

const errors = ref({
  nim: '',
  nama: '',
  jurusan: '',
  angkatan: '',
})

watch(
  () => props.isOpen,
  (open) => {
    if (open) {
      if (props.mode === 'edit' && props.mahasiswaData) {
        form.value = {
          nim: props.mahasiswaData.nim,
          nama: props.mahasiswaData.nama,
          jurusan: props.mahasiswaData.jurusan,
          angkatan: props.mahasiswaData.angkatan,
        }
      } else {
        form.value = {
          nim: '',
          nama: '',
          jurusan: '',
          angkatan: new Date().getFullYear(),
        }
      }
      errors.value = { nim: '', nama: '', jurusan: '', angkatan: '' }
    }
  },
)

const title = computed(() => (props.mode === 'add' ? 'Tambah Mahasiswa' : 'Edit Mahasiswa'))
const submitLabel = computed(() => (props.mode === 'add' ? 'Simpan' : 'Update'))

const jurusanOptions = [
  'Teknik Informatika',
  'Sistem Informasi',
  'Manajemen Informatika',
  'Teknik Komputer',
  'Ilmu Komputer',
]

function validate(): boolean {
  let valid = true
  errors.value = { nim: '', nama: '', jurusan: '', angkatan: '' }

  if (!form.value.nim.trim()) {
    errors.value.nim = 'NIM wajib diisi'
    valid = false
  }
  if (!form.value.nama.trim()) {
    errors.value.nama = 'Nama wajib diisi'
    valid = false
  }
  if (!form.value.jurusan) {
    errors.value.jurusan = 'Program studi wajib dipilih'
    valid = false
  }
  if (!form.value.angkatan || form.value.angkatan < 2000 || form.value.angkatan > 2099) {
    errors.value.angkatan = 'Angkatan tidak valid'
    valid = false
  }

  return valid
}

function handleSubmit() {
  if (!validate()) return
  emit('submit', { ...form.value })
}

function handleOverlayClick(e: MouseEvent) {
  if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
    emit('close')
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-overlay" @click="handleOverlayClick">
        <div class="modal-card" role="dialog" :aria-label="title">

          <!-- Header -->
          <div class="modal-header">
            <h2 class="modal-title">{{ title }}</h2>
            <button class="modal-close" @click="emit('close')" aria-label="Tutup modal">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Form -->
          <form class="modal-form" @submit.prevent="handleSubmit" novalidate>

            <!-- Row: NIM + Angkatan -->
            <div class="form-row">
              <div class="form-group">
                <label for="nim">NIM</label>
                <input
                  id="nim"
                  v-model="form.nim"
                  type="text"
                  placeholder="Masukkan NIM"
                  :class="{ 'is-error': errors.nim }"
                />
                <span v-if="errors.nim" class="error-msg">{{ errors.nim }}</span>
              </div>

              <div class="form-group">
                <label for="angkatan">Angkatan</label>
                <input
                  id="angkatan"
                  v-model.number="form.angkatan"
                  type="number"
                  placeholder="Contoh: 2023"
                  :class="{ 'is-error': errors.angkatan }"
                />
                <span v-if="errors.angkatan" class="error-msg">{{ errors.angkatan }}</span>
              </div>
            </div>

            <!-- Nama -->
            <div class="form-group">
              <label for="nama">Nama Lengkap</label>
              <input
                id="nama"
                v-model="form.nama"
                type="text"
                placeholder="Masukkan nama lengkap"
                :class="{ 'is-error': errors.nama }"
              />
              <span v-if="errors.nama" class="error-msg">{{ errors.nama }}</span>
            </div>

            <!-- Jurusan -->
            <div class="form-group">
              <label for="jurusan">Program Studi</label>
              <select id="jurusan" v-model="form.jurusan" :class="{ 'is-error': errors.jurusan }">
                <option value="" disabled>Pilih program studi</option>
                <option v-for="j in jurusanOptions" :key="j" :value="j">{{ j }}</option>
              </select>
              <span v-if="errors.jurusan" class="error-msg">{{ errors.jurusan }}</span>
            </div>

            <!-- Actions -->
            <div class="modal-actions">
              <button type="button" class="btn btn-cancel" @click="emit('close')">Batal</button>
              <button type="submit" class="btn btn-primary">{{ submitLabel }}</button>
            </div>

          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-card {
  background: #fff;
  border-radius: 12px;
  width: 100%;
  max-width: 520px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #edf0ea;
  background: #f8faf6;
}

.modal-title {
  font-size: 1rem;
  font-weight: 700;
  color: #2c3e2c;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  cursor: pointer;
  color: #8a9a8a;
  padding: 4px;
  border-radius: 5px;
  transition: background 0.15s, color 0.15s;
  display: flex;
  align-items: center;
}

.modal-close:hover {
  background: #edf0ea;
  color: #2c3e2c;
}

.modal-form {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.875rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #3a4e3a;
}

.form-group input,
.form-group select {
  padding: 0.5625rem 0.75rem;
  border: 1px solid #cdd8cd;
  border-radius: 7px;
  font-size: 0.9375rem;
  color: #2c3e2c;
  background: #fff;
  transition: border-color 0.18s, box-shadow 0.18s;
  outline: none;
  font-family: inherit;
}

.form-group input::placeholder {
  color: #b0c0b0;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #7d8f69;
  box-shadow: 0 0 0 3px rgba(125, 143, 105, 0.12);
}

.form-group input.is-error,
.form-group select.is-error {
  border-color: #c04040;
}

.error-msg {
  font-size: 0.8rem;
  color: #c04040;
}

.modal-actions {
  display: flex;
  gap: 0.625rem;
  justify-content: flex-end;
  padding-top: 0.25rem;
}

.btn {
  padding: 0.5625rem 1.25rem;
  border-radius: 7px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: background 0.15s;
  font-family: inherit;
}

.btn-cancel {
  background: #f0f4ee;
  color: #4a6a4a;
  border: 1px solid #cdd8cd;
}

.btn-cancel:hover { background: #e4eae2; }

.btn-primary {
  background: #7d8f69;
  color: #fff;
}

.btn-primary:hover { background: #6a7a58; }

/* Transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.22s ease;
}

.modal-enter-active .modal-card,
.modal-leave-active .modal-card {
  transition: transform 0.22s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-card {
  transform: scale(0.94) translateY(16px);
}

.modal-leave-to .modal-card {
  transform: scale(0.94) translateY(16px);
}
</style>
