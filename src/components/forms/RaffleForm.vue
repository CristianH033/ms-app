<script setup lang="ts">
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { getAllDraws } from '@/lib/api/draws'
import {
  createNewRaffleWithPrizes,
  type NewPrize,
  type NewRaffle,
  type NewRaffleWithPrizes
} from '@/lib/api/raffles'
import { uploadFile } from '@/lib/api/storage'
import type { Tables } from '@/types/supabase.db'
import { toTypedSchema } from '@vee-validate/zod'
import { v4 as uuidv4 } from 'uuid'
import { useForm } from 'vee-validate'
import { computed, nextTick, onMounted, ref } from 'vue'
import { z } from 'zod'
import SolarAddCircleLineDuotone from '~icons/solar/add-circle-line-duotone'
import SolarCloseSquareLineDuotone from '~icons/solar/close-square-line-duotone'
import SolarCupStarLineDuotone from '~icons/solar/cup-star-line-duotone'
import SvgSpinnersDotRevolve from '~icons/svg-spinners/dot-revolve'
import ImageInput from '../inputs/ImageInput.vue'
import MoneyInput from '../inputs/MoneyInput.vue'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '../ui/alert-dialog'
import { Button } from '../ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import { Textarea } from '../ui/textarea'
import DrawForm from './DrawForm.vue'
import { eventBus } from '@/lib/event-bus'

const MIN_FILE_SIZE = 1
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
  draw_id: undefined as string | undefined,
  name: '' as string,
  description: '' as string,
  image_path: null as string | null,
  thumb_hash: null as string | null,
  number_of_tickets: 1000 as number,
  ticket_price: '' as string,
  prizes: [
    {
      key: uuidv4().slice(-10),
      name: '' as string,
      prize_value: '' as string,
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

const zodObject = z.object({
  draw_id: z.string({ required_error: 'Sorteo es requerido' }).refine(
    (id) => {
      return draws.value.some((draw) => draw.id.toString() === id)
    },
    { message: 'El Sorteo no existe' }
  ),
  name: z
    .string({ required_error: 'Nombre es requerido' })
    .min(3, { message: 'Nombre debe tener al menos 3 caracteres' }),
  description: z
    .string({ required_error: 'La descripción es requerida' })
    .min(3, { message: 'La descripción debe tener al menos 3 caracteres' })
    .optional(),
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
          .refine((file) => file.size >= MIN_FILE_SIZE, {
            message: 'El archivo está vacío'
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
    .refine((file) => file.size >= MIN_FILE_SIZE, {
      message: 'El archivo está vació'
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: 'El archivo es demasiado grande'
    })
})

type FormData = z.infer<typeof zodObject>

const formSchema = toTypedSchema(zodObject)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    number_of_tickets: formData.value.number_of_tickets
  }
})

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

const uploadAndReturnPath = async (file: File): Promise<string> => {
  const data = await uploadFile(file, file.name, 'covers')
  return data?.fullPath!
}

const buildNewRaffleDetails = (data: FormData): Promise<NewRaffle> => {
  return new Promise<NewRaffle>((resolve, reject) => {
    uploadAndReturnPath(data.image)
      .then((image_path) => {
        resolve({
          draw_id: parseInt(data.draw_id!),
          name: data.name,
          description: data.description,
          image_path: image_path,
          thumb_hash: formData.value.thumb_hash,
          number_of_tickets: data.number_of_tickets,
          ticket_price: data.ticket_price
        })
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const buildNewRafflePrizes = (data: FormData): Promise<NewPrize[]> => {
  return Promise.all(
    data.prizes.map((p, i) => {
      return new Promise<NewPrize>((resolve, reject) => {
        uploadAndReturnPath(p.image)
          .then((image_path) => {
            resolve({
              name: p.name,
              prize_value: p.prize_value,
              image_path: image_path,
              thumb_hash: formData.value.prizes[i].thumb_hash
            })
          })
          .catch((error) => {
            reject(error)
          })
      })
    })
  )
}

const buildNewRaffleData = async (data: FormData): Promise<NewRaffleWithPrizes> => {
  const newRaffle = await buildNewRaffleDetails(data)
  const newPrizes = await buildNewRafflePrizes(data)

  return {
    ...newRaffle,
    prizes: newPrizes
  }
}

const submitRaffle = form.handleSubmit(
  async (data: FormData) => {
    isSubmiting.value = true
    form.setErrors({})
    const newRaffle = await buildNewRaffleData(data)

    createNewRaffleWithPrizes(newRaffle)
      .then(() => {
        eventBus.emit('createRaffle')
      })
      .catch((error) => {
        console.error(error)
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

const closeDrawForm = () => {
  openDrawsFormModal.value = false
}

const onSuccess = async (id: number) => {
  closeDrawForm()
  // reload draws
  await fetchDraws()

  nextTick(() => {
    formData.value.draw_id = id.toString()
    form.setFieldValue('draw_id', id.toString())
    form.setFieldTouched('draw_id', true)
  })
}

const fetchDraws = async () => {
  isSubmiting.value = true
  await getAllDraws()
    .then((data) => (draws.value = data!))
    .finally(() => (isSubmiting.value = false))
}

onMounted(async () => {
  await fetchDraws()
})
</script>

<template>
  <form
    @submit.prevent="submitRaffle"
    class="flex w-full flex-col gap-2 @container/form"
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
                      <SolarAddCircleLineDuotone class="h-6 w-6" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Crear nuevo sorteo</AlertDialogTitle>
                      <DrawForm v-on:success="onSuccess" v-on:cancel="closeDrawForm" />
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
              @update:modelValue="
                (value) => {
                  handleChange(value, true)
                  formData.ticket_price = value.toString()
                }
              "
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
            <ImageInput v-bind="componentField" v-model:base64ThumbHash="formData.thumb_hash" />
          </FormControl>
          <!-- <FormDescription> This is your public display name. </FormDescription> -->
          <div v-auto-animate>
            <FormMessage />
          </div>
        </FormItem>
      </FormField>
      <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <fieldset v-auto-animate class="col-span-2 flex flex-col gap-4 rounded-md border p-4">
          <legend class="flex gap-2 text-lg font-medium">
            <SolarCupStarLineDuotone class="h-8 w-8" />
            <span>Premios</span>
          </legend>
          <div class="relative w-full" v-for="(prize, i) in formData.prizes" :key="prize.key">
            <button
              v-if="formData.prizes.length > 1"
              type="button"
              class="absolute right-0 top-0 rounded-xl bg-background"
              @click="removePrize(prize.key)"
            >
              <SolarCloseSquareLineDuotone class="h-8 w-8" />
            </button>
            <fieldset class="w-full rounded-md border p-4">
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
                      @update:modelValue="
                        (value) => {
                          handleChange(value, true)
                          prize.prize_value = value.toString()
                        }
                      "
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
          <div class="flex w-full flex-row items-center justify-end py-2">
            <Button
              variant="outline"
              type="button"
              class="w-full gap-2 @xl/form:w-auto"
              @click="addPrize"
            >
              <SolarAddCircleLineDuotone class="h-6 w-6" />
              <span>Agregar premio</span>
            </Button>
          </div>
        </fieldset>
      </div>
      <slot name="actions" v-if="!withoutShowingActions" v-bind="{ isSubmiting }">
        <FormItem class="flex w-full flex-row items-center justify-end py-2">
          <Button v-auto-animate type="submit" class="w-full gap-2 @xl/form:w-auto">
            <SvgSpinnersDotRevolve v-if="isSubmiting" class="h-6 w-6" />
            <SolarAddCircleLineDuotone v-else class="h-6 w-6" />
            <span>Crear</span>
          </Button>
        </FormItem>
      </slot>
    </fieldset>
  </form>
</template>

<style scoped></style>
