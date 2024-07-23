<script setup lang="ts">
import { Button } from './ui/button'
import SolarCupStarLineDuotone from '~icons/solar/cup-star-line-duotone'
import { Card, CardHeader, CardFooter, CardDescription, CardContent, CardTitle } from './ui/card'
import type { Tables } from '@/types/supabase.db'
import SolarPenNewSquareLineDuotone from '~icons/solar/pen-new-square-line-duotone'
import SolarUserSpeakLineDuotone from '~icons/solar/user-speak-line-duotone'
import SolarTicketLineDuotone from '~icons/solar/ticket-line-duotone'
import LazyImg from './LazyImg.vue'
import { getFileAsBase64 } from '@/lib/api/storage'

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
    <div class="h-60 w-full">
      <LazyImg
        class="h-full w-full object-cover"
        :src="getFileAsBase64(props.raffle.image_path!)"
        :thumbHash="props.raffle.thumb_hash"
      />
    </div>
    <CardHeader>
      <div class="flex w-full flex-row justify-between">
        <CardTitle> {{ props.raffle.name }} </CardTitle>
        <SolarCupStarLineDuotone class="h-6 w-6" />
      </div>
      <CardDescription>
        <span> Poner Fecha </span>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p>
        {{ props.raffle.description }}
      </p>
    </CardContent>
    <CardFooter
      class="flex-col items-stretch gap-x-2 gap-y-4 sm:flex-row sm:items-center sm:justify-stretch"
    >
      <Button variant="secondary" type="button" class="justify-start gap-2">
        <SolarPenNewSquareLineDuotone class="h-6 w-6" />
        <span> Editar </span>
      </Button>
      <div
        class="flex grow flex-col items-stretch gap-x-2 gap-y-4 sm:flex-row sm:items-center sm:justify-end"
      >
        <RouterLink
          :to="{ name: 'raffle-sellers', params: { id: props.raffle.id } }"
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
          :to="{ name: 'raffle', params: { id: props.raffle.id } }"
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
  </Card>
</template>

<style scoped></style>
