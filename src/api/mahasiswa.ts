import apiClient from './client'
import type { Mahasiswa } from '@/types'

export const mahasiswaApi = {
  getAll() {
    return apiClient.get<Mahasiswa[]>('/mahasiswa')
  },

  getById(id: number) {
    return apiClient.get<Mahasiswa>(`/mahasiswa/${id}`)
  },

  create(data: Omit<Mahasiswa, 'id'>) {
    return apiClient.post<Mahasiswa>('/mahasiswa', data)
  },

  update(id: number, data: Omit<Mahasiswa, 'id'>) {
    return apiClient.patch<Mahasiswa>(`/mahasiswa/${id}`, data)
  },

  delete(id: number) {
    return apiClient.delete(`/mahasiswa/${id}`)
  },
}
