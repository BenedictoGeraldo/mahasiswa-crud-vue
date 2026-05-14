import { ref } from 'vue'
import type { Mahasiswa } from '@/types'
import { mahasiswaApi } from '@/api/mahasiswa'

const mahasiswaList = ref<Mahasiswa[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

export function useMahasiswaStore() {
  async function fetchMahasiswa() {
    isLoading.value = true
    error.value = null
    try {
      const res = await mahasiswaApi.getAll()
      mahasiswaList.value = res.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Gagal memuat data mahasiswa.'
    } finally {
      isLoading.value = false
    }
  }

  async function addMahasiswa(data: Omit<Mahasiswa, 'id'>) {
    error.value = null
    try {
      const res = await mahasiswaApi.create(data)
      mahasiswaList.value.push(res.data)
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Gagal menambah mahasiswa.'
      throw err
    }
  }

  async function updateMahasiswa(id: number, data: Omit<Mahasiswa, 'id'>) {
    error.value = null
    try {
      const res = await mahasiswaApi.update(id, data)
      const idx = mahasiswaList.value.findIndex((m) => m.id === id)
      if (idx !== -1) {
        mahasiswaList.value[idx] = res.data
      }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Gagal mengupdate mahasiswa.'
      throw err
    }
  }

  async function deleteMahasiswa(id: number) {
    error.value = null
    try {
      await mahasiswaApi.delete(id)
      mahasiswaList.value = mahasiswaList.value.filter((m) => m.id !== id)
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Gagal menghapus mahasiswa.'
      throw err
    }
  }

  function getMahasiswaById(id: number): Mahasiswa | undefined {
    return mahasiswaList.value.find((m) => m.id === id)
  }

  return {
    mahasiswaList,
    isLoading,
    error,
    fetchMahasiswa,
    addMahasiswa,
    updateMahasiswa,
    deleteMahasiswa,
    getMahasiswaById,
  }
}
