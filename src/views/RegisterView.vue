<script setup lang="ts">
import RegisterForm from '@/components/RegisterForm.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="w-auto max-w-md flex flex-col items-center justify-center gap-4 p-4">
    <h2 class="text-3xl self-start">Register</h2>
    <RegisterForm />
    <RouterLink to="/login" class="self-end">Login</RouterLink>
  </div>
</template>
