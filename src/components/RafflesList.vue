<script setup lang="ts">
import type { Tables } from '@/types/supabase.db'
import RaffleCardSkeleton from './RaffleCardSkeleton.vue'
import RaffleCard from './RaffleCard.vue'
import SolarBillCrossLineDuotone from '~icons/solar/bill-cross-line-duotone'

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
  <div class="flex w-full max-w-2xl flex-col gap-4">
    <div v-if="loading" class="flex w-full flex-col gap-4">
      <RaffleCardSkeleton v-for="i in 2" :key="i" />
    </div>
    <div
      v-else-if="props.raffles.length === 0"
      class="flex w-full flex-col items-center justify-center gap-4 py-16"
    >
      <SolarBillCrossLineDuotone class="h-32 w-32 text-muted-foreground" />
      <p class="text-center text-lg text-muted-foreground">No hay rifas creadas</p>
    </div>
    <RaffleCard v-else v-for="raffle in props.raffles" :key="raffle.id" :raffle="raffle" />
  </div>
</template>
