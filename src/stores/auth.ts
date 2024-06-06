import { checkAuth, loginWithEmailPassword, logout, singupWithEmailPassword } from '@/lib/auth'
import { defineStore } from 'pinia'

type User = {
  id: string
  email: string | undefined
  first_name: string
  last_name: string
  document_id: string
} | null

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: null as User,
      authenticated: false,
      isLoading: false,
      error: null,
      message: null,
      token: null,
      refreshToken: null
    }
  },
  getters: {
    isAuthenticated: (state) => state.authenticated
  },
  actions: {
    async login(email: string, password: string) {
      const { user } = await loginWithEmailPassword(email, password)

      this.user = {
        id: user.id,
        email: user.email,
        first_name: user.user_metadata.first_name,
        last_name: user.user_metadata.last_name,
        document_id: user.user_metadata.document_id
      }

      this.authenticated = true

      return user
    },
    async logout() {
      await logout()

      this.user = null
      this.authenticated = false

      return true
    },
    async register(
      firstName: string,
      lastName: string,
      documentId: string,
      email: string,
      password: string
    ) {
      await singupWithEmailPassword(firstName, lastName, documentId, email, password)
    },
    reset() {
      this.user = null
      this.authenticated = false
      this.isLoading = false
      this.error = null
      this.message = null
      this.token = null
      this.refreshToken = null
    },
    async checkAuth() {
      this.authenticated = await checkAuth()
    }
  },
  persist: true
})
