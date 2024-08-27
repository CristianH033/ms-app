<script setup lang="ts">
import { type RaffleWithPrizes } from '@/lib/api/raffles'
import { computed, onUnmounted, ref } from 'vue'
import SolarAddCircleLineDuotone from '~icons/solar/add-circle-line-duotone'
import SolarRefreshLineDuotone from '~icons/solar/refresh-line-duotone'
import SolarTicketLineDuotone from '~icons/solar/ticket-line-duotone'
import SolarTrashBinTrashLineDuotone from '~icons/solar/trash-bin-trash-line-duotone'
import SvgSpinnersDotRevolve from '~icons/svg-spinners/dot-revolve'
import RaffleForm from '../forms/RaffleForm.vue'
import RaffleUpdateForm from '../forms/RaffleUpdateForm.vue'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '../ui/alert-dialog'
import { Button } from '../ui/button'
import DeleteRaffleDialog from './DeleteRaffleDialog.vue'
import { eventBus } from '@/lib/event-bus'

const props = defineProps({
  raffle: {
    type: Object as () => Omit<RaffleWithPrizes, 'created_at' | 'updated_at'>,
    required: false
  }
})

const open = defineModel<boolean>('open', { default: false })
const isSubmiting = defineModel<boolean>('isSubmiting', { default: false })

const deleteDialogOpen = ref(false)

const mainButtonIcon = computed(() => {
  if (isSubmiting.value) {
    return SvgSpinnersDotRevolve
  } else {
    return props.raffle ? SolarRefreshLineDuotone : SolarAddCircleLineDuotone
  }
})

const openDeleteRaffleDialog = () => {
  deleteDialogOpen.value = true
}

const closeDeleteRaffleDialog = () => {
  deleteDialogOpen.value = false
}

eventBus.on('deleteRaffle', closeDeleteRaffleDialog)

onUnmounted(() => {
  eventBus.off('deleteRaffle', closeDeleteRaffleDialog)
})
</script>

<template>
  <AlertDialog :open="open" v-on:update:open="(value) => (open = value)">
    <AlertDialogContent
      @escape-key-down="(evt) => evt.preventDefault()"
      class="max-h-[calc(100dvh-1rem)] w-[calc(100vw-1rem)] max-w-2xl grid-rows-[auto_minmax(0,1fr)_auto] gap-0 rounded-lg p-0 transition-[opacity,_transform]"
    >
      <AlertDialogHeader class="border-b px-3 py-2 sm:p-6 sm:pb-4">
        <AlertDialogTitle>
          <div class="flex flex-row items-center justify-start gap-2">
            <SolarTicketLineDuotone class="h-8 w-8" />
            <span> {{ props.raffle ? `Editar rifa: ${props.raffle.name}` : 'Nueva rifa' }} </span>
          </div>
        </AlertDialogTitle>
        <!-- <AlertDialogDescription>
          {{ props.raffle ? `Editar rifa: ${props.raffle.name}` : 'Crea una nueva rifa' }}
        </AlertDialogDescription> -->
      </AlertDialogHeader>
      <div class="relative overflow-y-auto px-3 py-4 sm:px-6">
        <RaffleUpdateForm
          v-if="props.raffle"
          withoutActions
          id="raffle-form"
          :raffle="props.raffle"
          v-model:is-submiting="isSubmiting"
        />
        <RaffleForm v-else withoutActions id="raffle-form" v-model:isSubmiting="isSubmiting" />
      </div>
      <AlertDialogFooter class="gap-2 border-t p-2 sm:p-6">
        <AlertDialogCancel as-child>
          <Button class="m-0" variant="secondary" type="button" :disabled="isSubmiting"
            >Cancelar</Button
          >
        </AlertDialogCancel>
        <div class="flex w-full gap-2 sm:w-auto">
          <Button
            v-if="props.raffle"
            class="w-full"
            variant="destructive"
            type="button"
            :disabled="isSubmiting"
            @click="openDeleteRaffleDialog"
          >
            <SolarTrashBinTrashLineDuotone class="h-6 w-6" />
            <span>Eliminar rifa</span>
          </Button>
          <Button
            class="w-full gap-3"
            v-auto-animate
            form="raffle-form"
            type="submit"
            :disabled="isSubmiting"
          >
            <component :is="mainButtonIcon" class="h-6 w-6" />
            <span>{{ props.raffle ? 'Actualizar' : 'Crear' }}</span>
          </Button>
        </div>
      </AlertDialogFooter>
    </AlertDialogContent>
    <DeleteRaffleDialog
      v-if="props.raffle"
      :raffle_id="props.raffle.id!"
      v-model:open="deleteDialogOpen"
    />
  </AlertDialog>
</template>

<style lang="css" scoped></style>
