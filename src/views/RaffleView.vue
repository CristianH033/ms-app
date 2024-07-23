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
  <div class="flex w-full flex-col items-center">
    <div ref="sentinal" class="h-0 w-full"></div>
    <div class="flex w-full max-w-3xl flex-col gap-4">
      <div
        class="sticky top-16 z-10 flex flex-col gap-4 rounded-lg border bg-background-elevated/90 px-4 py-3 backdrop-blur transition-all duration-300 sm:flex-row"
        :class="{
          '-mx-4 rounded-none border-x-0 border-t-0 !bg-background/90 @3xl/main:rounded-b-lg @3xl/main:border-x @3xl/main:!bg-background-elevated/90':
            isSticky
        }"
      >
        <div class="relative grow">
          <SolarMagniferOutline class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" />
          <Input
            type="text"
            inputmode="numeric"
            autocomplete="off"
            maxlength="19"
            placeholder="Buscar número"
            class="w-full py-2 pl-11 pr-4 text-sm"
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

      <div class="flex w-full flex-col items-stretch gap-0">
        <div
          className="bg-secondary/50 border border-b-0 rounded-t-lg py-2 px-4 flex flex-row items-center justify-between"
        >
          <h2 className="text-3xl py-2 ">Numeración disponible</h2>
          <SolarTicketLineDuotone class="h-8 w-8" />
        </div>
        <div
          v-if="loading"
          className="p-2 border rounded-b-lg grid grid-cols-5 @xl:grid-cols-10 gap-x-2 gap-y-2 place-items-center"
        >
          <Skeleton v-for="i in 100" :key="i" class="h-14 w-14 rounded-full border" />
        </div>
        <div
          className="p-2 border rounded-b-lg grid grid-cols-5 @xl:grid-cols-10 gap-x-2 gap-y-2 place-items-center"
        >
          <Button
            v-for="ticket in showingTickets"
            :key="ticket.id"
            variant="ghost"
            class="h-14 w-14 rounded-full border text-lg"
            :class="{
              'border border-destructive bg-background-elevated': ticket.seller_id !== null
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
      <DialogContent
        class="max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-2xl grid-rows-[auto_minmax(0,1fr)_auto] gap-0 rounded-lg p-0 transition-[opacity,_transform]"
      >
        <!-- <DialogHeader>
          <DialogTitle
            >Informacion de Bono
            <span class="text-2xl">{{ selectedTicketOverview?.number }}</span></DialogTitle
          >
          <DialogDescription> Información del vendedor... </DialogDescription>
        </DialogHeader> -->
        <TicketInfo class="p-6" :ticketId="selectedTicketOverview?.id!" />
        <DialogFooter class="p-6 pt-0">
          <DialogClose as-child>
            <Button type="button" variant="secondary"> Cerrar </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
