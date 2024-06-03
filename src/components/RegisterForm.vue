<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '@/lib/supabase.client'

const loading = ref(false)
const name = ref('')
const email = ref('')
const password = ref('')

const handleSignUp = async () => {
  loading.value = true

  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        name: name.value
      }
    }
  })

  console.log(data, error)
  loading.value = false
}
</script>

<template>
  <form @submit.prevent="handleSignUp" class="w-full flex flex-col gap-4">
    <span class="text-xs">Sign up with email and password</span>
    <div class="w-full flex flex-col gap-4">
      <div>
        <label clas="w-full" for="name">Name</label>
        <input
          class="w-full"
          name="name"
          type="name"
          placeholder="Your name"
          v-model="name"
          required
        />
      </div>
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
        {{ loading ? 'Loading' : 'Sign Up' }}
      </button>
    </div>
  </form>
</template>
