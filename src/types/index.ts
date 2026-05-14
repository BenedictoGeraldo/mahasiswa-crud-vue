export interface Mahasiswa {
  id: number
  nim: string
  nama: string
  jurusan: string
  angkatan: number
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface RegisterCredentials {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export type ModalMode = 'add' | 'edit'
