import apiClient from './client'

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  password: string
}

export interface AuthResponse {
  token: string
  message?: string
}

export const authApi = {
  login(data: LoginRequest) {
    return apiClient.post<AuthResponse>('/auth/login', data)
  },

  register(data: RegisterRequest) {
    return apiClient.post<AuthResponse>('/auth/register', data)
  },
}
