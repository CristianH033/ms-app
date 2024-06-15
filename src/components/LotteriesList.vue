<script setup lang="ts">
import type { Tables } from '@/types/supabase.db'
import { RouterLink } from 'vue-router'

const props = defineProps({
  lotteries: {
    type: Array<Tables<'lotteries'>>,
    required: true
  }
})
</script>

<template>
  <div>
    <ul>
      <li v-for="lotterie in props.lotteries" :key="lotterie.id">
        <RouterLink :to="{ name: 'lotterie', params: { id: lotterie.id } }">{{
          lotterie.name
        }}</RouterLink>
      </li>
    </ul>
  </div>
</template>
