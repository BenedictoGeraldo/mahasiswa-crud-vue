<script setup lang="ts">
import type { Mahasiswa } from '@/types'

interface Props {
  isOpen: boolean
  mahasiswa: Mahasiswa | null
}

defineProps<Props>()

const emit = defineEmits<{
  close: []
  confirm: []
}>()

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
        <div class="modal-card" role="alertdialog" aria-label="Konfirmasi hapus mahasiswa">
          <div class="icon-wrapper">
            <div class="icon-circle">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4h6v2" />
              </svg>
            </div>
          </div>

          <div class="modal-content">
            <h2 class="modal-title">Hapus Mahasiswa</h2>
            <p class="modal-desc">
              Apakah kamu yakin ingin menghapus data
              <strong>{{ mahasiswa?.nama }}</strong>?
              Tindakan ini tidak dapat dibatalkan.
            </p>
          </div>

          <div class="modal-actions">
            <button class="btn btn-cancel" @click="emit('close')">Batal</button>
            <button class="btn btn-danger" @click="emit('confirm')">Ya, Hapus</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-card {
  background: #fff;
  border-radius: 16px;
  width: 100%;
  max-width: 420px;
  padding: 2rem;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  text-align: center;
}

.icon-wrapper {
  margin-top: 0.5rem;
}

.icon-circle {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #fee8e8;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d94f4f;
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #2d3a2d;
  margin: 0;
}

.modal-desc {
  font-size: 0.9375rem;
  color: #5a6e5a;
  margin: 0;
  line-height: 1.6;
}

.modal-desc strong {
  color: #2d3a2d;
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  width: 100%;
}

.btn {
  flex: 1;
  padding: 0.7rem 1rem;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
  font-family: inherit;
}

.btn-cancel {
  background: #f0f4f0;
  color: #4a6a4a;
  border: 1.5px solid #d0dbd0;
}

.btn-cancel:hover {
  background: #e0e8e0;
}

.btn-danger {
  background: #d94f4f;
  color: #fff;
}

.btn-danger:hover {
  background: #c03e3e;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(217, 79, 79, 0.3);
}

/* Transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-card,
.modal-leave-to .modal-card {
  transform: scale(0.92) translateY(20px);
}

.modal-enter-active .modal-card,
.modal-leave-active .modal-card {
  transition: transform 0.25s ease;
}
</style>
