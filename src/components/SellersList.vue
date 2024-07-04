<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import { computed, ref } from 'vue'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import LoadingIndicator from '@/components/LoadingIndicator.vue'
import SolarMagniferOutline from '~icons/solar/magnifer-outline'
import SolarUserCrossRoundedLineDuotone from '~icons/solar/user-cross-rounded-line-duotone'

type Seller = {
  avatar_url: string | null | undefined
  created_at: string | null | undefined
  email: string | null | undefined
  id: number | null | undefined
  name: string | null | undefined
  phone: string | null | undefined
  raffle_id?: number | null | undefined
  thumb_hash: string | null | undefined
  total_tickets?: number | null | undefined
  updated_at: string | null | undefined
}

const props = withDefaults(
  defineProps<{
    sellers: Seller[]
    isLoading?: boolean
  }>(),
  {
    sellers: (): Seller[] => [],
    isLoading: false
  }
)

const isSticky = ref(false)
const search = ref('')

const sentinal = ref<HTMLElement | null>(null)

const sellersFiltered = computed(() => {
  return props.sellers.filter((s) => s.name!.toLowerCase().includes(search.value.toLowerCase()))
})

const avatarLetters = (name: string) => {
  // max 2 letters
  return name
    .split(' ')
    .map((n) => n.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase()
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
</script>

<template>
  <div class="flex flex-col w-full max-w-3xl">
    <div ref="sentinal" class="w-full h-0"></div>
    <div
      class="flex flex-row gap-4 transition-all duration-300 bg-background-elevated/90 backdrop-blur px-4 py-3 border rounded-lg rounded-b-none sticky top-16 z-10"
      :class="{
        '!bg-background/90 @3xl/main:!bg-background-elevated/90 rounded-none @3xl/main:rounded-b-lg border-t-0 border-x-0 @3xl/main:border-x -mx-4':
          isSticky
      }"
    >
      <div class="grow relative">
        <SolarMagniferOutline class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
        <Input
          type="text"
          v-model="search"
          autocomplete="off"
          placeholder="Search"
          class="w-full pl-11 pr-4 py-2 text-sm"
        />
      </div>
      <slot name="actionButton"> </slot>
    </div>
    <div class="flex-1 overflow-auto rounded-b-lg border border-t-0">
      <div class="divide-y">
        <div v-if="isLoading" class="px-4 py-4 flex flex-col justify-center items-center gap-2">
          <LoadingIndicator class="my-12" />
        </div>
        <div
          v-else-if="sellersFiltered.length === 0"
          class="px-4 py-4 flex flex-col justify-center items-center gap-2"
        >
          <SolarUserCrossRoundedLineDuotone class="w-16 h-16" />
          <slot name="emptyText">
            <p class="text-lg">No hay vendedores</p>
          </slot>
          <div class="w-full border-t flex flex-col items-center justify-center my-4"></div>
          <slot name="actionForEmpty"> </slot>
        </div>
        <div class="divide-y">
          <div
            v-for="seller in sellersFiltered"
            :key="seller.id!"
            class="px-4 py-3 flex items-center gap-4"
          >
            <Avatar class="w-10 h-10">
              <AvatarImage class="" :src="seller.avatar_url || ''" />
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
