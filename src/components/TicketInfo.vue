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
      class="w-full flex flex-col gap-2 overflow-hidden relative @md/ticketInfo:flex-row @md/ticketInfo:gap-8"
    >
      <div class="min-w-auto flex flex-col justify-center items-center">
        <div
          class="w-28 h-28 rounded-full border bg-background-elevated flex flex-col justify-center items-center"
        >
          <span class="text-3xl">{{ ticketInfo?.number }}</span>
        </div>
      </div>
      <div class="min-w-0 flex flex-col gap-2">
        <h2 class="text-2xl my-2">Información del boleto</h2>
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
          class="w-full flex flex-col gap-2"
        >
          <hr class="" />
          <label class="">Otros boletos del vendedor:</label>
          <div class="flex flex-row gap-2 overflow-x-auto p-2 rounded-md border">
            <div
              v-for="ticket in ticketInfo?.sellers?.tickets"
              :key="ticket.id"
              class="min-w-12 min-h-12 w-12 h-12 rounded-full border bg-background-elevated flex flex-col justify-center items-center"
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
