<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const loading = ref(false)
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  loading.value = true

  await authStore.login(email.value, password.value)

  loading.value = false
}
</script>

<template>
  <form @submit.prevent="handleLogin" class="w-full flex flex-col gap-4">
    <span class="text-xs">Sign in with email and password</span>
    <div class="w-full flex flex-col gap-4">
      <div>
        <label clas="w-full" for="email">Email</label>
        <input
          class="w-full"
          name="email"
          type="email"
          placeholder="Your email"
          v-model="email"
          required
        />
      </div>
      <div>
        <label clas="w-full" for="password">Password</label>
        <input
          class="w-full"
          name="password"
          type="password"
          placeholder=""
          v-model="password"
          required
        />
      </div>
    </div>
    <div class="w-full">
      <button class="w-full" type="submit" :disabled="loading">
        {{ loading ? 'Loading' : 'Sign In' }}
      </button>
    </div>
  </form>
</template>
