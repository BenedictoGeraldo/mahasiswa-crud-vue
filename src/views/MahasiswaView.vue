<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMahasiswaStore } from '@/composables/useMahasiswaStore'
import MahasiswaFormModal from '@/components/MahasiswaFormModal.vue'
import DeleteConfirmModal from '@/components/DeleteConfirmModal.vue'
import type { Mahasiswa, ModalMode } from '@/types'

const router = useRouter()
const { mahasiswaList, addMahasiswa, updateMahasiswa, deleteMahasiswa } = useMahasiswaStore()

const isFormModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const modalMode = ref<ModalMode>('add')
const selectedMahasiswa = ref<Mahasiswa | null>(null)

function openAddModal() { modalMode.value = 'add'; selectedMahasiswa.value = null; isFormModalOpen.value = true }
function openEditModal(m: Mahasiswa) { modalMode.value = 'edit'; selectedMahasiswa.value = { ...m }; isFormModalOpen.value = true }
function openDeleteModal(m: Mahasiswa) { selectedMahasiswa.value = { ...m }; isDeleteModalOpen.value = true }

function handleFormSubmit(data: Omit<Mahasiswa, 'id'>) {
  if (modalMode.value === 'add') addMahasiswa(data)
  else if (selectedMahasiswa.value) updateMahasiswa(selectedMahasiswa.value.id, data)
  isFormModalOpen.value = false
}
function handleDeleteConfirm() {
  if (selectedMahasiswa.value) deleteMahasiswa(selectedMahasiswa.value.id)
  isDeleteModalOpen.value = false
}
function handleLogout() { router.push('/login') }
</script>

<template>
  <div class="min-h-screen bg-[#f0f1ee] flex flex-col">

    <!-- Navbar -->
    <nav class="sticky top-0 z-50 bg-white border-b border-[#e4e8e0] h-16 flex items-center justify-between px-6 md:px-8">
      <span class="text-2xl md:text-3xl font-bold text-[#2c3a2c] tracking-tight">QuickO</span>
      <button @click="handleLogout" title="Logout" class="p-0 bg-transparent border-none cursor-pointer rounded-full">
        <img src="https://i.pravatar.cc/48?img=47" alt="avatar" class="w-11 h-11 rounded-full object-cover border-2 border-[#e4e8e0]" />
      </button>
    </nav>

    <!-- Main -->
    <main class="flex-1 p-4 md:p-7">
      <div class="bg-white rounded-2xl border border-[#e8ebe4] shadow-sm p-5 md:p-8">

        <!-- Greeting -->
        <h1 class="text-xl md:text-2xl font-semibold text-[#6b7b6b] mb-5">Halo, Username</h1>

        <!-- Toolbar -->
        <div class="flex justify-end mb-3">
          <button
            id="btn-tambah-mahasiswa"
            @click="openAddModal"
            class="px-4 py-2 bg-[#7a9068] hover:bg-[#687d57] text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer font-[inherit]"
          >
            Tambah Data
          </button>
        </div>

        <!-- Table (horizontal scroll on mobile) -->
        <div class="overflow-x-auto">
          <table class="w-full border-collapse text-sm md:text-base min-w-[520px]">
            <thead>
              <tr class="bg-[#f5f6f3] border-t border-b border-[#e8ebe4]">
                <th class="text-left px-4 py-3 text-sm font-semibold text-[#4a5e4a]">Mahasiswa</th>
                <th class="text-left px-4 py-3 text-sm font-semibold text-[#4a5e4a]">Nim</th>
                <th class="text-left px-4 py-3 text-sm font-semibold text-[#4a5e4a]">Program Studi</th>
                <th class="text-left px-4 py-3 text-sm font-semibold text-[#4a5e4a]">Angkatan</th>
                <th class="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="mahasiswaList.length === 0">
                <td colspan="5" class="text-center text-[#9aaa9a] py-10 text-base">
                  Belum ada data mahasiswa.
                </td>
              </tr>
              <tr
                v-for="m in mahasiswaList"
                :key="m.id"
                class="border-b border-[#f0f2ee] last:border-b-0 hover:bg-[#f8faf6] transition-colors"
              >
                <td class="px-4 py-3 text-[#2c3a2c]">{{ m.nama }}</td>
                <td class="px-4 py-3 text-[#2c3a2c]">{{ m.nim }}</td>
                <td class="px-4 py-3 text-[#2c3a2c]">{{ m.jurusan }}</td>
                <td class="px-4 py-3 text-[#2c3a2c]">{{ m.angkatan }}</td>
                <td class="px-4 py-3 text-right whitespace-nowrap w-16">
                  <!-- Edit -->
                  <button
                    :id="`btn-edit-${m.id}`"
                    @click="openEditModal(m)"
                    title="Edit"
                    class="inline-flex items-center justify-center p-1.5 text-[#8aaa8a] hover:text-[#4a5e4a] hover:bg-[#eef2ea] rounded transition-colors cursor-pointer bg-transparent border-none"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                  <!-- Delete -->
                  <button
                    :id="`btn-delete-${m.id}`"
                    @click="openDeleteModal(m)"
                    title="Hapus"
                    class="inline-flex items-center justify-center p-1.5 text-[#c0a0a0] hover:text-[#c04040] hover:bg-[#fde8e8] rounded transition-colors cursor-pointer bg-transparent border-none"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                      <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </main>
  </div>

  <MahasiswaFormModal
    :is-open="isFormModalOpen"
    :mode="modalMode"
    :mahasiswa-data="selectedMahasiswa"
    @close="isFormModalOpen = false"
    @submit="handleFormSubmit"
  />
  <DeleteConfirmModal
    :is-open="isDeleteModalOpen"
    :mahasiswa="selectedMahasiswa"
    @close="isDeleteModalOpen = false"
    @confirm="handleDeleteConfirm"
  />
</template>
