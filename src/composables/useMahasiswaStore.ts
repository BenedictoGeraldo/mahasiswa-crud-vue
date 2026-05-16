import { ref } from 'vue'
import type { Mahasiswa } from '@/types'
import { mahasiswaApi } from '@/api/mahasiswa'
import { API_ENABLED } from '@/config'

const mockData: Mahasiswa[] = [
  { id: 1, nim: '2021001', nama: 'Andi Pratama',  programStudi: 'Teknik Informatika',    angkatan: 2021 },
  { id: 2, nim: '2021002', nama: 'Budi Santoso',  programStudi: 'Sistem Informasi',      angkatan: 2021 },
  { id: 3, nim: '2022001', nama: 'Citra Dewi',    programStudi: 'Teknik Informatika',    angkatan: 2022 },
  { id: 4, nim: '2022002', nama: 'Dian Rahmat',   programStudi: 'Manajemen Informatika', angkatan: 2022 },
  { id: 5, nim: '2023001', nama: 'Eka Putri',     programStudi: 'Sistem Informasi',      angkatan: 2023 },
]

let nextId = 6

const mahasiswaList = ref<Mahasiswa[]>(API_ENABLED ? [] : [...mockData])
const isLoading = ref(false)
const error = ref<string | null>(null)

export function useMahasiswaStore() {
  async function fetchMahasiswa() {
    if (!API_ENABLED) {
      if (mahasiswaList.value.length === 0) mahasiswaList.value = [...mockData]
      return
    }
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
    if (!API_ENABLED) {
      const newItem: Mahasiswa = { ...data, id: nextId++ }
      mahasiswaList.value.push(newItem)
      return
    }
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
    if (!API_ENABLED) {
      const idx = mahasiswaList.value.findIndex((m) => m.id === id)
      if (idx !== -1) mahasiswaList.value[idx] = { ...data, id }
      return
    }
    try {
      const res = await mahasiswaApi.update(id, data)
      const idx = mahasiswaList.value.findIndex((m) => m.id === id)
      if (idx !== -1) mahasiswaList.value[idx] = res.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Gagal mengupdate mahasiswa.'
      throw err
    }
  }

  async function deleteMahasiswa(id: number) {
    error.value = null
    if (!API_ENABLED) {
      mahasiswaList.value = mahasiswaList.value.filter((m) => m.id !== id)
      return
    }
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
