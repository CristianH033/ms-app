<script setup lang="ts">
import { wait } from '@/lib/utils/promises'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { computed } from 'vue'
import { z } from 'zod'
import SolarDangerTriangleLineDuotone from '~icons/solar/danger-triangle-line-duotone'
import SolarTrashBinTrashLineDuotone from '~icons/solar/trash-bin-trash-line-duotone'
import SvgSpinnersDotRevolve from '~icons/svg-spinners/dot-revolve'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { eventBus } from '@/lib/event-bus'
import { deleteRaffleWithAssociatedData } from '@/lib/api/raffles'

const props = defineProps({
  raffle_id: {
    type: Number,
    required: true
  }
})

const open = defineModel<boolean>('open', { required: false, default: false })
const isSubmiting = defineModel<boolean>('isSubmiting', { required: false, default: false })

const emit = defineEmits(['success', 'cancel'])

const securityPhrase = 'borrar'

const formSchema = toTypedSchema(
  z.object({
    // must be string and must be exact value as securityPhrase
    security: z
      .string({ required_error: 'La frase de seguridad es requerida' })
      .refine((val) => val === securityPhrase, {
        message: 'La frase de seguridad no coincide'
      })
  })
)

const { handleSubmit, values } = useForm({
  validationSchema: formSchema
})

const onSubmit = handleSubmit(async (values) => {
  console.log('Form submitted!', values)
  isSubmiting.value = true
  await wait(1000)
  await deleteRaffleWithAssociatedData(props.raffle_id)
    .then((data) => {
      console.log(data)
      eventBus.emit('deleteRaffle')
      emit('success')
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      isSubmiting.value = false
    })
})

const securityPhraseCoincidence = computed(() => {
  return values.security === securityPhrase
})
</script>

<template>
  <AlertDialog :open="open" v-on:update:open="(value) => (open = value)">
    <AlertDialogContent
      @escape-key-down="(evt) => evt.preventDefault()"
      class="max-h-[calc(100dvh-1rem)] w-[calc(100vw-1rem)] max-w-xl rounded-lg transition-[opacity,_transform]"
    >
      <AlertDialogHeader>
        <AlertDialogTitle>
          <div class="flex flex-row items-center justify-start gap-6">
            <SolarDangerTriangleLineDuotone class="h-16 w-16 text-red-800" />
            <div class="flex flex-col gap-0 text-left">
              <p class="text-lg font-semibold">¿Seguro que deseas eliminar esta rifa?</p>
              <p class="text-red-800">Esta operación no se puede deshacer</p>
            </div>
          </div>
        </AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogDescription>
        <p>Esto eliminara la rifa de todos los vendedores, las boletas y los premios.</p>
        <form @submit="onSubmit" id="delete-raffle-form" class="mt-4 w-full">
          <FormField
            v-slot="{ componentField }"
            name="security"
            :validate-on-model-update="true"
            :validate-on-change="true"
            :validate-on-input="true"
            :validate-on-blur="false"
          >
            <FormItem>
              <FormLabel
                >Ingrese la palabra
                <span class="text-base font-extrabold text-foreground"
                  >"{{ securityPhrase }}"</span
                ></FormLabel
              >
              <FormControl>
                <Input
                  type="text"
                  placeholder=""
                  v-bind="componentField"
                  :disabled="isSubmiting"
                  required
                />
              </FormControl>
              <!-- <FormDescription> This is your public display name. </FormDescription> -->
              <div v-auto-animate>
                <FormMessage />
              </div>
            </FormItem>
          </FormField>
        </form>
      </AlertDialogDescription>
      <AlertDialogFooter>
        <AlertDialogCancel :disabled="isSubmiting">Cancelar</AlertDialogCancel>
        <!-- <AlertDialogAction as-child> -->
        <Button
          variant="destructive"
          :disabled="isSubmiting || !securityPhraseCoincidence"
          type="submit"
          form="delete-raffle-form"
          class="gap-3"
        >
          <SvgSpinnersDotRevolve v-if="isSubmiting" class="h-6 w-6" />
          <SolarTrashBinTrashLineDuotone v-else class="h-6 w-6" />
          <span>{{ isSubmiting ? 'Eliminando...' : 'Eliminar rifa' }}</span>
        </Button>
        <!-- </AlertDialogAction> -->
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
