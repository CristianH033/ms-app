<script setup lang="ts">
import type { Tables } from '@/types/supabase.db'
import { onMounted, ref } from 'vue'

const draw = ref<Tables<'draws'>>()

onMounted(() => {
  draw.value = undefined
})
</script>

<template>
  <div>
    <h2>Drawing View</h2>
    <div>
      <span>{{ draw?.name }}</span>
    </div>
  </div>
</template>
