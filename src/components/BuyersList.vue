<script setup lang="ts">
import type { Tables } from '@/types/supabase.db'

const props = defineProps({
  buyers: {
    type: Array<Tables<'buyers'>>,
    required: true
  }
})
</script>

<template>
  <div>
    <ul>
      <li v-for="buyer in props.buyers" :key="buyer.id">
        <RouterLink :to="`/buyers/${buyer.id}`">{{ buyer.name }}</RouterLink>
      </li>
    </ul>
  </div>
</template>
