<script setup lang="ts">
import type { Tables } from '@/types/supabase.db'
import { getBuyerById } from '@/lib/api/buyers'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const buyer = ref<Tables<'buyers'>>()

onMounted(async () => {
  buyer.value = await getBuyerById(Number(router.currentRoute.value.params.id))
})
</script>

<template>
  <div>
    <h2>Customer View</h2>
    <div>
      <span>{{ buyer?.name }} - {{ buyer?.email }}</span>
    </div>
  </div>
</template>
