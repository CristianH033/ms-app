<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="w-auto max-w-md flex flex-col items-center justify-center gap-4 p-4">
    <h2 class="text-3xl self-start">Login</h2>
    <LoginForm />
    <RouterLink to="/register" class="self-end">Register</RouterLink>
  </div>
</template>
