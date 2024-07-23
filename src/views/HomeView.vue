<script setup lang="ts">
import RafflesList from '@/components/RafflesList.vue'
import SolarAddCircleLineDuotone from '~icons/solar/add-circle-line-duotone'
import { getAllRaffles } from '@/lib/api/raffles'
import type { Tables } from '@/types/supabase.db'
import { computed, onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'
import RaffleForm from '../components/forms/RaffleForm.vue'
import SolarMagniferOutline from '~icons/solar/magnifer-outline'
import SolarTicketLineDuotone from '~icons/solar/ticket-line-duotone'
import SvgSpinnersDotRevolve from '~icons/svg-spinners/dot-revolve'
import Input from '@/components/ui/input/Input.vue'
import { useIntersectionObserver } from '@vueuse/core'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'

const loading = ref(false)
const submiting = ref(false)
const search = ref('')
const raffles = ref<Tables<'raffles'>[]>([])
const raffleFormOpen = ref(false)

const isSticky = ref(false)

const sentinal = ref<HTMLDivElement | null>(null)

const rafflesFiltered = computed(() => {
  return raffles.value.filter((raffle) => {
    return raffle.name.toLowerCase().includes(search.value.toLowerCase())
  })
})

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

const closeRaffleForm = () => {
  raffleFormOpen.value = false
}

const onSucess = async () => {
  closeRaffleForm()
  // reload raffles
  await fetchRaffles()
}

const fetchRaffles = async () => {
  loading.value = true
  await getAllRaffles()
    .then((data) => {
      raffles.value = data
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      loading.value = false
    })
}

onMounted(async () => {
  await fetchRaffles()
})
</script>

<template>
  <div class="flex w-full flex-col items-center">
    <div ref="sentinal" class="h-0 w-full"></div>
    <div class="flex w-full max-w-3xl flex-col gap-4">
      <div
        class="sticky top-16 z-10 flex flex-row gap-4 rounded-lg border bg-background-elevated/90 px-4 py-3 backdrop-blur transition-all duration-300"
        :class="{
          '-mx-4 rounded-none border-x-0 border-t-0 !bg-background/90 @3xl/main:rounded-b-lg @3xl/main:border-x @3xl/main:!bg-background-elevated/90':
            isSticky
        }"
      >
        <div class="relative grow">
          <SolarMagniferOutline class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" />
          <Input
            type="text"
            v-model="search"
            autocomplete="off"
            placeholder="Buscar"
            class="w-full py-2 pl-11 pr-4 text-sm"
          />
        </div>
        <AlertDialog :open="raffleFormOpen" v-on:update:open="(value) => (raffleFormOpen = value)">
          <AlertDialogTrigger asChild>
            <Button class="gap-2">
              <SolarAddCircleLineDuotone class="h-5 w-5" />
              <span class="hidden md:inline">Nueva rifa</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent
            class="max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-2xl grid-rows-[auto_minmax(0,1fr)_auto] gap-0 rounded-lg p-0 transition-[opacity,_transform]"
          >
            <AlertDialogHeader class="border-b p-6 pb-4">
              <AlertDialogTitle>
                <div class="flex flex-row items-center justify-start gap-2">
                  <SolarTicketLineDuotone class="h-8 w-8" />
                  <span> Nueva Rifa </span>
                </div>
              </AlertDialogTitle>
              <AlertDialogDescription> Crea una nueva rifa </AlertDialogDescription>
            </AlertDialogHeader>
            <div class="relative overflow-y-auto px-6 py-4">
              <RaffleForm
                withoutActions
                id="raffle-form"
                v-model:isSubmiting="submiting"
                v-on:success="onSucess"
              />
            </div>
            <AlertDialogFooter class="gap-2 border-t p-6 pt-4">
              <AlertDialogCancel as-child>
                <Button variant="secondary" type="button" :disabled="submiting">Cancelar</Button>
              </AlertDialogCancel>
              <!-- <AlertDialogAction as-child> -->
              <!-- <Button type="submit" form="raffle-form" :disabled="submiting">Crear</Button> -->
              <Button
                class="gap-3"
                v-auto-animate
                form="raffle-form"
                type="submit"
                :disabled="submiting"
              >
                <SvgSpinnersDotRevolve v-if="submiting" class="h-6 w-6" />
                <SolarAddCircleLineDuotone v-else class="h-6 w-6" />
                <span>Crear</span>
              </Button>
              <!-- </AlertDialogAction> -->
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div class="flex w-full flex-col items-center gap-4">
        <RafflesList :raffles="rafflesFiltered" :loading="loading" />
      </div>
    </div>

    <div class="flex w-full flex-col items-center"></div>
  </div>
</template>
