<script setup lang="ts">
import type { Tables } from '@/types/supabase.db'
import { RouterLink } from 'vue-router'

const props = defineProps({
  raffles: {
    type: Array<Tables<'raffles'>>,
    required: true
  }
})
</script>

<template>
  <div>
    <ul>
      <li v-for="raffle in props.raffles" :key="raffle.id">
        <RouterLink :to="{ name: 'raffle', params: { id: raffle.id } }">{{
          raffle.name
        }}</RouterLink>
      </li>
    </ul>
  </div>
</template>
