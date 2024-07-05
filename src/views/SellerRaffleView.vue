<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase.client'
import type { Tables } from '@/types/supabase.db'
import { computed, nextTick, onMounted, ref } from 'vue'
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

const router = useRouter()

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
    return foundGroup || group
  })
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

onMounted(() => {
  getRaffleStats()
  getSeller()
  getRaffleSellerInfo()
  getSellerTickets()
  getAvailableTickets()
})
</script>

<template>
  <div class="p-4 rounded-md mx-auto">
    <div class="flex justify-between items-center mb-4">
      <div>
        <h1 class="text-2xl font-bold">{{ raffle?.raffle_name }}</h1>
        <h2 class="text-xl uppercase">{{ seller?.name }}</h2>
        <p>{{ seller?.phone }}</p>
      </div>
      <div class="text-right max-w-80">
        <!-- <p>{{ formatDate(raffle?.draw_drawn_at!) }}</p> -->
        <p>{{ numberToCurrency(raffleSellerInfo?.ticket_price!) }}</p>
        <p>
          {{ raffle?.description }}
        </p>
      </div>
    </div>
    <div class="space-y-4">
      <div
        v-for="group in ticketsGrouped"
        :key="group.group"
        class="flex items-center gap-4 print:gap-1 border p-4 print:p-1 rounded-md break-before-auto"
      >
        <div class="tabular-nums self-start">
          <h3 class="text-7xl">{{ group.group }}</h3>
        </div>
        <div class="flex flex-wrap gap-2">
          <OnLongPress
            v-for="ticket in group.sellerTickets"
            :key="ticket.id"
            as="button"
            class="ml-2 button small"
            @trigger="openRemoveDialog(ticket)"
          >
            <Button
              variant="ghost"
              @contextmenu.prevent="openRemoveDialog(ticket)"
              class="text-lg w-14 h-14 print:w-8 print:h-8 border rounded-full print:text-xs flex-col justify-center items-center"
            >
              <span class="pointer-events-none">{{ ticket.number }}</span>
            </Button>
          </OnLongPress>
          <Button
            @click="openDialogForGroup(group.group)"
            variant="ghost"
            class="print:hidden text-lg w-14 h-14 border rounded-full"
          >
            +
          </Button>
        </div>
      </div>
      <pre>{{ selectDialogOpen }}</pre>
      <div class="w-full h-16"></div>
      <h3 class="text-xl break-before-page">Pulles</h3>
      <div class="flex items-center gap-4 border p-4 rounded-md">
        <div class="flex gap-2">
          <Button class="text-lg w-14 h-14 border bg-green-700 rounded-md"> 12 </Button>
          <Button
            variant="ghost"
            @contextmenu.prevent="selectDialogOpen = true"
            class="user-select-none text-lg w-14 h-14 border bg-green-700 rounded-md"
          >
            <span class="pointer-events-none user-select-none">14</span>
          </Button>
          <Button variant="ghost" class="print:hidden text-lg w-14 h-14 border"> + </Button>
        </div>
      </div>
    </div>
    <AlertDialog :open="selectDialogOpen" v-on:update:open="(value) => (selectDialogOpen = value)">
      <AlertDialogContent
        class="transition-[opacity,_transform] gap-0 p-0 max-w-2xl w-[calc(100vw-2rem)] max-h-[calc(100dvh-2rem)] rounded-lg grid-rows-[auto_minmax(0,1fr)_auto]"
      >
        <AlertDialogHeader class="p-6 pb-4 border-b">
          <AlertDialogTitle>
            <div class="flex flex-row gap-2 justify-start items-center">
              <SolarTicketLineDuotone class="w-8 h-8" />
              <span> Asignar Boletas </span>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Seleccione una o más boletas para asignarlas a este vendedor
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div class="px-6 py-4 overflow-y-auto relative max-h-[55dvh]">
          <div
            className="w-full max-w-3xl grid grid-cols-5 md:grid-cols-10 gap-x-2 gap-y-2 place-items-center"
          >
            <Button
              v-for="ticket in dialogGroupTickets"
              :key="ticket.id"
              variant="ghost"
              class="text-lg w-14 h-14 border rounded-full"
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
        <AlertDialogFooter class="p-6 pt-4 border-t gap-2">
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
            <SolarAddCircleLineDuotone v-else class="w-6 h-6" />
            <span>Asignar</span>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    <AlertDialog :open="removeDialogOpen" v-on:update:open="(value) => (removeDialogOpen = value)">
      <AlertDialogContent
        class="transition-[opacity,_transform] gap-0 p-0 max-w-2xl w-[calc(100vw-2rem)] max-h-[calc(100dvh-2rem)] rounded-lg grid-rows-[auto_minmax(0,1fr)_auto]"
      >
        <AlertDialogHeader class="p-6 pb-4 border-b">
          <AlertDialogTitle>
            <div class="flex flex-row gap-2 justify-start items-center">
              <SolarTicketLineDuotone class="w-8 h-8" />
              <span> Remover Boleta </span>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción removerá la boleta de este vendedor
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div class="flex flex-row gap-2 justify-center items-center p-4">
          <Button
            variant="ghost"
            class="text-4xl w-32 h-32 border rounded-full"
            :disabled="isLoading"
          >
            {{ selectedTicketToRemove?.number }}
          </Button>
        </div>
        <AlertDialogFooter class="p-6 pt-4 border-t gap-2">
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
            <SolarAddCircleLineDuotone v-else class="w-6 h-6" />
            <span>Remover</span>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<style scoped></style>
