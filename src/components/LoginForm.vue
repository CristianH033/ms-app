<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '@/lib/supabase.client'
import { useRouter } from 'vue-router'

const router = useRouter()

const loading = ref(false)
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  loading.value = true
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  console.log(data, error)

  loading.value = false

  router.push({ name: 'home' })
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
