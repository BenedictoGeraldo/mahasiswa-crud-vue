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

function openAddModal() {
  modalMode.value = 'add'
  selectedMahasiswa.value = null
  isFormModalOpen.value = true
}

function openEditModal(m: Mahasiswa) {
  modalMode.value = 'edit'
  selectedMahasiswa.value = { ...m }
  isFormModalOpen.value = true
}

function openDeleteModal(m: Mahasiswa) {
  selectedMahasiswa.value = { ...m }
  isDeleteModalOpen.value = true
}

function handleFormSubmit(data: Omit<Mahasiswa, 'id'>) {
  if (modalMode.value === 'add') addMahasiswa(data)
  else if (selectedMahasiswa.value) updateMahasiswa(selectedMahasiswa.value.id, data)
  isFormModalOpen.value = false
}

function handleDeleteConfirm() {
  if (selectedMahasiswa.value) deleteMahasiswa(selectedMahasiswa.value.id)
  isDeleteModalOpen.value = false
}

function handleLogout() {
  router.push('/login')
}
</script>

<template>
  <div class="page">

    <!-- ── Navbar ───────────────────────────────────────────── -->
    <nav class="navbar">
      <span class="nav-brand">QuickO</span>
      <button class="avatar-wrap" @click="handleLogout" title="Logout">
        <img
          src="https://i.pravatar.cc/36?img=12"
          alt="avatar"
          class="avatar-img"
        />
      </button>
    </nav>

    <!-- ── Main ─────────────────────────────────────────────── -->
    <main class="main">
      <!-- Big white card (wraps greeting + table like Figma) -->
      <div class="content-card">

        <!-- Greeting -->
        <h1 class="greeting">Halo, Username</h1>

        <!-- Table section -->
        <div class="table-section">
          <!-- Tambah Data inside card, right-aligned above table -->
          <div class="table-toolbar">
            <button class="btn-tambah" @click="openAddModal" id="btn-tambah-mahasiswa">
              Tambah Data
            </button>
          </div>

          <table class="tbl">
            <thead>
              <tr>
                <th>Mahasiswa</th>
                <th>Nim</th>
                <th>Program Studi</th>
                <th>Angkatan</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="mahasiswaList.length === 0">
                <td colspan="5" class="empty">Belum ada data mahasiswa.</td>
              </tr>
              <tr v-for="m in mahasiswaList" :key="m.id">
                <td>{{ m.nama }}</td>
                <td>{{ m.nim }}</td>
                <td>{{ m.jurusan }}</td>
                <td>{{ m.angkatan }}</td>
                <td class="td-actions">
                  <button
                    class="icon-btn"
                    @click="openEditModal(m)"
                    :id="`btn-edit-${m.id}`"
                    title="Edit"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                  <button
                    class="icon-btn icon-btn--red"
                    @click="openDeleteModal(m)"
                    :id="`btn-delete-${m.id}`"
                    title="Hapus"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                      <path d="M10 11v6M14 11v6"/>
                      <path d="M9 6V4h6v2"/>
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

  <!-- Modals -->
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

<style scoped>
/* ── Page ─────────────────────────────────────────────── */
.page {
  min-height: 100vh;
  background: #f0f1ee;
  display: flex;
  flex-direction: column;
}

/* ── Navbar ───────────────────────────────────────────── */
.navbar {
  background: #fff;
  height: 56px;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e8ebe4;
}

.nav-brand {
  font-size: 1.125rem;
  font-weight: 700;
  color: #2c3e2c;
  letter-spacing: -0.01em;
}

.avatar-wrap {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
}

.avatar-img {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: block;
  object-fit: cover;
}

/* ── Main ─────────────────────────────────────────────── */
.main {
  flex: 1;
  padding: 1.5rem 2rem;
}

/* ── Big white content card (matches Figma exactly) ───── */
.content-card {
  background: #fff;
  border-radius: 12px;
  padding: 1.75rem 1.75rem 1.75rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  border: 1px solid #e8ebe4;
}

.greeting {
  font-size: 1.375rem;
  font-weight: 700;
  color: #2c3e2c;
  margin: 0 0 1.5rem 0;
}

/* ── Table section ────────────────────────────────────── */
.table-section {
  display: flex;
  flex-direction: column;
}

/* ── Toolbar ──────────────────────────────────────────── */
.table-toolbar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
}

.btn-tambah {
  padding: 0.4375rem 1rem;
  background: #7d8f69;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s;
}

.btn-tambah:hover { background: #6a7a58; }

/* ── Table ────────────────────────────────────────────── */
.tbl {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.tbl thead tr {
  background: #f5f6f3;
}

.tbl th {
  padding: 0.625rem 0.875rem;
  text-align: left;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #4a5e4a;
  border-top: 1px solid #e8ebe4;
  border-bottom: 1px solid #e8ebe4;
}

.tbl td {
  padding: 0.625rem 0.875rem;
  color: #2c3e2c;
  border-bottom: 1px solid #f0f2ee;
  vertical-align: middle;
}

.tbl tbody tr:last-child td {
  border-bottom: none;
}

.tbl tbody tr:hover {
  background: #f8faf6;
}

.empty {
  text-align: center;
  color: #9aaa9a;
  padding: 2rem !important;
}

/* ── Action buttons ───────────────────────────────────── */
.td-actions {
  width: 56px;
  white-space: nowrap;
  text-align: right;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 3px 4px;
  color: #7d8f69;
  border-radius: 3px;
  transition: background 0.12s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.icon-btn:hover { background: #eef2ea; }

.icon-btn--red { color: #c04040; }
.icon-btn--red:hover { background: #fde8e8; }
</style>
