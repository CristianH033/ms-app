<script setup lang="ts">
import SellersList from '@/components/SellersList.vue'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { getAllSellersWithTicketsCountByRaffleId } from '@/lib/api/sellers'
import type { Tables } from '@/types/supabase.db'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import SolarAddCircleLineDuotone from '~icons/solar/add-circle-line-duotone'

const router = useRouter()

const sellers = ref<Tables<'sellers_with_tickets_count_by_raffle'>[]>([])
const isLoading = ref(false)
const openFormModal = ref(false)

const fetchSellers = async () => {
  isLoading.value = true
  const id = router.currentRoute.value.params.id
  getAllSellersWithTicketsCountByRaffleId(Number(id))
    .then((data) => {
      sellers.value = data
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      isLoading.value = false
    })
}

onMounted(async () => {
  await fetchSellers()
})
</script>

<template>
  <div class="w-full flex flex-col items-center">
    <SellersList :sellers="sellers" :isLoading="isLoading">
      <template #actionButton>
        <AlertDialog :open="openFormModal" v-on:update:open="(value) => (openFormModal = value)">
          <AlertDialogTrigger as-child>
            <Button class="gap-2">
              <SolarAddCircleLineDuotone class="w-5 h-5" />
              <span class="hidden md:inline">Agregar</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Agregar vendedor</AlertDialogTitle>
              <AlertDialogDescription>
                Agrega un nuevo vendedor a esta rifa
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div class="grid gap-4 py-4">Agregar vendedores a esta rifa</div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction>Agregar</AlertDialogAction>
            </AlertDialogFooter>
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
