<script setup lang="ts">
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { getAllDraws } from '@/lib/api/draws'
import { type RaffleWithPrizes } from '@/lib/api/raffles'
import { getFileAsBase64, uploadFile } from '@/lib/api/storage'
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

const MIN_FILE_SIZE = 1
const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

interface FormUpdateRaffleWithPrizes
  extends Omit<RaffleWithPrizes, 'prizes' | 'created_at' | 'updated_at'> {
  prizes: Omit<RaffleWithPrizes['prizes'], 'created_at' | 'updated_at'>
}

interface Props {
  withoutActions?: boolean | ('' | 'true' | 'false')
  raffle: FormUpdateRaffleWithPrizes
}

const props = withDefaults(defineProps<Props>(), {
  withoutActions: false
})

const isSubmiting = defineModel<boolean>('isSubmiting', { required: false, default: false })

const draws = ref<Tables<'draws'>[]>([])

const formData = ref({
  ...props.raffle,
  draw_id: props.raffle.draw_id.toString(),
  // image_touched: false,
  prizes: props.raffle.prizes.map((p) => ({
    id: p.id as number | undefined,
    raffle_id: p.raffle_id,
    name: p.name,
    image: null as File | null,
    // image_touched: false,
    image_path: p.image_path,
    thumb_hash: p.thumb_hash,
    prize_value: p.prize_value,
    key: uuidv4().slice(-10).toString()
  }))
})

const zodObject = z
  .object({
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
    // ticket_price: z
    //   .string({ required_error: 'El valor es requerido' })
    //   .transform((val) => parseFloat(val)) // Transforma el string a un número
    //   .refine((val) => !isNaN(val) && val >= 1, {
    //     message: 'El valor debe ser un número mayor o igual a 1'
    //   }),
    prizes: z
      .array(
        z
          .object({
            raffle_id: z.string({ required_error: 'El sorteo es requerido' }),
            name: z
              .string({ required_error: 'Nombre es requerido' })
              .min(3, { message: 'Nombre debe tener al menos 3 caracteres' }),
            prize_value: z
              .string({ required_error: 'El valor es requerido' })
              .transform((val) => parseFloat(val)) // Transforma el string a un número
              .refine((val) => !isNaN(val) && val >= 1, {
                message: 'El valor debe ser un número mayor o igual a 1'
              }),
            image_touched: z.boolean().default(true),
            image: z.union([
              z
                .instanceof(File, { message: 'Debe seleccionar una imagen' })
                .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
                  message: 'Tipo de archivo no aceptado'
                })
                .refine((file) => file.size >= MIN_FILE_SIZE, {
                  message: 'El archivo está vacío'
                })
                .refine((file) => file.size <= MAX_FILE_SIZE, {
                  message: 'La imagen es demasiado grande'
                }),
              z.undefined()
            ])
          })
          .refine(
            (data) => {
              if (data.image_touched) {
                return data.image instanceof File
              }
              return true
            },
            {
              message: 'La imagen es requerida cuando se ha tocado el campo',
              path: ['image']
            }
          )
      )
      .min(1),
    image_touched: z.boolean().default(true),
    image: z.union([
      z
        .instanceof(File, { message: 'Debe seleccionar una imagen' })
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
          message: 'Tipo de archivo no aceptado'
        })
        .refine((file) => file.size >= MIN_FILE_SIZE, {
          message: 'El archivo está vacío'
        })
        .refine((file) => file.size <= MAX_FILE_SIZE, {
          message: 'El archivo es demasiado grande'
        }),
      z.undefined()
    ])
  })
  .refine(
    (data) => {
      if (data.image_touched) {
        return data.image instanceof File
      }
      return true
    },
    {
      message: 'La imagen es requerida cuando se ha tocado el campo',
      path: ['image']
    }
  )

type FormData = z.infer<typeof zodObject>

const formSchema = toTypedSchema(zodObject)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    draw_id: formData.value.draw_id.toString(),
    name: formData.value.name,
    description: formData.value.description,
    // ticket_price: undefined,
    prizes: formData.value.prizes.map((p) => ({
      raffle_id: p.raffle_id.toString(),
      name: p.name,
      prize_value: p.prize_value!.toString(),
      // image_touched: p.image_touched,
      image_touched: p.image_path ? false : true,
      image: undefined
    })),
    // image_touched: formData.value.image_touched,
    image_touched: formData.value.image_path ? false : true,
    image: undefined
  }
})

const emit = defineEmits(['success'])

const addPrize = () => {
  formData.value.prizes.push({
    id: undefined,
    raffle_id: formData.value.id,
    name: '',
    prize_value: null,
    image: null,
    // image_touched: true,
    image_path: null,
    thumb_hash: null,
    key: uuidv4().slice(-10).toString()
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

const processPrizesFiles = async (data: FormData) => {
  const promises = data.prizes
    .filter((p) => p.image instanceof File)
    .map((p) => uploadAndReturnPath(p.image as File))

  return Promise.all(promises)
}

const buildNewRaffleData = async (data: FormData): Promise<FormUpdateRaffleWithPrizes> => {
  // const newRaffle = await buildNewRaffleDetails(data)
  // const newPrizes = await buildNewRafflePrizes(data)

  return props.raffle
}

const updateRaffle = form.handleSubmit(
  async (data: FormData) => {
    isSubmiting.value = true

    console.log(data)

    form.setErrors({})

    // const raffle = await buildNewRaffleData(data)

    // await updateRaffleWithPrizes(raffle)
    //   .then(() => {
    //     emit('success')
    //   })
    //   .catch((error) => {
    //     console.error(error)
    //   })
    //   .finally(() => {
    //     isSubmiting.value = false
    //   })

    isSubmiting.value = false
  },
  ({ errors }) => {
    console.log(errors)
    console.log(form)
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
    @submit.prevent="updateRaffle"
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
              :label="formData.image_path || undefined"
              :initialImage="getFileAsBase64(formData.image_path!)"
              @touched="
                () => {
                  console.log('ImageInput touched')
                  form.setFieldValue('image_touched', true)
                  // form.setFieldTouched('image_touched', true)
                }
              "
            ></ImageInput>
          </FormControl>
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
              <FormField v-slot="{ componentField }" :name="`prizes.${i}.raffle_id`">
                <FormItem>
                  <FormControl>
                    <Input
                      type="hidden"
                      v-bind="componentField"
                      v-model:model-value="prize.raffle_id"
                      touched
                      required
                    />
                  </FormControl>
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" :name="`prizes.${i}.name`">
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
                  <div v-auto-animate>
                    <FormMessage />
                  </div>
                </FormItem>
              </FormField>
              <FormField v-slot="{ value, handleChange }" :name="`prizes.${i}.prize_value`">
                <FormItem>
                  <FormLabel>Valor del premio</FormLabel>
                  <FormControl>
                    <MoneyInput
                      :model-value="value"
                      @update:modelValue="
                        (value) => {
                          handleChange(value, true)
                          prize.prize_value = Number(value)
                        }
                      "
                      required
                    />
                  </FormControl>
                  <div v-auto-animate>
                    <FormMessage />
                  </div>
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" :name="`prizes.${i}.image`">
                <FormItem>
                  <FormLabel>Imagen</FormLabel>
                  <FormControl>
                    <ImageInput
                      v-bind="componentField"
                      v-model:base64ThumbHash="prize.thumb_hash"
                      :label="prize.image_path || undefined"
                      :initialImage="
                        prize.image_path ? getFileAsBase64(prize.image_path) : undefined
                      "
                      @touched="
                        () => {
                          console.log('ImageInput touched')
                          form.setFieldValue(`prizes.${i}.image_touched`, true)
                          // form.setFieldTouched(`prizes.${i}.image_touched`, true)
                        }
                      "
                    />
                  </FormControl>
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
