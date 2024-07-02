<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getRaffleById } from '@/lib/api/raffles'
import { getAllTicketsByRaffle } from '@/lib/api/tickets'
import type { Tables } from '@/types/supabase.db'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import SolarTicketLineDuotone from '~icons/solar/ticket-line-duotone'

const router = useRouter()

const raffle = ref<Tables<'raffles'>>()

const filteredAvailable = ref(false)

const search = ref('')

const tickets = ref<Tables<'tickets'>[]>([])

const loading = ref(false)

// const availableTickets = computed(() => {
//   return tickets.value.filter((ticket) => ticket.seller_id === null)
// })

const showingTickets = computed(() => {
  return tickets.value.filter((ticket) => {
    return (
      ticket.number.toLowerCase().includes(search.value.toLowerCase()) &&
      (filteredAvailable.value ? ticket.seller_id === null : true)
    )
  })

  // return filteredAvailable.value ? availableTickets.value : tickets.value
})

onMounted(async () => {
  loading.value = true

  await getRaffleById(Number(router.currentRoute.value.params.id))
    .then((raffleData) => {
      raffle.value = raffleData
    })
    .catch((error) => {
      console.log(error)
    })

  await getAllTicketsByRaffle(Number(router.currentRoute.value.params.id))
    .then((ticketsData) => {
      tickets.value = ticketsData as Tables<'tickets'>[]
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      loading.value = false
    })
})
</script>

<template>
  <div class="w-full p-2 flex flex-col gap-4 items-center">
    <!-- <div class="">
      <span>{{ raffle?.name }} - {{ raffle?.description }}</span>
    </div> -->
    <input type="text" placeholder="Search" v-model="search" />
    <div class="w-full flex flex-row justify-end">
      <Tabs default-value="account" class="w-[400px]">
        <Button @click="() => (filteredAvailable = !filteredAvailable)">Filtrar</Button>
        <TabsList>
          <TabsTrigger value="account"> Disponibles </TabsTrigger>
          <TabsTrigger value="password"> No disponibles </TabsTrigger>
        </TabsList>
        <TabsContent value="account"> Make changes to your account here. </TabsContent>
        <TabsContent value="password"> Change your password here. </TabsContent>
      </Tabs>
    </div>
    <div class="@container w-full max-w-3xl">
      <div
        className="bg-secondary/50 border border-b-0 rounded-t-lg py-2 px-4 flex flex-row items-center justify-between"
      >
        <h2 className="text-3xl py-2 ">Numeración disponible</h2>
        <SolarTicketLineDuotone class="w-8 h-8" />
      </div>
      <div
        v-if="loading"
        className="p-2 border rounded-b-lg grid grid-cols-5 @xl:grid-cols-10 gap-x-2 gap-y-2 place-items-center"
      >
        <Skeleton v-for="i in 100" :key="i" class="w-14 h-14 border rounded-full" />
      </div>
      <div
        className="p-2 border rounded-b-lg grid grid-cols-5 @xl:grid-cols-10 gap-x-2 gap-y-2 place-items-center"
      >
        <Button
          v-for="ticket in showingTickets"
          :key="ticket.id"
          variant="ghost"
          class="text-lg w-14 h-14 border rounded-full"
          :class="{
            'bg-destructive border border-destructive cursor-not-allowed': ticket.seller_id !== null
          }"
          :disabled="ticket.seller_id !== null"
        >
          {{ ticket.number }}
        </Button>
      </div>
    </div>
  </div>
</template>
