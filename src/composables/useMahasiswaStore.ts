import { ref } from 'vue'
import type { Mahasiswa } from '@/types'

const mahasiswaList = ref<Mahasiswa[]>([
  { id: 1, nim: '2021001', nama: 'Andi Pratama',  jurusan: 'Teknik Informatika',    angkatan: 2021 },
  { id: 2, nim: '2021002', nama: 'Budi Santoso',  jurusan: 'Sistem Informasi',      angkatan: 2021 },
  { id: 3, nim: '2022001', nama: 'Citra Dewi',    jurusan: 'Teknik Informatika',    angkatan: 2022 },
  { id: 4, nim: '2022002', nama: 'Dian Rahmat',   jurusan: 'Manajemen Informatika', angkatan: 2022 },
  { id: 5, nim: '2023001', nama: 'Eka Putri',     jurusan: 'Sistem Informasi',      angkatan: 2023 },
])

let nextId = 6

export function useMahasiswaStore() {
  function addMahasiswa(data: Omit<Mahasiswa, 'id'>) {
    mahasiswaList.value.push({ ...data, id: nextId++ })
  }

  function updateMahasiswa(id: number, data: Omit<Mahasiswa, 'id'>) {
    const idx = mahasiswaList.value.findIndex((m) => m.id === id)
    if (idx !== -1) {
      mahasiswaList.value[idx] = { ...data, id }
    }
  }

  function deleteMahasiswa(id: number) {
    mahasiswaList.value = mahasiswaList.value.filter((m) => m.id !== id)
  }

  function getMahasiswaById(id: number): Mahasiswa | undefined {
    return mahasiswaList.value.find((m) => m.id === id)
  }

  return {
    mahasiswaList,
    addMahasiswa,
    updateMahasiswa,
    deleteMahasiswa,
    getMahasiswaById,
  }
}
