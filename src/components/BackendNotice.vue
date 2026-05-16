<script setup lang="ts">
import { ref } from "vue";
import { API_ENABLED, BACKEND_REPO_URL, CONTACT_EMAIL } from "@/config";

const dismiss = ref(false);
</script>

<template>
  <Transition name="banner">
    <div v-if="!API_ENABLED && !dismiss" class="banner-wrapper bg-amber-50 border-b border-amber-200 z-[60] relative">
      <div class="banner-inner">
        <div class="w-full px-4 py-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div class="flex items-center justify-between flex-wrap gap-3">
            
            <div class="w-0 flex-1 flex items-start sm:items-center gap-3">
              <span class="flex p-1 mt-0.5 sm:mt-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  class="text-amber-600"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </span>
              <p class="text-sm text-amber-900 leading-relaxed">
                <strong class="font-semibold">Mode Demo:</strong> Backend sedang dalam maintenance. Gunakan 
                <code class="px-1.5 py-0.5 rounded bg-amber-100/50 text-amber-900 font-mono text-xs font-semibold mx-0.5 border border-amber-200">admin</code> 
                dan 
                <code class="px-1.5 py-0.5 rounded bg-amber-100/50 text-amber-900 font-mono text-xs font-semibold mx-0.5 border border-amber-200">password</code>
                untuk masuk.
              </p>
            </div>

            <div class="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto flex items-center gap-3 text-sm">
              <a :href="BACKEND_REPO_URL" target="_blank" rel="noopener"
                class="font-medium text-amber-700 hover:text-amber-900 underline underline-offset-2 transition-colors"
              >
                Lihat Repo
              </a>
              <span class="text-amber-300 hidden sm:inline">&bull;</span>
              <a :href="'mailto:' + CONTACT_EMAIL"
                class="font-medium text-amber-700 hover:text-amber-900 transition-colors"
              >
                Hubungi
              </a>
            </div>

            <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
              <button
                @click="dismiss = true"
                type="button"
                class="-mr-1 flex p-1.5 rounded-md hover:bg-amber-100/80 focus:outline-none transition-colors text-amber-600 hover:text-amber-900"
                aria-label="Tutup notifikasi"
              >
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.banner-wrapper {
  display: grid;
  grid-template-rows: 1fr;
  transition: grid-template-rows 0.4s ease, opacity 0.4s ease;
}
.banner-enter-from,
.banner-leave-to {
  grid-template-rows: 0fr;
  opacity: 0;
}
.banner-inner {
  overflow: hidden;
}
</style>
