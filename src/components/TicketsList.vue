<script setup lang="ts">
import { getAllTicketsByRaffle } from '@/lib/api'
import type { Tables } from '@/types/supabase.db'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

// const props = defineProps({
//   tickets: {
//     type: Array<Tables<'tickets'>>,
//     required: false,
//     default: () => []
//   }
// })

const router = useRouter()

const tickets = ref<Tables<'tickets'>[]>()

onMounted(async () => {
  tickets.value = await getAllTicketsByRaffle(Number(router.currentRoute.value.params.id))
})
</script>

<template>
  <div>
    <ul>
      <li v-for="ticket in tickets" :key="ticket.id">
        {{ ticket.number }}
      </li>
    </ul>
  </div>
</template>
