<script setup lang="ts">
import type { Mahasiswa } from '@/types'

interface Props {
  isOpen: boolean
  mahasiswa: Mahasiswa | null
}

defineProps<Props>()
const emit = defineEmits<{ close: []; confirm: [] }>()

function handleOverlayClick(e: MouseEvent) {
  if ((e.target as HTMLElement).classList.contains('modal-overlay')) emit('close')
}
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
        class="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click="handleOverlayClick"
        role="alertdialog"
        aria-label="Konfirmasi hapus mahasiswa"
      >
        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div v-if="isOpen" class="bg-white rounded-2xl w-full max-w-[400px] p-8 shadow-2xl flex flex-col items-center gap-5 text-center">

            <!-- Icon -->
            <div class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-500 mt-1">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
              </svg>
            </div>

            <!-- Text -->
            <div class="flex flex-col gap-2">
              <h2 class="text-lg font-bold text-[#2d3a2d]">Hapus Mahasiswa</h2>
              <p class="text-sm text-[#5a6e5a] leading-relaxed">
                Apakah kamu yakin ingin menghapus data
                <strong class="text-[#2d3a2d]">{{ mahasiswa?.nama }}</strong>?
                Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>

            <!-- Actions -->
            <div class="flex gap-3 w-full">
              <button
                @click="emit('close')"
                class="flex-1 py-2.5 bg-[#f0f4f0] hover:bg-[#e0e8e0] text-[#4a6a4a] border border-[#d0dbd0] rounded-lg text-sm font-semibold cursor-pointer transition-colors font-[inherit]"
              >
                Batal
              </button>
              <button
                @click="emit('confirm')"
                class="flex-1 py-2.5 bg-[#d94f4f] hover:bg-[#c03e3e] text-white rounded-lg text-sm font-semibold cursor-pointer transition-colors font-[inherit]"
              >
                Ya, Hapus
              </button>
            </div>

          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
