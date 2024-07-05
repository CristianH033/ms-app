<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useForm } from 'vee-validate'
import PhoneInput from '../inputs/PhoneInput.vue'
import { Button } from '../ui/button'
import SolarAddCircleLineDuotone from '~icons/solar/add-circle-line-duotone'
import SvgSpinnersDotRevolve from '~icons/svg-spinners/dot-revolve'
import { Input } from '../ui/input'
import ImageInput from '../inputs/ImageInput.vue'
import { createSeller } from '@/lib/api/sellers'
import { uploadFile } from '@/lib/api/storage'

const MIN_FILE_SIZE = 1
const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const emits = defineEmits<{
  (e: 'submit'): void
  (e: 'cancel'): void
  (e: 'success'): void
  (e: 'error'): void
}>()

// const formState = ref<'initial' | 'pending' | 'submitting' | 'success' | 'error'>('initial')
const isLoading = ref(false)
const disableForm = computed(() => isLoading.value)
const thumb_hash = ref<string | null>(null)
const error = ref<string | null>(null)

const formSchema = toTypedSchema(
  z.object({
    name: z
      .string({ required_error: 'El nombre es requerido' })
      .transform((s) => s.toLocaleLowerCase()),
    email: z.string().email({ message: 'Email invalido' }).optional().or(z.literal('')),
    phone: z.string({ required_error: 'El teléfono es requerido' }).refine(
      (val) => {
        return val.length === 10
      },
      { message: 'El teléfono debe tener 10 dígitos' }
    ),
    photo: z
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
      .optional()
  })
)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {}
})

const cancel = () => {
  emits('cancel')
}

const submit = handleSubmit(
  async (values) => {
    emits('submit')
    console.log(values)
    isLoading.value = true

    const sellerData = {
      name: values.name as string,
      email: values.email || (null as string | null),
      phone: values.phone as string,
      avatar_url: null as string | null,
      thumb_hash: null as string | null
    }

    if (values.photo) {
      await uploadFile(values.photo, values.photo.name)
        .then((data) => {
          console.log(data)
          sellerData.avatar_url = data?.fullPath!
          sellerData.thumb_hash = thumb_hash.value
        })
        .catch((err) => {
          console.error(err)
        })
    }

    createSeller(sellerData)
      .then((data) => {
        emits('success')
        console.log(data)
      })
      .catch((err) => {
        emits('error')
        console.error(err)
        error.value = err.message
      })
      .finally(() => {
        isLoading.value = false
      })
  },
  ({ errors }) => {
    console.log(errors)
  }
)

onMounted(async () => {})
</script>

<template>
  <form @submit.prevent="submit">
    <fieldset :disabled="disableForm">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Nombre</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Nombre del vendedor" v-bind="componentField" required />
          </FormControl>
          <!-- <FormDescription> This is your public display name. </FormDescription> -->
          <div v-auto-animate>
            <FormMessage />
          </div>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>E-mail</FormLabel>
          <FormControl>
            <Input type="email" placeholder="mail@example.com" v-bind="componentField" />
          </FormControl>
          <!-- <FormDescription> This is your public display name. </FormDescription> -->
          <div v-auto-animate>
            <FormMessage />
          </div>
        </FormItem>
      </FormField>
      <FormField v-slot="{ value, handleChange }" name="phone">
        <FormItem>
          <FormLabel>Numero de contacto</FormLabel>
          <FormControl>
            <PhoneInput
              :model-value="value"
              @update:modelValue="(value) => handleChange(value, true)"
              required
            />
          </FormControl>
          <!-- <FormDescription> This is your public display name. </FormDescription> -->
          <div v-auto-animate>
            <FormMessage />
          </div>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="photo">
        <FormItem>
          <FormLabel>Foto de perfil</FormLabel>
          <FormControl>
            <ImageInput v-bind="componentField" v-model:base64ThumbHash="thumb_hash"></ImageInput>
          </FormControl>
          <!-- <FormDescription> This is your public display name. </FormDescription> -->
          <div v-auto-animate>
            <FormMessage />
          </div>
        </FormItem>
      </FormField>

      <div v-auto-animate style="position: relative">
        <p
          v-if="error !== null"
          role="alert"
          id="radix-136-form-item-message"
          class="text-sm font-medium text-destructive"
          type="error"
        >
          {{ error }}
        </p>
      </div>

      <FormItem
        class="space-y-0 w-full py-2 flex flex-col-reverse md:flex-row items-center justify-end gap-2"
      >
        <Button type="button" class="w-full gap-2" variant="outline" @click="cancel">
          <span>Cancelar</span>
        </Button>
        <Button type="submit" class="w-full gap-2">
          <div v-auto-animate>
            <SvgSpinnersDotRevolve v-if="isLoading" class="h-6 w-6" />
            <SolarAddCircleLineDuotone v-else class="w-6 h-6" />
          </div>
          <span>Crear</span>
        </Button>
      </FormItem>
    </fieldset>
  </form>
</template>

<style scoped></style>
