<script setup lang="ts">
import { ref, type HTMLAttributes } from 'vue'
import SolarCloseCircleLineDuotone from '~icons/solar/close-circle-line-duotone'
import { cn } from '@/lib/utils'
import { useVModel } from '@vueuse/core'
import { fileToBase64ThumbHash } from '@/lib/utils/thumbHash'

const imgPreview = ref<string | null>(null)
const input = ref<HTMLInputElement | null>(null)

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number | File
  class?: HTMLAttributes['class']
  name?: HTMLInputElement['name']
  accept?: HTMLInputElement['accept']
}>()

const base64ThumbHash = defineModel<string | null>('base64ThumbHash', { required: false })

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue
})

const onFileChange = async (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    imgPreview.value = URL.createObjectURL(file)
    base64ThumbHash.value = await fileToBase64ThumbHash(file)
  } else {
    base64ThumbHash.value = null
  }
}

const clearInput = () => {
  imgPreview.value = null
  modelValue.value = ''
  base64ThumbHash.value = null
  if (input.value) {
    input.value.files = null
    input.value.value = ''
  }
}
</script>

<template>
  <div>
    <slot name="preview">
      <div v-auto-animate>
        <div
          class="relative h-full w-full overflow-hidden rounded-md rounded-b-none border border-b-0 p-3"
          v-if="imgPreview"
        >
          <button
            type="button"
            @click="clearInput"
            class="absolute right-1 top-1 rounded-full border bg-background-elevated/50 p-1 backdrop-blur"
          >
            <SolarCloseCircleLineDuotone class="h-5 w-5" />
          </button>
          <img :src="imgPreview" class="max-h-32 min-h-32 rounded-3xs border object-cover" />
        </div>
      </div>
    </slot>
    <input
      :class="
        cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          imgPreview ? 'rounded-t-none' : 'rounded-md',
          props.class
        )
      "
      :name="props.name"
      type="file"
      accept="image/*"
      @change="onFileChange"
      ref="input"
    />
  </div>
</template>
