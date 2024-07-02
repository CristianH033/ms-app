<script setup lang="ts">
import type { Tables } from '@/types/supabase.db'

const props = defineProps({
  sellers: {
    type: Array<Tables<'sellers'>>,
    required: true
  }
})
</script>

<template>
  <div>
    <ul>
      <li v-for="seller in props.sellers" :key="seller.id">
        <RouterLink :to="{ name: 'seller', params: { id: seller.id } }">
          {{ seller.name }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
