<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref, type AsyncComponentOptions } from 'vue'
import { getAllSellersWithTicketsCount } from '@/lib/api/sellers'
import type { Tables } from '@/types/supabase.db'
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
import SolarAddCircleLineDuotone from '~icons/solar/add-circle-line-duotone'
import ErrorComponent from '@/components/ErrorComponent.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'

const isLoading = ref(false)
const sellers = ref<Tables<'sellers_with_tickets_count'>[]>([])

const openFormModal = ref(false)

type asyncComponentOptions = Omit<AsyncComponentOptions<unknown>, 'loader'>

const defaultOptions: asyncComponentOptions = {
  loadingComponent: LoadingIndicator,
  errorComponent: ErrorComponent,
  delay: 100
  // timeout: 100000
}

const path = '@/components/forms/SellerForm.vue'

const formComponent = defineAsyncComponent({
  loader: () => import(path),
  ...defaultOptions
})

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
  <div class="w-full flex flex-col items-center">
    <SellersList :sellers="sellers" :isLoading="isLoading">
      <template #actionButton>
        <AlertDialog :open="openFormModal" v-on:update:open="(value) => (openFormModal = value)">
          <AlertDialogTrigger as-child>
            <Button class="gap-2">
              <SolarAddCircleLineDuotone class="w-5 h-5" />
              <span class="hidden md:inline">Nuevo</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Crear nuevo vendedor</AlertDialogTitle>
              <AlertDialogDescription> Crea un nuevo vendedor </AlertDialogDescription>
            </AlertDialogHeader>
            <div class="grid gap-4 py-4">
              <formComponent />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </template>
      <template #actionForEmpty>
        <Button class="gap-2" @click="openFormModal = true">
          <SolarAddCircleLineDuotone class="w-5 h-5" />
          <span>Crear vendedor</span>
        </Button>
      </template>
    </SellersList>
  </div>
</template>

<style scoped></style>
