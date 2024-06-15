<script setup lang="ts">
import BuyersList from '@/components/BuyersList.vue'
import { getAllBuyers } from '@/lib/api'
import type { Tables } from '@/types/supabase.db'
import { onMounted, ref } from 'vue'

const buyers = ref<Tables<'buyers'>[]>([])

onMounted(async () => {
  getAllBuyers().then((data) => {
    buyers.value = data as Tables<'buyers'>[]
  })
})
</script>

<template>
  <div class="w-full">
    <h1>Customers View</h1>
    <BuyersList :buyers="buyers" />
  </div>
</template>
