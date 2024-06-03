<script setup lang="ts">
import RafflesList from '@/components/RafflesList.vue'
import { getAllRaffles } from '@/lib/api'
import type { Tables } from '@/types/supabase.db'
import { onMounted, ref } from 'vue'

const raffles = ref<Tables<'raffles'>[]>([])

onMounted(async () => {
  raffles.value = await getAllRaffles()
})
</script>

<template>
  <div class="w-full">
    <h1>Raffles View</h1>
    <RafflesList :raffles="raffles" />
  </div>
</template>
