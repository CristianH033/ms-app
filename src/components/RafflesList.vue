<script setup lang="ts">
import type { Tables } from '@/types/supabase.db'
import RaffleCardSkeleton from './RaffleCardSkeleton.vue'
import RaffleCard from './RaffleCard.vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  raffles: {
    type: Array<Tables<'raffles'>>,
    required: true
  }
})
</script>

<template>
  <div class="flex flex-col gap-4 w-full max-w-2xl">
    <div v-if="loading" class="flex flex-col gap-4 w-full">
      <RaffleCardSkeleton v-for="i in 2" :key="i" />
    </div>
    <RaffleCard v-for="raffle in props.raffles" :key="raffle.id" :raffle="raffle" />
  </div>
</template>
