<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authApi } from '@/api/auth'

const router = useRouter()
const form = ref({ username: '', password: '' })
const isLoading = ref(false)
const errorMsg = ref('')

async function handleSubmit() {
  errorMsg.value = ''
  if (!form.value.username || !form.value.password) {
    errorMsg.value = 'Semua field wajib diisi.'
    return
  }
  isLoading.value = true
  try {
    await authApi.register(form.value)
    router.push('/login')
  } catch (err: any) {
    errorMsg.value = err.response?.data?.message || 'Pendaftaran gagal, coba lagi.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <!-- Page: flex column, full screen — inverted from Login -->
  <div class="relative flex flex-col w-screen min-h-screen">
    <!-- TOP: white ~55% (inverted) -->
    <div class="flex flex-col w-full min-h-[55vh] px-8 md:px-14 py-7 bg-white">
      <span class="text-4xl font-bold text-[#3d4d3d] tracking-tight"
        >QuickO</span
      >

      <div class="mt-auto pb-8 max-w-xs md:max-w-sm">
        <h1
          class="text-xl md:text-2xl font-bold text-[#3d4d3d] leading-snug mb-3"
        >
          Selamat Datang di QuickO
        </h1>
        <p class="text-sm md:text-base text-[#5a6e5a] leading-relaxed">
          QuickO adalah sebuah sistem informasi manajemen mahasiswa sederhana
          yang dibuat dengan Vue.JS, Spring Boot, dan Oracle Database
        </p>
      </div>
    </div>

    <!-- BOTTOM: olive green ~45% (inverted) -->
    <div
      class="flex-1 w-full min-h-[45vh]"
      style="
        background: radial-gradient(
          ellipse at 80% 50%,
          #6b7f5a 0%,
          #4f6142 60%,
          #435537 100%
        );
      "
    ></div>

    <!-- CARD: absolute, overlapping, right side -->
    <div
      class="absolute right-[6%] top-1/2 -translate-y-1/2 w-[90vw] max-w-[440px] md:w-[38vw] z-10"
    >
      <div class="bg-white rounded-2xl shadow-2xl px-7 md:px-9 py-8 md:py-10">
        <h2
          class="text-3xl md:text-4xl font-semibold text-[#3d4d3d] text-center mb-2"
        >
          Daftar
        </h2>
        <hr class="border-t-2 border-[#7a9068] mb-6" />

        <form
          @submit.prevent="handleSubmit"
          novalidate
          class="flex flex-col gap-4"
        >
          <p
            v-if="errorMsg"
            class="bg-red-50 text-red-600 text-sm rounded-lg px-3 py-2"
          >
            {{ errorMsg }}
          </p>

          <div class="flex flex-col gap-1.5">
            <label
              for="username"
              class="text-sm md:text-base font-medium text-[#4a5e4a]"
            >
              Masukan Username
            </label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              autocomplete="username"
              class="w-full px-4 py-3 border-2 border-[#d5ddd5] rounded-xl text-sm md:text-base text-[#2c3a2c] outline-none transition-colors focus:border-[#7a9068] bg-white font-[inherit]"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label
              for="password"
              class="text-sm md:text-base font-medium text-[#4a5e4a]"
            >
              Masukan Password
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              autocomplete="new-password"
              class="w-full px-4 py-3 border-2 border-[#d5ddd5] rounded-xl text-sm md:text-base text-[#2c3a2c] outline-none transition-colors focus:border-[#7a9068] bg-white font-[inherit]"
            />
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-3.5 mt-1 bg-[#7a9068] hover:bg-[#687d57] disabled:opacity-60 text-white font-semibold text-base rounded-xl transition-colors cursor-pointer flex items-center justify-center min-h-[50px] font-[inherit]"
          >
            <span v-if="!isLoading">Daftar</span>
            <span
              v-else
              class="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"
            />
          </button>

          <p class="text-center text-sm md:text-base text-[#5a6e5a]">
            Sudah punya akun?
            <RouterLink
              to="/login"
              class="font-bold text-[#3d4d3d] hover:underline"
              >Masuk</RouterLink
            >
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
