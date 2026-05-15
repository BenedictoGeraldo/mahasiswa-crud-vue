<script setup lang="ts">
import { ref } from "vue";
import { API_ENABLED, BACKEND_REPO_URL, CONTACT_EMAIL } from "@/config";

const dismiss = ref(false);
</script>

<template>
  <Teleport to="body">
    <Transition name="banner">
      <div v-if="!API_ENABLED && !dismiss" class="notice-banner">
        <div class="notice-content">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            class="notice-icon"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span class="notice-text">
            Saat ini backend sedang dalam maintenance. Untuk login gunakan
            username
            <code>admin</code> dan password <code>password</code>.
            <a :href="BACKEND_REPO_URL" target="_blank" rel="noopener"
              >Lihat repositori backend</a
            >
            &middot;
            <a :href="'mailto:' + CONTACT_EMAIL">Hubungi {{ CONTACT_EMAIL }}</a>
          </span>
        </div>
        <button
          class="notice-close"
          @click="dismiss = true"
          aria-label="Tutup notifikasi"
        >
          &times;
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.notice-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background: #fff3cd;
  border-bottom: 1px solid #ffc107;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0.6rem 1rem;
  font-size: 0.8125rem;
  color: #856404;
  line-height: 1.5;
}

.notice-content {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  flex: 1;
  padding-right: 0.5rem;
}

.notice-icon {
  flex-shrink: 0;
  margin-top: 1px;
}

.notice-text {
  padding-top: 1px;
}

.notice-text a {
  color: #856404;
  font-weight: 600;
  text-decoration: underline;
}

.notice-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: #856404;
  padding: 0 0.25rem;
  line-height: 1;
  flex-shrink: 0;
}

.banner-enter-active,
.banner-leave-active {
  transition: all 0.3s ease;
}
.banner-enter-from,
.banner-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
