<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({ username: '', password: '' })
const isLoading = ref(false)
const errorMsg = ref('')

function handleSubmit() {
  errorMsg.value = ''
  if (!form.value.username || !form.value.password) {
    errorMsg.value = 'Semua field wajib diisi.'
    return
  }
  isLoading.value = true
  setTimeout(() => { isLoading.value = false; router.push('/login') }, 800)
}
</script>

<template>
  <div class="page">
    <!-- TOP: white section (inverted vs Login) -->
    <div class="top-section">
      <span class="brand">QuickO</span>
      <div class="hero">
        <h1>Selamat Datang di QuickO</h1>
        <p>QuickO adalah sebuah sistem informasi manajemen mahasiswa sederhana yang dibuat dengan Vue.JS, Spring Boot, dan Oracle Database</p>
      </div>
    </div>

    <!-- BOTTOM: green section (inverted vs Login) -->
    <div class="bottom-section"></div>

    <!-- CARD: overlaps top and bottom, pinned to the right -->
    <div class="card-wrap">
      <div class="card">
        <h2 class="card-title">Daftar</h2>
        <hr class="card-line" />

        <form @submit.prevent="handleSubmit" novalidate>
          <p v-if="errorMsg" class="err">{{ errorMsg }}</p>

          <div class="field">
            <label for="u">Masukan Username</label>
            <input id="u" v-model="form.username" type="text" />
          </div>

          <div class="field">
            <label for="p">Masukan Password</label>
            <input id="p" v-model="form.password" type="password" />
          </div>

          <button type="submit" class="btn-submit" :disabled="isLoading">
            <span v-if="!isLoading">Daftar</span>
            <span v-else class="spinner" />
          </button>

          <p class="switch">
            Sudah punya akun? <RouterLink to="/login">Masuk</RouterLink>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
* { box-sizing: border-box; }

.page {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* ── TOP: white 55% (inverted) ────────────────────────── */
.top-section {
  width: 100%;
  height: 55%;
  background: #f5f6f2;
  display: flex;
  flex-direction: column;
  padding: 1.75rem 2.5rem;
}

.brand {
  font-size: 0.9375rem;
  font-weight: 700;
  color: #2c3e2c;
}

.hero {
  margin-top: auto;
  max-width: 45%;
  padding-bottom: 1.5rem;
}

.hero h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e2c;
  margin: 0 0 0.75rem 0;
  line-height: 1.3;
}

.hero p {
  font-size: 0.875rem;
  color: #5a7a5a;
  line-height: 1.65;
  margin: 0;
}

/* ── BOTTOM: green 45% (inverted) ─────────────────────── */
.bottom-section {
  width: 100%;
  height: 45%;
  background: #7d8f69;
}

/* ── CARD: posisi absolute overlap di kanan ───────────── */
.card-wrap {
  position: absolute;
  right: 6%;
  top: 50%;
  transform: translateY(-50%);
  width: 38%;
  max-width: 420px;
  min-width: 300px;
}

.card {
  background: #fff;
  border-radius: 16px;
  padding: 2rem 1.875rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
}

.card-title {
  font-size: 1.625rem;
  font-weight: 700;
  color: #2c3e2c;
  text-align: center;
  margin: 0 0 0.5rem 0;
}

.card-line {
  border: none;
  border-top: 2px solid #7d8f69;
  margin: 0 0 1.5rem 0;
}

form {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.err {
  background: #fde8e8;
  border: 1px solid #f5b8b8;
  color: #c04040;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  font-size: 0.8125rem;
  margin: 0;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.field label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #3a4e3a;
}

.field input {
  padding: 0.5625rem 0.75rem;
  border: 1px solid #cdd5cd;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #2c3e2c;
  background: #fff;
  outline: none;
  transition: border-color 0.18s;
  font-family: inherit;
}

.field input:focus { border-color: #7d8f69; }

.btn-submit {
  width: 100%;
  padding: 0.6875rem;
  background: #7d8f69;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.18s;
  min-height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.25rem;
}

.btn-submit:hover:not(:disabled) { background: #6a7a58; }
.btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }

.spinner {
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}
@keyframes spin { to { transform: rotate(360deg); } }

.switch {
  text-align: center;
  font-size: 0.875rem;
  color: #5a6e5a;
  margin: 0;
}
.switch a { color: #7d8f69; font-weight: 600; text-decoration: none; }
.switch a:hover { text-decoration: underline; }
</style>
