<script setup lang="ts">
import { ref } from 'vue'
import { singupWithEmailPassword } from '@/lib/auth'

const loading = ref(false)
const firstName = ref('')
const lastName = ref('')
const documentId = ref('')
const email = ref('')
const password = ref('')

const handleSignUp = async () => {
  loading.value = true

  const data = await singupWithEmailPassword(
    firstName.value,
    lastName.value,
    documentId.value,
    email.value,
    password.value
  )

  console.log(data)
  loading.value = false
}
</script>

<template>
  <form @submit.prevent="handleSignUp" class="w-full flex flex-col gap-4">
    <span class="text-xs">Sign up with email and password</span>
    <div class="w-full flex flex-col gap-4">
      <div>
        <label clas="w-full" for="name">First Name</label>
        <input
          class="w-full"
          name="first_name"
          type="text"
          placeholder="First name"
          v-model="firstName"
          required
        />
      </div>
      <div>
        <label clas="w-full" for="name">Last Name</label>
        <input
          class="w-full"
          name="last_name"
          type="text"
          placeholder="Last name"
          v-model="lastName"
          required
        />
      </div>
      <div>
        <label clas="w-full" for="name">Document</label>
        <input
          class="w-full"
          name="document_id"
          type="text"
          placeholder="Document ID"
          v-model="documentId"
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
