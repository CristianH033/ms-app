<script setup lang="ts">
import type { Tables } from '@/types/supabase.db'
import { RouterLink } from 'vue-router'

const props = defineProps({
  draws: {
    type: Array<Tables<'draws'>>,
    required: true
  }
})
</script>

<template>
  <div>
    <ul>
      <li v-for="draw in props.draws" :key="draw.id">
        <RouterLink :to="`/draws/${draw.id}`">{{ draw.name }}</RouterLink>
      </li>
    </ul>
  </div>
</template>
