<script setup lang="ts">
import type { ImgHTMLAttributes } from 'vue'
import { useImage } from '@vueuse/core'
import { Skeleton } from './ui/skeleton'

const props = defineProps<{
  src: ImgHTMLAttributes['src']
  thumbnail?: ImgHTMLAttributes['src']
  class?: ImgHTMLAttributes['class']
  style?: ImgHTMLAttributes['style']
  loading?: ImgHTMLAttributes['loading']
  alt?: ImgHTMLAttributes['alt']
  title?: ImgHTMLAttributes['title']
  crossorigin?: ImgHTMLAttributes['crossorigin']
  sizes?: ImgHTMLAttributes['sizes']
  srcset?: ImgHTMLAttributes['srcset']
  thumbhash?: ArrayLike<number> | undefined
}>()

const { isLoading, error } = useImage({ src: props.src as string }, { delay: 1000 })

// const getThumbhashData = () => {
//   if (props.thumbhash) {
//     return thumbHashToDataURL(props.thumbhash)
//   }
// }
</script>

<template>
  <Transition name="fade" mode="out-in">
    <Skeleton class="w-full h-full rounded-none" v-if="isLoading" />
    <div class="w-full h-full" v-else-if="error">
      <p class="">Error loading image</p>
    </div>
    <img
      v-else
      :src="props.src"
      :class="props.class"
      :style="props.style"
      :loading="props.loading"
      :alt="props.alt"
      :title="props.title"
      :crossorigin="props.crossorigin"
      :sizes="props.sizes"
      :srcset="props.srcset"
    />
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
