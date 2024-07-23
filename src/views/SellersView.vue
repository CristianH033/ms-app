<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getAllSellersWithTicketsCount } from '@/lib/api/sellers'
import type { Tables } from '@/types/supabase.db'
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
import SolarAddCircleLineDuotone from '~icons/solar/add-circle-line-duotone'
import SellerForm from '@/components/forms/SellerForm.vue'

const isLoading = ref(false)
const sellers = ref<Tables<'sellers_with_tickets_count'>[]>([])

const openFormModal = ref(false)

const refreshSellers = () => {
  openFormModal.value = false
  getAllSellersWithTicketsCount()
    .then((data) => {
      sellers.value = data
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(async () => {
  isLoading.value = true

  getAllSellersWithTicketsCount()
    .then((data) => {
      sellers.value = data
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      isLoading.value = false
    })
})
</script>

<template>
  <div class="flex w-full flex-col items-center">
    <SellersList :sellers="sellers" :isLoading="isLoading">
      <template #actionButton>
        <AlertDialog :open="openFormModal" v-on:update:open="(value) => (openFormModal = value)">
          <AlertDialogTrigger as-child>
            <Button class="gap-2">
              <SolarAddCircleLineDuotone class="h-5 w-5" />
              <span class="hidden md:inline">Nuevo vendedor</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Crear nuevo vendedor</AlertDialogTitle>
              <AlertDialogDescription> Crea un nuevo vendedor </AlertDialogDescription>
            </AlertDialogHeader>
            <div class="grid gap-4 py-4">
              <SellerForm @success="refreshSellers" @cancel="openFormModal = false" />
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </template>
      <template #actionForEmpty>
        <Button class="gap-2" @click="openFormModal = true">
          <SolarAddCircleLineDuotone class="h-5 w-5" />
          <span>Crear vendedor</span>
        </Button>
      </template>
    </SellersList>
  </div>
</template>

<style scoped></style>
