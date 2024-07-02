<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import SolarMagniferOutline from '~icons/solar/magnifer-outline'
import { useIntersectionObserver } from '@vueuse/core'
import SolarAddCircleLineDuotone from '~icons/solar/add-circle-line-duotone'
import SolarUserCrossRoundedLineDuotone from '~icons/solar/user-cross-rounded-line-duotone'
import { computed, onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  getAllSellersWithTickets,
  getAllSellersWithTicketsCount,
  type SellersWithTickets
} from '@/lib/api/sellers'
import { supabase } from '@/lib/supabase.client'

const isSticky = ref(false)

const sellers = ref<SellersWithTickets>([])

const sentinal = ref<HTMLElement | null>(null)

const totalTicketsCount = computed(() => {
  return sellers.value?.reduce((total, seller) => total + seller.tickets.length, 0)
})

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
      console.log({ data: data })
      // sellers.value = data
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
        <Button class="gap-2">
          <SolarAddCircleLineDuotone class="w-5 h-5" />
          <span class="hidden md:inline">Nuevo</span>
        </Button>
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
          <div v-for="seller in sellers" :key="seller.id" class="px-4 py-3 flex items-center gap-4">
            <Avatar class="w-10 h-10">
              <AvatarImage class="" :src="seller.avatar_url as string" />
              <AvatarFallback class="">{{ seller.name.charAt(0) }}</AvatarFallback>
            </Avatar>
            <div class="flex-1">
              <div class="font-medium capitalize">{{ seller.name }}</div>
              <div class="text-sm text-foreground/60">{{ seller.email }}</div>
            </div>
            <Badge>{{ seller.tickets.length }}</Badge>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
