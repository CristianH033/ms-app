<script setup lang="ts">
import { getRaffleById } from '@/lib/api'
import type { Tables } from '@/types/supabase.db'
import { onMounted, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'

const router = useRouter()
const raffle = ref<Tables<'raffles'>>()

onMounted(async () => {
  raffle.value = await getRaffleById(Number(router.currentRoute.value.params.id))
})
</script>

<template>
  <div class="w-full">
    <h2>Raffle View</h2>
    <div>
      <span>{{ raffle?.name }} - {{ raffle?.description }}</span>
    </div>
    <RouterLink
      :to="{
        name: 'raffle-tickets',
        params: {
          id: raffle?.id
        }
      }"
      >See Tickets</RouterLink
    >
    <RouterView />
  </div>
</template>
