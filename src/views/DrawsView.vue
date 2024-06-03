<script setup lang="ts">
import DrawingsList from '@/components/DrawsList.vue'
</script>

<template>
  <div>
    <h1>Draws View</h1>
    <DrawingsList :draws="[]" />
  </div>
</template>
