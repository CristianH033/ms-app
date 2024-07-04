<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { computed, onMounted, ref } from 'vue'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { Tables } from '@/types/supabase.db'
import { getAllDraws } from '@/lib/api/draws'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemText,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import { Button } from '../ui/button'
import { useDebounceFn, useMemoize } from '@vueuse/core'
import ImageInput from '../inputs/ImageInput.vue'
import MoneyInput from '../inputs/MoneyInput.vue'
import SolarCloseSquareLineDuotone from '~icons/solar/close-square-line-duotone'
import SolarAddCircleLineDuotone from '~icons/solar/add-circle-line-duotone'
import SolarCupStarLineDuotone from '~icons/solar/cup-star-line-duotone'
import { Textarea } from '../ui/textarea'
import { createNewRaffleWithPrizes, type NewRaffleWithPrizes } from '@/lib/api/raffles'
import { wait } from '@/lib/utils/promises'
import { v4 as uuidv4 } from 'uuid'
import SvgSpinnersDotRevolve from '~icons/svg-spinners/dot-revolve'
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
} from '../ui/alert-dialog'
import DrawForm from './DrawForm.vue'

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

interface Props {
  withoutActions?: boolean | ('' | 'true' | 'false')
}

const props = withDefaults(defineProps<Props>(), {
  withoutActions: false
})

const isSubmiting = defineModel<boolean>('isSubmiting', { required: false, default: false })

const draws = ref<Tables<'draws'>[]>([])

const formData = ref({
  draw_id: '' as string | undefined,
  name: '' as string,
  description: '' as string,
  image_path: null as string | null,
  thumb_hash: null as string | null,
  number_of_tickets: 1000 as number,
  ticket_price: '0' as string,
  prizes: [
    {
      key: uuidv4().slice(-10),
      name: '' as string,
      prize_value: '0' as string,
      image: null as File | null,
      thumb_hash: null as string | null
    }
  ] as {
    key: string
    name: string
    prize_value: string
    image: File | null
    thumb_hash: string | null
  }[]
})

const formSchema = toTypedSchema(
  z.object({
    draw_id: z.string({ required_error: 'Sorteo es requerido' }).refine(
      async (id) => {
        clearCache()
        return await memoizedDraws().then((draws) =>
          draws?.some((draw) => draw.id.toString() === id)
        )
      },
      { message: 'El Sorteo no existe' }
    ),
    name: z
      .string({ required_error: 'Nombre es requerido' })
      .min(3, { message: 'Nombre debe tener al menos 3 caracteres' }),
    description: z
      .string({ required_error: 'La descripción es requerida' })
      .min(3, { message: 'La descripción debe tener al menos 3 caracteres' }),
    number_of_tickets: z.number({ required_error: 'El numero de tickets es requerido' }).min(100, {
      message: 'El numero de tickets debe ser mayor o igual a 100'
    }),
    ticket_price: z
      .string({ required_error: 'El valor es requerido' })
      .transform((val) => parseFloat(val)) // Transforma el string a un número
      .refine((val) => !isNaN(val) && val >= 1, {
        message: 'El valor debe ser un número mayor o igual a 1'
      }),
    prizes: z
      .array(
        z.object({
          name: z
            .string({ required_error: 'Nombre es requerido' })
            .min(3, { message: 'Nombre debe tener al menos 3 caracteres' }),
          prize_value: z
            .string({ required_error: 'El valor es requerido' })
            .transform((val) => parseFloat(val)) // Transforma el string a un número
            .refine((val) => !isNaN(val) && val >= 1, {
              message: 'El valor debe ser un número mayor o igual a 1'
            }),
          image: z
            .instanceof(File)
            .refine((file) => file instanceof File, {
              message: 'Debe seleccionar una imagen'
            })
            .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
              message: 'Tipo de archivo no aceptado'
            })
            .refine((file) => file.size <= MAX_FILE_SIZE, {
              message: 'El archivo es demasiado grande'
            })
        })
      )
      .min(1),
    image: z
      .instanceof(File)
      .refine((file) => file instanceof File, {
        message: 'Debe seleccionar una imagen'
      })
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: 'Tipo de archivo no aceptado'
      })
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: 'El archivo es demasiado grande'
      })
  })
)

const form = useForm({
  validationSchema: formSchema
})

const emit = defineEmits(['success'])

const memoizedDraws = useMemoize(async () => await getAllDraws())

const clearCache = useDebounceFn(() => {
  console.log('Clearing cache')
  memoizedDraws.clear()
}, 30000)

const addPrize = () => {
  formData.value.prizes.push({
    key: uuidv4().slice(-10),
    name: '',
    prize_value: '',
    image: null,
    thumb_hash: null
  })
}

const removePrize = (key: string) => {
  if (formData.value.prizes.length > 1) {
    const prize = formData.value.prizes.find((p) => p.key === key)

    if (prize) {
      formData.value.prizes = formData.value.prizes.filter((p) => p.key !== key)
    }
  }
}

const submitRaffle = form.handleSubmit(
  async (data) => {
    isSubmiting.value = true
    form.setErrors({})
    await wait(10000)

    isSubmiting.value = false

    const newRaffle: NewRaffleWithPrizes = {
      ...{
        ...data,
        draw_id: parseInt(data.draw_id),
        prizes: data.prizes.map((p, indexp) => ({
          ...p,
          thumb_hash: formData.value.prizes[indexp].thumb_hash,
          image_path: ''
        })),
        image_path: formData.value.image_path
      },
      thumb_hash: formData.value.thumb_hash
    }

    // console.log(newRaffle)

    createNewRaffleWithPrizes(newRaffle)
      .then((data) => {
        console.log(data)
        emit('success')
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        isSubmiting.value = false
      })
  },
  ({ errors }) => {
    const firstErrorFieldName = Object.keys(errors)[0].replace('[', '.').replace(']', '')
    const el = document.querySelector(`[name="${firstErrorFieldName}"]`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }
)

const withoutShowingActions = computed(() => {
  return props.withoutActions === '' || props.withoutActions === true
})

const openDrawsFormModal = ref(false)

const closeRaffleForm = () => {
  openDrawsFormModal.value = false
}

const onSucess = async () => {
  closeRaffleForm()
  // reload raffles
  await fetchDraws()
}

const fetchDraws = async () => {
  isSubmiting.value = true
  await getAllDraws()
    .then((data) => (draws.value = data!))
    .finally(() => (isSubmiting.value = false))

  console.log(draws.value)
}

onMounted(async () => {
  await fetchDraws()
})
</script>

<template>
  <form
    @submit.prevent="submitRaffle"
    class="@container/form w-full flex flex-col gap-2"
    :aria-disabled="isSubmiting"
  >
    <fieldset :disabled="isSubmiting">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Nombre</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Nombre de la Rifa"
              v-bind="componentField"
              v-model:model-value="formData.name"
              required
            />
          </FormControl>
          <!-- <FormDescription> This is your public display name. </FormDescription> -->
          <div v-auto-animate>
            <FormMessage />
          </div>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="draw_id">
        <FormItem>
          <FormLabel>Sorteo</FormLabel>

          <Select v-bind="componentField" v-model:model-value="formData.draw_id">
            <FormControl>
              <div class="flex flex-row gap-2">
                <SelectTrigger>
                  <SelectValue placeholder="Elige un sorteo" />
                </SelectTrigger>
                <AlertDialog
                  :open="openDrawsFormModal"
                  v-on:update:open="(value) => (openDrawsFormModal = value)"
                >
                  <AlertDialogTrigger as-child>
                    <Button variant="outline" type="button">
                      <SolarAddCircleLineDuotone class="w-6 h-6" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Crear nuevo sorteo</AlertDialogTitle>
                      <DrawForm v-on:success="onSucess" v-on:cancel="closeRaffleForm" />
                    </AlertDialogHeader>
                    <!-- <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter> -->
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sorteos</SelectLabel>
                <div class="p-4" v-if="draws.length === 0" value="">No hay sorteos</div>
                <SelectItem v-for="draw in draws" :key="draw.id" :value="draw.id.toString()">
                  {{ draw.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <!-- <FormDescription> Elige un sorteo para la rifa </FormDescription> -->
          <div v-auto-animate>
            <FormMessage />
          </div>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="description">
        <FormItem>
          <FormLabel>Descripción</FormLabel>
          <FormControl>
            <Textarea
              type="text"
              placeholder="Descripción de la Rifa"
              v-bind="componentField"
              v-model:model-value="formData.description"
              required
            />
          </FormControl>
          <!-- <FormDescription> This is your public display name. </FormDescription> -->
          <div v-auto-animate>
            <FormMessage />
          </div>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="number_of_tickets">
        <FormItem>
          <FormLabel>Número de Bonos:</FormLabel>
          <FormControl>
            <Input
              type="number"
              inputmode="numeric"
              placeholder="Nombre de la Rifa"
              v-bind="componentField"
              v-model:model-value="formData.number_of_tickets"
              required
            />
          </FormControl>
          <!-- <FormDescription> This is your public display name. </FormDescription> -->
          <div v-auto-animate>
            <FormMessage />
          </div>
        </FormItem>
      </FormField>
      <FormField v-slot="{ value, handleChange }" name="ticket_price">
        <FormItem>
          <FormLabel>Costo del Bono</FormLabel>
          <FormControl>
            <MoneyInput
              :model-value="value"
              @update:modelValue="(value) => handleChange(value, true)"
              v-model="formData.ticket_price"
              required
            />
          </FormControl>
          <!-- <FormDescription> This is your public display name. </FormDescription> -->
          <div v-auto-animate>
            <FormMessage />
          </div>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="image">
        <FormItem>
          <FormLabel>Portada de la rifa</FormLabel>
          <FormControl>
            <ImageInput
              v-bind="componentField"
              v-model:base64ThumbHash="formData.thumb_hash"
            ></ImageInput>
          </FormControl>
          <!-- <FormDescription> This is your public display name. </FormDescription> -->
          <div v-auto-animate>
            <FormMessage />
          </div>
        </FormItem>
      </FormField>
      <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <fieldset v-auto-animate class="border col-span-2 rounded-md p-4 flex flex-col gap-4">
          <legend class="text-lg font-medium flex gap-2">
            <SolarCupStarLineDuotone class="w-8 h-8" />
            <span>Premios</span>
          </legend>
          <div class="w-full relative" v-for="(prize, i) in formData.prizes" :key="prize.key">
            <button
              v-if="formData.prizes.length > 1"
              type="button"
              class="bg-background rounded-xl absolute right-0 top-0"
              @click="removePrize(prize.key)"
            >
              <SolarCloseSquareLineDuotone class="w-8 h-8" />
            </button>
            <fieldset class="w-full border p-4 rounded-md">
              <legend class="text-lg font-medium">Premio {{ i + 1 }}</legend>
              <FormField v-slot="{ componentField }" :name="'prizes.' + i + '.name'">
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Nombre del premio"
                      v-bind="componentField"
                      v-model:model-value="prize.name"
                      required
                    />
                  </FormControl>
                  <!-- <FormDescription> This is your public display name. </FormDescription> -->
                  <div v-auto-animate>
                    <FormMessage />
                  </div>
                </FormItem>
              </FormField>
              <FormField v-slot="{ value, handleChange }" :name="'prizes.' + i + '.prize_value'">
                <FormItem>
                  <FormLabel>Valor del premio</FormLabel>
                  <FormControl>
                    <MoneyInput
                      :model-value="value"
                      @update:modelValue="(value) => handleChange(value, true)"
                      v-model="prize.prize_value"
                      required
                    />
                  </FormControl>
                  <!-- <FormDescription> This is your public display name. </FormDescription> -->
                  <div v-auto-animate>
                    <FormMessage />
                  </div>
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" :name="'prizes.' + i + '.image'">
                <FormItem>
                  <FormLabel>Imagen</FormLabel>
                  <FormControl>
                    <ImageInput
                      v-bind="componentField"
                      v-model:base64ThumbHash="prize.thumb_hash"
                    />
                  </FormControl>
                  <!-- <FormDescription> This is your public display name. </FormDescription> -->
                  <div v-auto-animate>
                    <FormMessage />
                  </div>
                </FormItem>
              </FormField>
            </fieldset>
          </div>
          <div class="w-full py-2 flex flex-row items-center justify-end">
            <Button
              variant="outline"
              type="button"
              class="w-full gap-2 @xl/form:w-auto"
              @click="addPrize"
            >
              <SolarAddCircleLineDuotone class="w-6 h-6" />
              <span>Agregar premio</span>
            </Button>
          </div>
        </fieldset>
      </div>
      <slot name="actions" v-if="!withoutShowingActions" v-bind="{ isSubmiting }">
        <FormItem class="w-full py-2 flex flex-row items-center justify-end">
          <Button v-auto-animate type="submit" class="w-full gap-2 @xl/form:w-auto">
            <SvgSpinnersDotRevolve v-if="isSubmiting" class="h-6 w-6" />
            <SolarAddCircleLineDuotone v-else class="w-6 h-6" />
            <span>Crear</span>
          </Button>
        </FormItem>
      </slot>
    </fieldset>
  </form>
</template>

<style scoped></style>
