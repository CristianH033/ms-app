<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import type { Tables } from '@/types/supabase.db'
import { useForm } from 'vee-validate'
import { getAllSellers } from '@/lib/api/sellers'
import { assignSellerToRaffle } from '@/lib/api/raffles'
import MoneyInput from '../inputs/MoneyInput.vue'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import { Button } from '../ui/button'
import SolarAddCircleLineDuotone from '~icons/solar/add-circle-line-duotone'
import SvgSpinnersDotRevolve from '~icons/svg-spinners/dot-revolve'

const props = withDefaults(
  defineProps<{
    raffleId: number | undefined
  }>(),
  {
    raffleId: 1
  }
)

const emits = defineEmits<{
  (e: 'submit'): void
  (e: 'cancel'): void
  (e: 'success'): void
  (e: 'error'): void
}>()

// const formState = ref<'initial' | 'pending' | 'submitting' | 'success' | 'error'>('initial')
const isLoading = ref(false)
const sellers = ref<Tables<'sellers'>[]>([])
const disableForm = computed(() => isLoading.value)
const error = ref<string | null>(null)

const formSchema = toTypedSchema(
  z.object({
    seller_id: z.string({ required_error: 'El vendedor es requerido' }).refine(
      (id) => {
        return sellers.value?.some((seller) => seller.id.toString() === id)
      },
      { message: 'El vendedor no existe' }
    ),
    ticket_price: z
      .string({ required_error: 'El valor es requerido' })
      .transform((val) => parseFloat(val)) // Transforma el string a un número
      .refine((val) => !isNaN(val) && val >= 1, {
        message: 'El valor debe ser un número mayor o igual a 1'
      })
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
    isLoading.value = true
    error.value = null
    await assignSellerToRaffle(
      props.raffleId!,
      Number(values.seller_id),
      Number(values.ticket_price)
    )
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

const fetchSellers = async () => {
  isLoading.value = true
  getAllSellers()
    .then((data) => {
      sellers.value = data!
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      isLoading.value = false
    })
}

onMounted(async () => {
  await fetchSellers()
})
</script>

<template>
  <form @submit.prevent="submit">
    <fieldset :disabled="disableForm">
      <FormField v-slot="{ componentField }" name="seller_id">
        <FormItem>
          <FormLabel>Vendedor</FormLabel>

          <Select v-bind="componentField" required>
            <FormControl>
              <div class="flex flex-row gap-2">
                <SelectTrigger>
                  <SelectValue placeholder="Elige un vendedor" />
                </SelectTrigger>
                <RouterLink :to="{ name: 'sellers' }" v-slot="{ navigate }">
                  <Button variant="outline" type="button" @click="navigate">
                    <SolarAddCircleLineDuotone class="h-6 w-6" />
                  </Button>
                </RouterLink>
              </div>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Vendedores</SelectLabel>
                <div class="p-4" v-if="sellers.length === 0" value="">No hay vendedores</div>
                <SelectItem
                  v-for="seller in sellers"
                  :key="seller.id"
                  :value="seller.id.toString()"
                  class="capitalize"
                >
                  {{ seller.name }} - {{ seller.phone }}
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
      <FormField v-slot="{ value, handleChange }" name="ticket_price">
        <FormItem>
          <FormLabel>Establezca el valor del bono para el vendedor</FormLabel>
          <FormControl>
            <MoneyInput
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
        class="flex w-full flex-col-reverse items-center justify-end gap-2 space-y-0 py-2 md:flex-row"
      >
        <Button type="button" class="w-full gap-2" variant="outline" @click="cancel">
          <span>Cancelar</span>
        </Button>
        <Button type="submit" class="w-full gap-2">
          <div v-auto-animate>
            <SvgSpinnersDotRevolve v-if="isLoading" class="h-6 w-6" />
            <SolarAddCircleLineDuotone v-else class="h-6 w-6" />
          </div>
          <span>Asignar</span>
        </Button>
      </FormItem>
    </fieldset>
  </form>
</template>

<style scoped></style>
