<script setup lang="ts">
import { supabase } from '@/lib/supabase.client'
import type { QueryData } from '@supabase/supabase-js'
import { onMounted, ref } from 'vue'

const ticketInfoQuery = supabase.from('tickets').select('*, sellers(*, tickets(*))')
type TicketInfo = QueryData<typeof ticketInfoQuery>

const props = defineProps<{
  ticketId: string | number
}>()

const ticketInfo = ref<TicketInfo[number]>()

const getTicketInfo = async () => {
  const { data, error } = await ticketInfoQuery.eq('id', props.ticketId).single()

  if (error) {
    console.error(error)
  }

  console.log(data)

  return data
}

onMounted(async () => {
  await getTicketInfo()
    .then((data) => (ticketInfo.value = data!))
    .catch((error) => console.error(error))
    .finally(() => {})
})
</script>

<template>
  <div class="w-full @container/ticketInfo">
    <div
      class="relative flex w-full flex-col gap-2 overflow-hidden @md/ticketInfo:flex-row @md/ticketInfo:gap-8"
    >
      <div class="min-w-auto flex flex-col items-center justify-center">
        <div
          class="flex h-28 w-28 flex-col items-center justify-center rounded-full border bg-background-elevated"
        >
          <span class="text-3xl">{{ ticketInfo?.number }}</span>
        </div>
      </div>
      <div class="flex min-w-0 flex-col gap-2">
        <h2 class="my-2 text-2xl">Información del boleto</h2>
        <p v-if="ticketInfo?.sellers" class="capitalize">
          Vendedor: {{ ticketInfo?.sellers?.name }}
        </p>
        <p v-else class="text-sm">El Boleto no tiene un vendedor asignado</p>
        <p v-if="ticketInfo?.sellers?.email" class="text-sm">
          Email: {{ ticketInfo?.sellers?.email }}
        </p>
        <p v-if="ticketInfo?.sellers?.phone" class="text-sm">
          Telefono: {{ ticketInfo?.sellers?.phone }}
        </p>
        <div
          v-if="ticketInfo?.sellers && ticketInfo?.sellers?.tickets"
          class="flex w-full flex-col gap-2"
        >
          <hr class="" />
          <label class="">Otros boletos del vendedor:</label>
          <div class="flex flex-row gap-2 overflow-x-auto rounded-md border p-2">
            <div
              v-for="ticket in ticketInfo?.sellers?.tickets"
              :key="ticket.id"
              class="flex h-12 min-h-12 w-12 min-w-12 flex-col items-center justify-center rounded-full border bg-background-elevated"
            >
              <span>{{ ticket.number }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
