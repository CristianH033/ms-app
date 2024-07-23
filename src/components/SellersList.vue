<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import { computed, ref } from 'vue'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import LoadingIndicator from '@/components/LoadingIndicator.vue'
import SolarMagniferOutline from '~icons/solar/magnifer-outline'
import SolarUserCrossRoundedLineDuotone from '~icons/solar/user-cross-rounded-line-duotone'
import { avatarLetters } from '@/lib/utils/strings'

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

type SellerFilterPredicate = (s: Seller) => boolean

type SellerSortPredicate = (a: Seller, b: Seller) => number

const props = withDefaults(
  defineProps<{
    sellers: Seller[]
    isLoading?: boolean
    sortBy?: SellerSortPredicate
    filterBy?: SellerFilterPredicate
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
  let filteredSearch = props.sellers.filter((s) =>
    s.name!.toLowerCase().includes(search.value.toLowerCase())
  )

  if (props.filterBy) {
    filteredSearch = filteredSearch.filter(props.filterBy)
  }

  if (props.sortBy) {
    filteredSearch.sort(props.sortBy)
  }

  return filteredSearch
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
</script>

<template>
  <div class="flex w-full max-w-3xl flex-col">
    <div ref="sentinal" class="h-0 w-full"></div>
    <div
      class="sticky top-16 z-10 flex flex-row gap-4 rounded-lg rounded-b-none border bg-background-elevated/90 px-4 py-3 backdrop-blur transition-all duration-300"
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
      <slot name="actionButton"> </slot>
    </div>
    <div class="flex-1 overflow-auto rounded-b-lg border border-t-0">
      <div class="">
        <div v-if="isLoading" class="flex flex-col items-center justify-center gap-2 px-4 py-4">
          <LoadingIndicator class="my-12" />
        </div>
        <div
          v-else-if="sellersFiltered.length === 0"
          class="flex flex-col items-center justify-center gap-2 px-4 py-4"
        >
          <SolarUserCrossRoundedLineDuotone class="h-16 w-16" />
          <slot name="emptyText">
            <p class="text-lg">No hay vendedores</p>
          </slot>
          <div class="my-4 flex w-full flex-col items-center justify-center border-t"></div>
          <slot name="actionForEmpty"> </slot>
        </div>
        <div class="divide-y">
          <div
            v-for="seller in sellersFiltered"
            :key="seller.id!"
            class="flex items-center gap-4 px-4 py-3"
          >
            <Avatar class="h-10 w-10">
              <AvatarImage class="" :src="seller.avatar_url || ''" />
              <AvatarFallback>{{ avatarLetters(seller.name!) }}</AvatarFallback>
            </Avatar>
            <div class="flex-1">
              <div class="font-medium capitalize">{{ seller.name }}</div>
              <div class="text-sm text-foreground/60">{{ seller.phone }}</div>
            </div>
            <Badge>{{ seller.total_tickets }}</Badge>
            <slot name="itemAction" :seller="seller"> </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
