import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      appTitle: 'SupaRaffle',
      loading: false
    }
  },
  actions: {
    setAppTitle(title: string) {
      this.appTitle = title
    },
    setLoading(loading: boolean) {
      this.loading = loading
    }
  },
  getters: {
    getAppTitle: (state) => state.appTitle,
    getLoading: (state) => state.loading
  }
})
