<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="w-full">
    <h1>Page Not Found</h1>
    <RouterLink :to="{ name: 'home' }">Go Home</RouterLink>
  </div>
</template>
