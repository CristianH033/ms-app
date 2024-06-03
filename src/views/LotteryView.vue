<script setup lang="ts">
import type { Tables } from '@/types/supabase.db'
import { onMounted, ref } from 'vue'

const lottery = ref<Tables<'lotteries'>>()

onMounted(() => {
  lottery.value = undefined
})
</script>

<template>
  <div>
    <h2>Lottery View</h2>
    <div>
      <span>{{ lottery?.name }} - {{ lottery?.description }}</span>
    </div>
  </div>
</template>
