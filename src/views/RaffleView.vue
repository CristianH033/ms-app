<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getRaffleById } from '@/lib/api/raffles'
import { getAllTicketsByRaffle } from '@/lib/api/tickets'
import type { Tables } from '@/types/supabase.db'
import { computed, nextTick, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Input } from '@/components/ui/input'
import SolarTicketLineDuotone from '~icons/solar/ticket-line-duotone'
import SolarMagniferOutline from '~icons/solar/magnifer-outline'
import { useIntersectionObserver } from '@vueuse/core'
import { Dialog, DialogClose, DialogContent, DialogFooter } from '@/components/ui/dialog'
import TicketInfo from '@/components/TicketInfo.vue'

const router = useRouter()

const raffle = ref<Tables<'raffles'>>()
const tickets = ref<Tables<'tickets'>[]>([])
const selectedTicketOverview = ref<Tables<'tickets'> | null>(null)

const availableFilter = ref<'all' | 'available' | 'unavailable'>('all')
const search = ref('')
const loading = ref(false)
const isSticky = ref(false)
const openOverviewDialog = ref(false)

const sentinal = ref<HTMLDivElement | null>(null)
const overviewDialog = ref<typeof Dialog | null>(null)

const showingTickets = computed(() => {
  return tickets.value.filter((ticket) => inFilter(ticket) && inSearch(ticket))
})

const inSearch = (ticket: Tables<'tickets'>): boolean => {
  return (
    search.value.trim() === '' || ticket.number.toLowerCase().includes(search.value.toLowerCase())
  )
}

const inFilter = (ticket: Tables<'tickets'>): boolean => {
  switch (availableFilter.value) {
    case 'available':
      return ticket.seller_id === null
    case 'unavailable':
      return ticket.seller_id !== null
    default:
      return true
  }
}

const openTicketOverview = (ticket: Tables<'tickets'>) => {
  selectedTicketOverview.value = ticket
  nextTick(() => {
    openOverviewDialog.value = true
  })
}

useIntersectionObserver(
  sentinal,
  ([{ isIntersecting }]) => {
    isSticky.value = !isIntersecting
  },
  {
    rootMargin: '-65px',
    threshold: 1
  }
)

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
  <div class="w-full flex flex-col items-center">
    <div ref="sentinal" class="w-full h-0"></div>
    <div class="flex flex-col w-full max-w-3xl gap-4">
      <div
        class="flex flex-col sm:flex-row gap-4 transition-all duration-300 bg-background-elevated/90 backdrop-blur px-4 py-3 border rounded-lg sticky top-16 z-10"
        :class="{
          '!bg-background/90 @3xl/main:!bg-background-elevated/90 rounded-none @3xl/main:rounded-b-lg border-t-0 border-x-0 @3xl/main:border-x -mx-4':
            isSticky
        }"
      >
        <div class="grow relative">
          <SolarMagniferOutline class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
          <Input
            type="text"
            inputmode="numeric"
            autocomplete="off"
            maxlength="19"
            placeholder="Buscar número"
            class="w-full pl-11 pr-4 py-2 text-sm"
            v-model="search"
          />
        </div>

        <Tabs default-value="all" class="w-full sm:w-auto">
          <TabsList class="w-full">
            <TabsTrigger value="all" @click="() => (availableFilter = 'all')"> Todo </TabsTrigger>
            <TabsTrigger value="available" @click="() => (availableFilter = 'available')">
              Disponibles
            </TabsTrigger>
            <TabsTrigger value="unavailable" @click="() => (availableFilter = 'unavailable')">
              No disponibles
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div class="w-full flex flex-col gap-0 items-stretch">
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
              'bg-background-elevated border border-destructive': ticket.seller_id !== null
            }"
            @click="openTicketOverview(ticket)"
          >
            {{ ticket.number }}
          </Button>
        </div>
      </div>
    </div>

    <Dialog
      ref="overviewDialog"
      :open="openOverviewDialog"
      v-on:update:open="(open) => (openOverviewDialog = open)"
    >
      <DialogContent>
        <!-- <DialogHeader>
          <DialogTitle
            >Informacion de Bono
            <span class="text-2xl">{{ selectedTicketOverview?.number }}</span></DialogTitle
          >
          <DialogDescription> Información del vendedor... </DialogDescription>
        </DialogHeader> -->
        <TicketInfo :ticketId="selectedTicketOverview?.id!" />
        <DialogFooter>
          <DialogClose as-child>
            <Button type="button" variant="secondary"> Cerrar </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
