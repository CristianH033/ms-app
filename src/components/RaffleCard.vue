<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import type { RaffleStatsWithPrizes } from '@/lib/api/raffles'
import { getFileAsBase64 } from '@/lib/api/storage'
import { formatDate } from '@vueuse/core'
import { onUnmounted, ref } from 'vue'
import SolarCalendarMarkLineDuotone from '~icons/solar/calendar-mark-line-duotone'
import SolarCupStarLineDuotone from '~icons/solar/cup-star-line-duotone'
import SolarPenNewSquareLineDuotone from '~icons/solar/pen-new-square-line-duotone'
import SolarTicketLineDuotone from '~icons/solar/ticket-line-duotone'
import SolarUserSpeakLineDuotone from '~icons/solar/user-speak-line-duotone'
import RaffleDialog from './dialogs/RaffleDialog.vue'
import LazyImg from './LazyImg.vue'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { eventBus } from '@/lib/event-bus'

const props = defineProps({
  raffle: {
    type: Object as () => RaffleStatsWithPrizes,
    required: true,
    default: () => {}
  }
})

const raffleDialogOpen = ref(false)
const submiting = ref(false)

const openRaffleDialog = () => {
  raffleDialogOpen.value = true
}

const closeRaffleDialog = () => {
  raffleDialogOpen.value = false
}

const format = (date: string) => {
  return formatDate(new Date(date), 'dddd DD [de] MMMM [de] YYYY', {
    locales: 'es-CO'
  })
}

const formatCurrency = (value: number) => {
  const currency = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  })

  return currency.format(value)
}

const onDelete = () => {
  closeRaffleDialog()
}

eventBus.on('deleteRaffle', onDelete)

onUnmounted(() => {
  eventBus.off('deleteRaffle', onDelete)
})
</script>

<template>
  <Card class="overflow-hidden">
    <LazyImg
      class="aspect-[16/7] w-full object-cover"
      :src="getFileAsBase64(props.raffle.image_path!)"
      :thumbHash="props.raffle.thumb_hash"
    />
    <CardHeader>
      <div class="flex w-full flex-row justify-between">
        <CardTitle class="capitalize"> {{ props.raffle.raffle_name }} </CardTitle>
        <SolarCupStarLineDuotone class="h-6 w-6" />
      </div>
      <CardDescription>
        <div class="flex items-center gap-2">
          <SolarCalendarMarkLineDuotone class="inline-block h-4 w-4" />
          <p>
            <span>Juega el {{ format(props.raffle.draw_drawn_at!) }} </span>
          </p>
        </div>
        <div class="flex items-center gap-2">
          <SolarTicketLineDuotone class="inline-block h-4 w-4" />
          <p>
            <span>{{ props.raffle.total_tickets }} boletas</span>
          </p>
        </div>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p class="text-sm">
        {{ props.raffle.description }}
      </p>
      <Accordion class="mt-4 w-full rounded-xl border p-0" type="single" collapsible>
        <AccordionItem class="border-b px-0 py-0 last:border-none last:pb-0" value="prizes">
          <AccordionTrigger class="px-4 py-2">
            <div class="flex items-center gap-2">
              <SolarCupStarLineDuotone class="h-4 w-4" />
              <h2>Premios:</h2>
            </div>
          </AccordionTrigger>
          <AccordionContent class="pb-0">
            <div class="w-full">
              <Accordion type="single" collapsible>
                <AccordionItem
                  class="border-b px-4 py-0 last:border-none last:pb-0"
                  v-for="prize in raffle.prizes"
                  :key="prize.id"
                  :value="prize.id.toString()"
                >
                  <AccordionTrigger class="py-3">
                    <span class="text-sm">{{ prize.name }}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div
                      class="flex w-full flex-col justify-between gap-4 text-muted-foreground sm:flex-row"
                    >
                      <div class="w-full">
                        <p class="text-nowrap text-sm">
                          Valor del premio: {{ formatCurrency(prize.prize_value!) }}
                        </p>
                      </div>
                      <div class="w-full rounded-md border">
                        <LazyImg
                          class="aspect-video w-full object-contain"
                          :src="getFileAsBase64(prize.image_path!)"
                          :thumb-hash="prize.thumb_hash"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </CardContent>
    <CardFooter
      class="flex-col items-stretch gap-x-2 gap-y-4 sm:flex-row sm:items-center sm:justify-stretch"
    >
      <Button
        variant="secondary"
        type="button"
        class="justify-start gap-2"
        @click="openRaffleDialog"
      >
        <SolarPenNewSquareLineDuotone class="h-6 w-6" />
        <span> Editar </span>
      </Button>
      <div
        class="flex grow flex-col items-stretch gap-x-2 gap-y-4 sm:flex-row sm:items-center sm:justify-end"
      >
        <RouterLink
          :to="{ name: 'raffle-sellers', params: { id: props.raffle.raffle_id } }"
          custom
          v-slot="{ navigate }"
        >
          <Button
            type="button"
            class="justify-start gap-2"
            @click="navigate"
            @keypress.enter="navigate"
            role="link"
          >
            <SolarUserSpeakLineDuotone class="h-6 w-6" />
            <span> Vendedores </span>
          </Button>
        </RouterLink>
        <RouterLink
          :to="{ name: 'raffle', params: { id: props.raffle.raffle_id } }"
          custom
          v-slot="{ navigate }"
        >
          <Button
            type="button"
            class="justify-start gap-2"
            @click="navigate"
            @keypress.enter="navigate"
            role="link"
          >
            <SolarTicketLineDuotone class="h-6 w-6" />
            <span> Numeros Disponibles </span>
          </Button>
        </RouterLink>
      </div>
    </CardFooter>
    <RaffleDialog
      v-model:open="raffleDialogOpen"
      v-model:is-submiting="submiting"
      :raffle="{
        id: props.raffle.raffle_id!,
        name: props.raffle.raffle_name!,
        description: props.raffle.description || undefined,
        draw_id: props.raffle.draw_id!,
        image_path: props.raffle.image_path,
        thumb_hash: props.raffle.thumb_hash,
        prizes: props.raffle.prizes
      }"
    />
  </Card>
</template>

<style scoped></style>
