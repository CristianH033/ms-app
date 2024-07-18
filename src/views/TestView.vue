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
  <div class="w-full flex flex-col items-center gap-4">
    <div
      class="w-full grid grid-cols-[repeat(auto-fit,minmax(60px,1fr))] auto-rows-[60px] grid-flow-dense gap-4"
    >
      <div
        v-for="(image, i) in images"
        :key="i"
        class="rounded-md border overflow-hidden"
        :class="{
          'col-span-3 row-span-2': image.ratio === 'landscape',
          'row-span-3 col-span-2': image.ratio === 'portrait',
          'row-span-3 col-span-3': image.ratio === 'square' && Math.random() > 0.5
        }"
      >
        <LazyImg
          :src="image.src"
          :thumbHash="image.thumbhash"
          :alt="image.ratio"
          class="w-full h-full object-contain"
        />
      </div>
    </div>
    <div class="w-full h-16 flex flex-col items-center justify-center" ref="loadMoreEl"></div>
  </div>
</template>

<style scoped></style>
