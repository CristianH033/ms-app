<script setup lang="ts">
import RafflesList from '@/components/RafflesList.vue'
import SolarAddCircleLineDuotone from '~icons/solar/add-circle-line-duotone'
import { getAllRaffles } from '@/lib/api/raffles'
import type { Tables } from '@/types/supabase.db'
import { onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'
import RaffleForm from '../components/forms/RaffleForm.vue'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import SolarMagniferOutline from '~icons/solar/magnifer-outline'
import Input from '@/components/ui/input/Input.vue'
import { useIntersectionObserver } from '@vueuse/core'
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

const loading = ref(false)
const raffles = ref<Tables<'raffles'>[]>([])

const isSticky = ref(false)

const sentinal = ref<HTMLDivElement | null>(null)

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

  // await new Promise((resolve) => setTimeout(resolve, 5000))

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
})
</script>

<template>
  <div class="w-full flex flex-col items-center">
    <div ref="sentinal" class="w-full h-0"></div>
    <div class="flex flex-col w-full max-w-3xl gap-4">
      <div
        class="flex flex-row gap-4 transition-all duration-300 bg-background-elevated/90 backdrop-blur px-4 py-3 border rounded-lg sticky top-16 z-10"
        :class="{
          '!bg-background/90 @3xl/main:!bg-background-elevated/90 rounded-none @3xl/main:rounded-b-lg border-t-0 border-x-0 @3xl/main:border-x -mx-4':
            isSticky
        }"
      >
        <div class="grow relative">
          <SolarMagniferOutline class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
          <Input type="text" placeholder="Search" class="w-full pl-11 pr-4 py-2 text-sm" />
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button class="gap-2">
              <SolarAddCircleLineDuotone class="w-5 h-5" />
              <span class="hidden md:inline">Nueva rifa</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent
            class="transition-[opacity,_transform] gap-0 p-0 max-w-2xl w-[calc(100vw-2rem)] max-h-[calc(100dvh-2rem)] rounded-lg grid-rows-[auto_minmax(0,1fr)_auto]"
          >
            <AlertDialogHeader class="p-6 pb-4 border-b">
              <AlertDialogTitle>Nueva Rifa</AlertDialogTitle>
              <AlertDialogDescription> Crea una nueva rifa </AlertDialogDescription>
            </AlertDialogHeader>
            <div class="px-6 py-4 overflow-y-auto">
              <RaffleForm withoutActions id="raffle-form" />
            </div>
            <AlertDialogFooter class="p-6 pt-4 border-t gap-2">
              <AlertDialogCancel as-child>
                <Button variant="secondary">Cancelar</Button>
              </AlertDialogCancel>
              <AlertDialogAction as-child>
                <Button type="submit" form="raffle-form">Crear</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div class="w-full flex flex-col gap-4 items-center">
        <RafflesList :raffles="raffles" :loading="loading" />
      </div>
    </div>
    <!-- <div
      class="max-w-3xl flex flex-row justify-between gap-4 mb-4 transition-all duration-300 bg-secondary/60 backdrop-blur px-3 py-3 border rounded-lg sticky top-16 z-10"
      :claass="{ 'rounded-none border-t-0 border-x-0 -mx-4': isSticky }"
      :class="{
        'rounded-none @3xl/main:rounded-b-lg border-t-0 border-x-0 @3xl/main:border-x -mx-4':
          isSticky
      }"
    >
      <div class="grow relative max-w-2xl">
        <SolarMagniferOutline class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
        <Input type="text" placeholder="Search" class="w-full pl-11 pr-4 py-2 text-sm" />
      </div>
    </div> -->

    <div class="w-full flex flex-col items-center"></div>
  </div>
</template>
