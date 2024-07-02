<script setup lang="ts">
import { getSellerById } from '@/lib/api/sellers'
import { supabase } from '@/lib/supabase.client'
import type { Tables } from '@/types/supabase.db'
import { onMounted, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'

const router = useRouter()
const seller = ref<Tables<'sellers'>>()
const ticketsCount = ref(0)

onMounted(async () => {
  seller.value = await getSellerById(Number(router.currentRoute.value.params.id))

  // seller with tickets count
  const { count } = await supabase
    .from('tickets')
    .select('number', { count: 'exact', head: true })
    .eq('seller_id', Number(router.currentRoute.value.params.id))
    .single()

  ticketsCount.value = count || 0
})
</script>

<template>
  <div class="w-full">
    <h2>Seller View</h2>
    <div>
      <span>{{ seller?.name }} - {{ seller?.phone }}</span>
    </div>
    <div>Numero de Boletas: {{ ticketsCount }}</div>
    <div>
      <RouterView />
    </div>
  </div>
</template>
