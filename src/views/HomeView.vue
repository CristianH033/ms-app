<script setup lang="ts">
import RaffleDialog from '@/components/dialogs/RaffleDialog.vue'
import RafflesList from '@/components/RafflesList.vue'
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input/Input.vue'
import { getRafflesStatsWithPrizes, type RaffleStatsWithPrizes } from '@/lib/api/raffles'
import { useIntersectionObserver } from '@vueuse/core'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import SolarAddCircleLineDuotone from '~icons/solar/add-circle-line-duotone'
import SolarMagniferOutline from '~icons/solar/magnifer-outline'
import { eventBus } from '@/lib/event-bus'

const loading = ref(false)
const submiting = ref(false)
const search = ref('')
const raffles = ref<RaffleStatsWithPrizes[]>([])
const raffleDialogOpen = ref(false)

const isSticky = ref(false)

const sentinal = ref<HTMLDivElement | null>(null)

const rafflesFiltered = computed(() => {
  return raffles.value.filter((raffle) => {
    return raffle.raffle_name!.toLowerCase().includes(search.value.toLowerCase())
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

const openRaffleDialog = () => {
  raffleDialogOpen.value = true
}

const closeRaffleDialog = () => {
  raffleDialogOpen.value = false
}

const onSuccess = async () => {
  closeRaffleDialog()
  // reload raffles
  await fetchRaffles()
}

const onDelete = async () => {
  console.log('On delete, reload raffles')
  closeRaffleDialog()
  await fetchRaffles()
}

const fetchRaffles = async () => {
  loading.value = true
  await getRafflesStatsWithPrizes()
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

eventBus.on('createRaffle', onSuccess)
eventBus.on('updateRaffle', onSuccess)
eventBus.on('deleteRaffle', onDelete)

onMounted(async () => {
  await fetchRaffles()
})

onUnmounted(() => {
  eventBus.off('createRaffle', onSuccess)
  eventBus.off('updateRaffle', onSuccess)
  eventBus.off('deleteRaffle', onDelete)
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
        <Button class="gap-2" @click="openRaffleDialog">
          <SolarAddCircleLineDuotone class="h-5 w-5" />
          <span class="hidden md:inline">Nueva rifa</span>
        </Button>
      </div>

      <div class="flex w-full flex-col items-center gap-4">
        <RafflesList :raffles="rafflesFiltered" :loading="loading" />
      </div>
    </div>

    <div class="flex w-full flex-col items-center"></div>
    <RaffleDialog v-model:open="raffleDialogOpen" v-model:is-submiting="submiting" />
  </div>
</template>
