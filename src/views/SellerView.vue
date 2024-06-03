<script setup lang="ts">
import { getSellerById } from '@/lib/api'
import type { Tables } from '@/types/supabase.db'
import { onMounted, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'

const router = useRouter()
const seller = ref<Tables<'sellers'>>()

onMounted(async () => {
  seller.value = await getSellerById(Number(router.currentRoute.value.params.id))
})
</script>

<template>
  <div class="w-full">
    <h2>Seller View</h2>
    <div>
      <span>{{ seller?.name }} - {{ seller?.phone }}</span>
    </div>
    <div>
      <RouterView />
    </div>
  </div>
</template>
