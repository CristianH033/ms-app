<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { DateFormatter, getLocalTimeZone, parseDate, today } from '@internationalized/date'
import { toDate } from 'radix-vue/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Input } from '../ui/input'
import { getAllLotteries } from '@/lib/api/lotteries'
import type { Tables } from '@/types/supabase.db'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import SvgSpinnersDotRevolve from '~icons/svg-spinners/dot-revolve'
import SolarAddCircleLineDuotone from '~icons/solar/add-circle-line-duotone'
import { watch } from 'vue'
import { createNewDraw } from '@/lib/api/draws'

const formState = ref<'idle' | 'pending' | 'success' | 'error'>('idle')

const lotteries = ref<Tables<'lotteries'>[]>([])

// const emit = defineEmits(['submit', 'success', 'error', 'cancel'])
const emit = defineEmits<{
  (e: 'submit'): void
  (e: 'success', draw_id: number): void
  (e: 'error', error: string): void
  (e: 'cancel'): void
}>()

const loading = computed(() => formState.value === 'pending')
const disableForm = computed(() => formState.value === 'pending' || loading.value)

const df = new DateFormatter('es-CO', {
  dateStyle: 'long'
})

const formSchema = toTypedSchema(
  z.object({
    lottery_id: z.string({ required_error: 'Lotería es requerida' }).refine(
      (id) => {
        return lotteries.value?.some((draw) => draw.id.toString() === id)
      },
      { message: 'El Sorteo no existe' }
    ),
    name: z.string().refine((v) => v, { message: 'La descripción es requerida' }),
    drawn_at: z.string().refine((v) => v, { message: 'La fecha es requerida' })
  })
)

const { handleSubmit, setFieldValue, values } = useForm({
  validationSchema: formSchema,
  initialValues: {}
})

const value = computed({
  get: () => (values.drawn_at ? parseDate(values.drawn_at) : undefined),
  set: (val) => val
})

const fetchLotteries = () => {
  getAllLotteries()
    .then((lotteriesData) => {
      lotteries.value = lotteriesData!
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {})
}

const submitDraw = handleSubmit((values) => {
  formState.value = 'pending'
  createNewDraw({ ...values, lottery_id: parseInt(values.lottery_id) })
    .then(async (data) => {
      formState.value = 'success'
      emit('success', data?.id!)
    })
    .catch(() => {
      formState.value = 'error'
    })
    .finally(() => {
      setTimeout(() => {
        formState.value = 'idle'
      }, 1000)
    })
})

const cancel = () => {
  emit('cancel')
}

watch(value, (val) => {
  if (val) {
    // if name is empty, set it
    if (!values.name || values.name.startsWith('Sorteo del ')) {
      setFieldValue('name', `Sorteo del ${df.format(toDate(val))}`)
    }
  }
})

onMounted(async () => {
  fetchLotteries()
})
</script>

<template>
  <form
    @submit.prevent="submitDraw"
    class="flex w-full flex-col gap-2 @container/form"
    :aria-disabled="disableForm"
  >
    <fieldset :disabled="disableForm">
      <FormField v-slot="{ componentField }" name="lottery_id">
        <FormItem>
          <FormLabel>Lotería</FormLabel>

          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Elige una loteria" />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Loterías</SelectLabel>
                <SelectItem
                  v-for="lottery in lotteries"
                  :key="lottery.id"
                  :value="lottery.id.toString()"
                >
                  {{ lottery.name }}
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
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Descripción del sorteo</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Descripción corta del sorteo"
              v-bind="componentField"
              required
            />
          </FormControl>
          <FormDescription>
            Descripción corta del sorteo, e.j. "Sorteo del 10 de Mayo de 2024".
          </FormDescription>
          <div v-auto-animate>
            <FormMessage />
          </div>
        </FormItem>
      </FormField>
      <FormField name="drawn_at">
        <FormItem class="flex flex-col">
          <FormLabel>Fecha del sorteo</FormLabel>
          <Popover>
            <PopoverTrigger as-child>
              <FormControl>
                <Button
                  variant="outline"
                  :class="
                    cn('w-full ps-3 text-start font-normal', !value && 'text-muted-foreground')
                  "
                >
                  <span>{{ value ? df.format(toDate(value)) : 'Seleccione una fecha' }}</span>
                  <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
                </Button>
                <input hidden />
              </FormControl>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0">
              <Calendar
                v-model="value"
                calendar-label="Date of birth"
                initial-focus
                :min-value="today(getLocalTimeZone())"
                @update:model-value="
                  (v) => {
                    if (v) {
                      setFieldValue('drawn_at', v.toString())
                    } else {
                      setFieldValue('drawn_at', undefined)
                    }
                  }
                "
              />
            </PopoverContent>
          </Popover>
          <FormDescription> Fecha del sorteo. </FormDescription>
          <div v-auto-animate>
            <FormMessage />
          </div>
        </FormItem>
      </FormField>
      <FormItem
        class="flex w-full flex-col-reverse items-center justify-end gap-2 space-y-0 py-2 md:flex-row"
      >
        <Button
          type="button"
          class="w-full gap-2 @xl/form:w-auto"
          variant="outline"
          @click="cancel"
        >
          <span>Cancelar</span>
        </Button>
        <Button v-auto-animate type="submit" class="w-full gap-2 @xl/form:w-auto">
          <SvgSpinnersDotRevolve v-if="loading" class="h-6 w-6" />
          <SolarAddCircleLineDuotone v-else class="h-6 w-6" />
          <span>Crear</span>
        </Button>
      </FormItem>
    </fieldset>
  </form>
</template>

<style scoped></style>
