<script setup lang="ts">
import LazyImg from '@/components/LazyImg.vue'
import ImageApi from '@/lib/api/images'
import { onMounted, ref, type ImgHTMLAttributes } from 'vue'

const imageApi = new ImageApi()

const currentPage = ref(1)

const loadMoreEl = ref<HTMLDivElement | null>(null)

const images = ref<
  {
    src: string | ImgHTMLAttributes['src'] | Promise<string>
    thumbhash?: string
    width?: number
    height?: number
    ratio?: 'square' | 'landscape' | 'portrait'
  }[]
>([])

const loadNextItems = () => {
  currentPage.value++
  loadItems()
}

const loadItems = async () => {
  const data = await imageApi.index({ page: { number: currentPage.value, limit: 30 } }, 'high')

  images.value = [...images.value, ...data]
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        onViewport()
      }
    })
  },
  {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  }
)

const onViewport = () => {
  console.log('El elemento está en el viewport')
  loadNextItems()
}

onMounted(async () => {
  loadItems().then(() => observer.observe(loadMoreEl.value!))
})
</script>
<template>
  <div class="flex w-full flex-col items-center gap-4">
    <div
      class="grid w-full grid-flow-dense auto-rows-[60px] grid-cols-[repeat(auto-fit,minmax(60px,1fr))] gap-4"
    >
      <div
        v-for="(image, i) in images"
        :key="i"
        class="overflow-hidden rounded-md border"
        :class="{
          'col-span-3 row-span-2': image.ratio === 'landscape',
          'col-span-2 row-span-3': image.ratio === 'portrait',
          'col-span-3 row-span-3': image.ratio === 'square' && Math.random() > 0.5
        }"
      >
        <LazyImg
          :src="image.src"
          :thumbHash="image.thumbhash"
          :alt="image.ratio"
          class="h-full w-full object-contain"
        />
      </div>
    </div>
    <div class="flex h-16 w-full flex-col items-center justify-center" ref="loadMoreEl"></div>
  </div>
</template>

<style scoped></style>
