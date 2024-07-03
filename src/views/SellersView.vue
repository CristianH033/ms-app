<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import SolarMagniferOutline from '~icons/solar/magnifer-outline'
import { useIntersectionObserver } from '@vueuse/core'
import SolarAddCircleLineDuotone from '~icons/solar/add-circle-line-duotone'
import SolarUserCrossRoundedLineDuotone from '~icons/solar/user-cross-rounded-line-duotone'
import { defineAsyncComponent, onMounted, ref, type AsyncComponentOptions } from 'vue'
import { Button } from '@/components/ui/button'
import { getAllSellersWithTicketsCount } from '@/lib/api/sellers'
import type { Tables } from '@/types/supabase.db'
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
import LoadingIndicator from '@/components/LoadingIndicator.vue'
import ErrorComponent from '@/components/ErrorComponent.vue'

const isSticky = ref(false)

const sellers = ref<Tables<'sellers_with_tickets_count'>[]>([])

const sentinal = ref<HTMLElement | null>(null)

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

const avatarLetters = (name: string) => {
  return name
    .split(' ')
    .map((n) => n.charAt(0))
    .join('')
}

useIntersectionObserver(
  sentinal,
  ([{ isIntersecting }]) => {
    isSticky.value = !isIntersecting
  },
  {
    rootMargin: '-65px'
  }
)

onMounted(async () => {
  getAllSellersWithTicketsCount()
    .then((data) => {
      // console.log({ data: data })
      sellers.value = data
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<template>
  <div class="w-full flex flex-col items-center">
    <div ref="sentinal" class="w-full h-0"></div>
    <div class="flex flex-col w-full max-w-3xl">
      <div
        class="flex flex-row gap-4 transition-all duration-300 bg-background-elevated/90 backdrop-blur px-4 py-3 border rounded-lg rounded-b-none sticky top-16 z-10"
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
      </div>
      <div class="flex-1 overflow-auto rounded-b-lg border border-t-0">
        <div class="divide-y">
          <div
            v-if="sellers.length === 0"
            class="px-4 py-4 flex flex-col justify-center items-center gap-2"
          >
            <SolarUserCrossRoundedLineDuotone class="w-16 h-16" />
            <p class="text-lg">No hay vendedores</p>
            <div class="w-full border-t flex flex-col items-center justify-center my-4"></div>
            <Button class="gap-2">
              <SolarAddCircleLineDuotone class="w-5 h-5" />
              <span>Crear vendedor</span>
            </Button>
          </div>
          <div
            v-for="seller in sellers"
            :key="seller.id!"
            class="px-4 py-3 flex items-center gap-4"
          >
            <Avatar class="w-10 h-10">
              <AvatarImage class="" :src="seller.avatar_url!" />
              <AvatarFallback>{{ avatarLetters(seller.name!) }}</AvatarFallback>
            </Avatar>
            <div class="flex-1">
              <div class="font-medium capitalize">{{ seller.name }}</div>
              <div class="text-sm text-foreground/60">{{ seller.email }}</div>
            </div>
            <Badge>{{ seller.total_tickets }}</Badge>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
