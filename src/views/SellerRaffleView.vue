<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase.client'
import type { Tables } from '@/types/supabase.db'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import SolarTicketLineDuotone from '~icons/solar/ticket-line-duotone'
import SolarAddCircleLineDuotone from '~icons/solar/add-circle-line-duotone'
import SvgSpinnersDotRevolve from '~icons/svg-spinners/dot-revolve'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { numberToCurrency } from '@/lib/utils/strings'
import { OnLongPress } from '@vueuse/components'
import { formatDate } from '@vueuse/core'
import { useTitle } from '@vueuse/core'

const router = useRouter()

const title = useTitle()

// raffles/:id/sellers/:seller_id
const raffleId = router.currentRoute.value.params.id
const sellerId = router.currentRoute.value.params.seller_id

const raffle = ref<Tables<'raffle_stats'>>()
const seller = ref<Tables<'sellers'>>()
const raffleSellerInfo = ref<Tables<'raffles_sellers'>>()
const availableTickets = ref<Tables<'tickets'>[]>([])
const sellerTickets = ref<Tables<'tickets'>[]>([])
const selectedTickets = ref<Number[] | null>(null)
const selectDialogOpen = ref(false)
const removeDialogOpen = ref(false)
const isLoading = ref(false)
const selectedGroup = ref<string>('')
const selectedTicketToRemove = ref<Tables<'tickets'> | null>(null)

const ticketsGrouped = computed(() => {
  // Get unique first chacters from tickets
  const uniqueFirstChars = Array.from(
    new Set(sellerTickets.value.map((ticket) => ticket.number[0]))
  )

  const groups = uniqueFirstChars.map((firstChar) => {
    return {
      group: firstChar,
      sellerTickets: sellerTickets.value.filter((ticket) => ticket.number[0] === firstChar)
    }
  }) as { group: string; sellerTickets: Tables<'tickets'>[] }[]

  const defaultGroups = [
    { group: '0', sellerTickets: [] },
    { group: '1', sellerTickets: [] },
    { group: '2', sellerTickets: [] },
    { group: '3', sellerTickets: [] },
    { group: '4', sellerTickets: [] },
    { group: '5', sellerTickets: [] },
    { group: '6', sellerTickets: [] },
    { group: '7', sellerTickets: [] },
    { group: '8', sellerTickets: [] },
    { group: '9', sellerTickets: [] }
  ] as { group: string; sellerTickets: Tables<'tickets'>[] }[]

  return defaultGroups.map((group) => {
    const foundGroup = groups.find((g) => g.group === group.group)
    foundGroup?.sellerTickets.sort((a, b) => Number(a.number) - Number(b.number))
    return foundGroup || group
  })
})

const totalSellerTickets = computed(() => {
  return sellerTickets.value.length
})

const dialogGroupTickets = computed(() => {
  console.log(selectedGroup.value)
  return selectedGroup.value
    ? availableTickets.value.filter((ticket) => ticket.number[0] === selectedGroup.value)
    : []
})

const openDialogForGroup = (group: string) => {
  selectedGroup.value = group
  nextTick(() => {
    selectDialogOpen.value = true
  })
}

const addToSelected = (ticket: Tables<'tickets'>) => {
  if (selectedTickets.value?.includes(ticket.id)) {
    selectedTickets.value = selectedTickets.value?.filter((id) => id !== ticket.id)
  } else {
    selectedTickets.value = [...(selectedTickets.value ?? []), ticket.id]
  }
}

const isSelected = (ticket: Tables<'tickets'>) => {
  return selectedTickets.value?.includes(ticket.id)
}

const getRaffleStats = async () => {
  const { data, error } = await supabase
    .from('raffle_stats')
    .select('*')
    .eq('raffle_id', raffleId)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  raffle.value = data
}

const getSeller = async () => {
  const { data, error } = await supabase.from('sellers').select('*').eq('id', sellerId).single()

  if (error) {
    throw new Error(error.message)
  }

  seller.value = data
}

const getSellerTickets = async () => {
  const { data, error } = await supabase
    .from('tickets')
    .select('*')
    .eq('raffle_id', raffleId)
    .eq('seller_id', sellerId)

  if (error) {
    throw new Error(error.message)
  }

  sellerTickets.value = data
}

const getAvailableTickets = async () => {
  const { data, error } = await supabase
    .from('tickets')
    .select('*')
    .eq('raffle_id', raffleId)
    .is('seller_id', null)

  if (error) {
    throw new Error(error.message)
  }

  availableTickets.value = data
}

const getRaffleSellerInfo = async () => {
  const { data, error } = await supabase
    .from('raffles_sellers')
    .select('*')
    .eq('raffle_id', raffleId)
    .eq('seller_id', sellerId)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  raffleSellerInfo.value = data
}

const assingSeletedTickets = async () => {
  isLoading.value = true
  const { error } = await supabase
    .from('tickets')
    .update({ seller_id: Number(sellerId) })
    .in('id', selectedTickets.value?.map((id) => Number(id)) as number[])

  if (error) {
    throw new Error(error.message)
  }

  getRaffleSellerInfo()
  getAvailableTickets()
  getSellerTickets()

  isLoading.value = false

  selectDialogOpen.value = false
}

const removeSellerTicket = async (ticketId: number) => {
  isLoading.value = true
  const { error } = await supabase.from('tickets').update({ seller_id: null }).eq('id', ticketId)

  if (error) {
    throw new Error(error.message)
  }

  getRaffleSellerInfo()
  getAvailableTickets()
  getSellerTickets()
  isLoading.value = false
  removeDialogOpen.value = false
}

const openRemoveDialog = (ticket: Tables<'tickets'>) => {
  removeDialogOpen.value = true
  selectedTicketToRemove.value = ticket
}

const originalDocumentTitle = title.value

onMounted(async () => {
  await getRaffleStats()
  await getSeller()
  await getRaffleSellerInfo()
  await getSellerTickets()
  await getAvailableTickets()

  title.value = `${seller.value?.name?.toUpperCase()} - SANCHEZ INVERSIONES`
})

onBeforeUnmount(() => {
  title.value = originalDocumentTitle
})
</script>

<template>
  <div class="mx-auto rounded-md p-4">
    <div class="mb-4 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold uppercase text-primary">{{ raffle?.raffle_name }}</h1>
        <h2 class="text-2xl font-bold uppercase">{{ seller?.name }}</h2>
        <p>{{ seller?.phone }}</p>
      </div>
      <div class="max-w-80 text-right">
        <!-- <p>{{ formatDate(raffle?.draw_drawn_at!) }}</p> -->
        <p>{{ numberToCurrency(raffleSellerInfo?.ticket_price!) }}</p>
        <p>{{ raffle?.lottery_name }}</p>
        <p class="capitalize">
          {{
            formatDate(new Date(Date.parse(raffle?.draw_drawn_at!)), 'dddd DD [de] MMMM [de] YYYY')
          }}
        </p>
      </div>
    </div>
    <div class="space-y-4 print:my-0">
      <div
        v-for="group in ticketsGrouped"
        :key="group.group"
        class="flex break-before-auto items-center gap-4 rounded-md border p-4 print:gap-1 print:p-2"
      >
        <div
          class="flex flex-row items-center justify-center self-start tabular-nums print:self-center"
        >
          <h3 class="text-7xl text-primary print:text-7xl">{{ group.group }}</h3>
        </div>
        <div class="flex flex-wrap gap-2">
          <OnLongPress
            v-for="ticket in group.sellerTickets"
            :key="ticket.id"
            as="button"
            class="button small ml-2"
            @trigger="openRemoveDialog(ticket)"
          >
            <Button
              variant="ghost"
              @contextmenu.prevent="openRemoveDialog(ticket)"
              class="h-14 min-h-14 w-14 min-w-14 flex-col items-center justify-center rounded-full border border-primary text-lg print:h-10 print:min-h-10 print:w-10 print:min-w-10 print:rounded-md print:text-sm print:font-extrabold"
            >
              <span class="pointer-events-none">{{ ticket.number }}</span>
            </Button>
          </OnLongPress>
          <Button
            @click="openDialogForGroup(group.group)"
            variant="ghost"
            class="h-14 w-14 rounded-full border text-lg print:hidden"
          >
            +
          </Button>
        </div>
      </div>
      <div class="flex w-full flex-col gap-4 print:flex-row">
        <div class="flex w-full items-center gap-4 rounded-md border p-4 print:p-2">
          <h3 class="text-3xl font-extrabold text-primary">POOL</h3>
          <div class="flex flex-row flex-wrap gap-2">
            <!-- <Button
              v-for="i in 12"
              :key="i"
              variant="ghost"
              class="print:min-w-10 print:min-h-10 print:w-10 print:h-10 user-select-none text-lg w-14 h-14 border rounded-md border-primary"
            >
              <span class="pointer-events-none user-select-none">{{ i }}</span>
            </Button> -->
            <Button variant="ghost" class="h-14 w-14 border text-lg print:hidden"> + </Button>
          </div>
        </div>
        <div class="flex justify-end">
          <div
            class="flex flex-row items-center gap-4 rounded-md border p-4 text-right print:flex-col print:gap-2 print:p-2"
          >
            <p class="text-lg font-semibold">TOTAL</p>
            <p class="text-4xl font-extrabold text-primary">{{ totalSellerTickets }}</p>
          </div>
        </div>
      </div>
    </div>
    <AlertDialog :open="selectDialogOpen" v-on:update:open="(value) => (selectDialogOpen = value)">
      <AlertDialogContent
        class="max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-2xl grid-rows-[auto_minmax(0,1fr)_auto] gap-0 rounded-lg p-0 transition-[opacity,_transform]"
      >
        <AlertDialogHeader class="border-b p-6 pb-4">
          <AlertDialogTitle>
            <div class="flex flex-row items-center justify-start gap-2">
              <SolarTicketLineDuotone class="h-8 w-8" />
              <span> Asignar Boletas </span>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Seleccione una o más boletas para asignarlas a este vendedor
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div class="relative max-h-[55dvh] overflow-y-auto px-6 py-4">
          <div
            className="w-full max-w-3xl grid grid-cols-5 md:grid-cols-10 gap-x-2 gap-y-2 place-items-center"
          >
            <Button
              v-for="ticket in dialogGroupTickets"
              :key="ticket.id"
              variant="ghost"
              class="h-14 w-14 rounded-full border text-lg"
              :class="{
                'bg-green-600 hover:bg-green-700': isSelected(ticket)
              }"
              @click="addToSelected(ticket)"
              :disabled="isLoading"
            >
              {{ ticket.number }}
            </Button>
          </div>
        </div>
        <AlertDialogFooter class="gap-2 border-t p-6 pt-4">
          <AlertDialogCancel as-child>
            <Button variant="secondary" type="button" :disabled="isLoading">Cancelar</Button>
          </AlertDialogCancel>
          <!-- <AlertDialogAction as-child> -->
          <!-- <Button type="submit" form="raffle-form" :disabled="submiting">Crear</Button> -->
          <Button
            @click="assingSeletedTickets"
            class="gap-3"
            v-auto-animate
            form="raffle-form"
            type="submit"
            :disabled="isLoading"
          >
            <SvgSpinnersDotRevolve v-if="isLoading" class="h-6 w-6" />
            <SolarAddCircleLineDuotone v-else class="h-6 w-6" />
            <span>Asignar</span>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    <AlertDialog :open="removeDialogOpen" v-on:update:open="(value) => (removeDialogOpen = value)">
      <AlertDialogContent
        class="max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-2xl grid-rows-[auto_minmax(0,1fr)_auto] gap-0 rounded-lg p-0 transition-[opacity,_transform]"
      >
        <AlertDialogHeader class="border-b p-6 pb-4">
          <AlertDialogTitle>
            <div class="flex flex-row items-center justify-start gap-2">
              <SolarTicketLineDuotone class="h-8 w-8" />
              <span> Remover Boleta </span>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción removerá la boleta de este vendedor
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div class="flex flex-row items-center justify-center gap-2 p-4">
          <Button
            variant="ghost"
            class="h-32 w-32 rounded-full border text-4xl"
            :disabled="isLoading"
          >
            {{ selectedTicketToRemove?.number }}
          </Button>
        </div>
        <AlertDialogFooter class="gap-2 border-t p-6 pt-4">
          <AlertDialogCancel as-child>
            <Button variant="secondary" type="button" :disabled="isLoading">Cancelar</Button>
          </AlertDialogCancel>
          <!-- <AlertDialogAction as-child> -->
          <!-- <Button type="submit" form="raffle-form" :disabled="submiting">Crear</Button> -->
          <Button
            @click="removeSellerTicket(selectedTicketToRemove?.id as number)"
            class="gap-3"
            v-auto-animate
            form="raffle-form"
            type="button"
            variant="destructive"
            :disabled="isLoading"
          >
            <SvgSpinnersDotRevolve v-if="isLoading" class="h-6 w-6" />
            <SolarAddCircleLineDuotone v-else class="h-6 w-6" />
            <span>Remover</span>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    <header class="hidden print:!fixed print:top-0 print:block">SÁNCHEZ INVERSIONES</header>
  </div>
</template>

<style scoped></style>
