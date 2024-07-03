<script setup lang="ts">
import { Button } from './ui/button'
import SolarCupStarLineDuotone from '~icons/solar/cup-star-line-duotone'
import { Card, CardHeader, CardFooter, CardDescription, CardContent, CardTitle } from './ui/card'
import type { Tables } from '@/types/supabase.db'
import SolarPenNewSquareLineDuotone from '~icons/solar/pen-new-square-line-duotone'
import SolarUserSpeakLineDuotone from '~icons/solar/user-speak-line-duotone'
import SolarTicketLineDuotone from '~icons/solar/ticket-line-duotone'
import { UseImage } from '@vueuse/components'
import { Skeleton } from './ui/skeleton'

const props = defineProps({
  raffle: {
    type: Object as () => Tables<'raffles'>,
    required: true,
    default: () => {}
  }
})
</script>

<template>
  <Card class="overflow-hidden">
    <div class="w-full h-60">
      <UseImage class="w-full h-full object-cover" :src="props.raffle.image_url || ''">
        <template #loading>
          <Skeleton class="w-full h-full rounded-none" />
        </template>
        <template #error>
          <div class="w-full h-full flex justify-center items-center">
            <SolarCupStarLineDuotone class="w-6 h-6" />
          </div>
        </template>
      </UseImage>
    </div>
    <CardHeader>
      <div class="w-full flex flex-row justify-between">
        <CardTitle> {{ props.raffle.name }} </CardTitle>
        <SolarCupStarLineDuotone class="w-6 h-6" />
      </div>
      <CardDescription>
        <span> Juega con el sorteo: xxx </span>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p>
        {{ props.raffle.description }}
      </p>
    </CardContent>
    <CardFooter
      class="flex-col items-stretch sm:items-center sm:justify-stretch sm:flex-row gap-y-4 gap-x-2"
    >
      <Button variant="secondary" type="button" class="gap-2 justify-start">
        <SolarPenNewSquareLineDuotone class="w-6 h-6" />
        <span> Editar </span>
      </Button>
      <div
        class="grow flex flex-col items-stretch sm:items-center sm:justify-end sm:flex-row gap-y-4 gap-x-2"
      >
        <RouterLink
          :to="{ name: 'raffle-sellers', params: { id: props.raffle.id } }"
          custom
          v-slot="{ navigate }"
        >
          <Button
            type="button"
            class="gap-2 justify-start"
            @click="navigate"
            @keypress.enter="navigate"
            role="link"
          >
            <SolarUserSpeakLineDuotone class="w-6 h-6" />
            <span> Vendedores </span>
          </Button>
        </RouterLink>
        <RouterLink
          :to="{ name: 'raffle', params: { id: props.raffle.id } }"
          custom
          v-slot="{ navigate }"
        >
          <Button
            type="button"
            class="gap-2 justify-start"
            @click="navigate"
            @keypress.enter="navigate"
            role="link"
          >
            <SolarTicketLineDuotone class="w-6 h-6" />
            <span> Numeros Disponibles </span>
          </Button>
        </RouterLink>
      </div>
    </CardFooter>
  </Card>
</template>

<style scoped></style>
