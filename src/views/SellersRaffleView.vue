<script setup lang="ts">
import SellersList from '@/components/SellersList.vue'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getAllSellers, getAllSellersWithTicketsCountByRaffleId } from '@/lib/api/sellers'
import type { Tables } from '@/types/supabase.db'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import SolarAddCircleLineDuotone from '~icons/solar/add-circle-line-duotone'
import SolarCupStarLineDuotone from '~icons/solar/cup-star-line-duotone'
import AddSellerToRaffleForm from '@/components/forms/AddSellerToRaffleForm.vue'
import { supabase } from '@/lib/supabase.client'
import { format, parse } from '@formkit/tempo'

const router = useRouter()
const raffle = ref<Tables<'raffle_stats'> | undefined>()
const sellers = ref<Tables<'sellers'>[]>([])
const raffleSellers = ref<Tables<'sellers_with_tickets_count'>[]>([])
const drawnAt = ref<string>('')
const isLoading = ref(false)
const openFormModal = ref(false)

const raffleId = router.currentRoute.value.params.id

const fetchRaffleStats = async () => {
  await supabase
    .from('raffle_stats')
    .select('*')
    .eq('raffle_id', raffleId)
    .single()
    .then((result) => {
      raffle.value = result.data!
    })
}

const fetchSellers = async () => {
  isLoading.value = true
  getAllSellers()
    .then((data) => {
      sellers.value = data!
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      isLoading.value = false
    })
}

const fetchRaffleSellers = async () => {
  isLoading.value = true
  getAllSellersWithTicketsCountByRaffleId(Number(raffleId))
    .then((data) => {
      raffleSellers.value = data
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      isLoading.value = false
    })
}

const closeAndFetchRaffleSellers = async () => {
  openFormModal.value = false
  await fetchRaffleSellers()
}

onMounted(async () => {
  // await fetchRaffle()
  await fetchRaffleStats()
  await fetchSellers()
  await fetchRaffleSellers()

  const date = parse(raffle.value?.draw_drawn_at!, 'YYYY-MM-DDTHH:mm:ss')
  const formattedDate = format(date, 'YYYY/MM/DD')

  drawnAt.value = formattedDate
})
</script>

<template>
  <div class="w-full flex flex-col items-center gap-4">
    <Card class="w-full">
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-lg font-medium">
          <p class="text-2xl font-bold">{{ raffle?.raffle_name }}</p>
          <p>{{ raffle?.description }}</p>
          <p>Juega con: {{ raffle?.draw_name }} - ({{ drawnAt }})</p>
        </CardTitle>
        <SolarCupStarLineDuotone class="w-6 h-6" />
      </CardHeader>
      <CardContent>
        <div class="text-xl font-bold">{{ raffle?.total_tickets }} boletas</div>
        <p class="text-xs text-muted-foreground">{{ raffle?.available_tickets }} Disponibles</p>
        <p class="text-xs text-muted-foreground">{{ raffle?.taken_tickets }} asignadas</p>
      </CardContent>
    </Card>
    <SellersList :sellers="raffleSellers" :isLoading="isLoading">
      <template #actionButton>
        <AlertDialog :open="openFormModal" v-on:update:open="(value) => (openFormModal = value)">
          <AlertDialogTrigger as-child>
            <Button class="gap-2">
              <SolarAddCircleLineDuotone class="w-5 h-5" />
              <span class="hidden md:inline">Agregar</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent
            class="transition-[opacity,_transform] gap-0 p-0 max-w-2xl w-[calc(100vw-2rem)] max-h-[calc(100dvh-2rem)] rounded-lg grid-rows-[auto_minmax(0,1fr)_auto]"
          >
            <AlertDialogHeader class="p-4 border-b">
              <AlertDialogTitle>Agregar vendedor</AlertDialogTitle>
              <AlertDialogDescription class="mt-4"> </AlertDialogDescription>
            </AlertDialogHeader>
            <div class="overflow-y-auto relative p-4">
              <AddSellerToRaffleForm
                :raffle-id="Number(raffleId)"
                v-on:cancel="() => (openFormModal = false)"
                v-on:success="closeAndFetchRaffleSellers"
              />
            </div>
            <!-- <div class="grid gap-4 py-4">Agregar vendedores a esta rifa</div> -->
            <!-- <AlertDialogFooter class="p-4 flex flex-col justify-start items-center border-t">
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction>Agregar</AlertDialogAction>
            </AlertDialogFooter> -->
          </AlertDialogContent>
        </AlertDialog>
      </template>
      <template #emptyText>
        <p>No hay vendedores en esta rifa</p>
      </template>
      <template #actionForEmpty>
        <Button class="gap-2" @click="openFormModal = true">
          <SolarAddCircleLineDuotone class="w-5 h-5" />
          <span>Agregar venddor a esta rifa</span>
        </Button>
      </template>
    </SellersList>
  </div>
</template>

<style scoped></style>
