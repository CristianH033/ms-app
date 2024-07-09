<script setup lang="ts">
import LazyImg from '@/components/LazyImg.vue'
import { onMounted, ref, type ImgHTMLAttributes } from 'vue'
import { Button } from '@/components/ui/button'
import { randomDataSetValues } from '@/lib/utils/img.dataset'

const show = ref(false)
const ready = ref(false)

const images = ref<
  {
    src: string | ImgHTMLAttributes['src'] | Promise<string>
    thumbhash?: string
    width?: number
    height?: number
    ratio?: 'square' | 'landscape' | 'portrait'
  }[]
>([])

onMounted(async () => {
  images.value = randomDataSetValues()
  ready.value = true
})
</script>
<template>
  <div class="w-full flex flex-col items-center gap-4">
    <Button @click="show = !show">Show/hide</Button>
    <div
      class="w-full grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] auto-rows-[100px] grid-flow-dense gap-4"
      v-if="show"
    >
      <div
        v-for="(image, i) in images"
        :key="i"
        class="rounded-md border overflow-hidden"
        :class="{
          'col-span-3 row-span-2': image.ratio === 'landscape',
          'row-span-3 col-span-2': image.ratio === 'portrait',
          'row-span-3 col-span-3': image.ratio === 'square' && i % 3 === 0,
          'row-span-2 col-span-2': image.ratio === 'square' && i % 2 === 0,
          'row-span-1 col-span-1': image.ratio === 'square' && i % 1 === 0
        }"
      >
        <LazyImg :src="image.src" :thumbHash="image.thumbhash" class="w-full h-full object-cover" />
      </div>
    </div>
    <p>ready: {{ ready }}</p>
  </div>
</template>

<style scoped></style>
