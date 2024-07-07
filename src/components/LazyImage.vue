<script setup lang="ts">
import { computed, ref, type ImgHTMLAttributes } from 'vue'
import { useImage } from '@vueuse/core'
import { Skeleton } from './ui/skeleton'
import { base64ThumbHashToDataURL, binaryThumbHashToDataURL } from '@/lib/utils/thumbHash'
import SolarLinkBrokenLineDuotone from '~icons/solar/link-broken-line-duotone'
import { cn } from '@/lib/utils'

type Base64DataURL = `data:image/png;base64,${string}`

const props = defineProps<{
  src?: ImgHTMLAttributes['src'] | Promise<string>
  thumbHash?: Uint8Array | string | null | undefined
  thumbnail?: ImgHTMLAttributes['src']
  class?: ImgHTMLAttributes['class']
  style?: ImgHTMLAttributes['style']
  loading?: ImgHTMLAttributes['loading']
  alt?: ImgHTMLAttributes['alt']
  title?: ImgHTMLAttributes['title']
  crossorigin?: ImgHTMLAttributes['crossorigin']
  sizes?: ImgHTMLAttributes['sizes']
  srcset?: ImgHTMLAttributes['srcset']
}>()

const { isLoading, data, error } = (() => {
  const isLoading = ref<boolean>(false)
  const data = ref<ImgHTMLAttributes['src'] | Base64DataURL | null>(null)
  const error = ref<unknown | null | string>(null)

  // if props.src is ImgHTMLAttributes['src'] then use vueuse/core/useImage
  if (typeof props.src === 'string') {
    const { isLoading, error } = useImage({ src: props.src }, { delay: 1000 })
    return {
      isLoading,
      data,
      error
    }
  }

  if (props.src instanceof Promise) {
    isLoading.value = true
    props.src
      .then((src) => {
        data.value = src
        isLoading.value = false
      })
      .catch((err) => {
        error.value = err
        isLoading.value = false
      })
  }

  return {
    isLoading,
    data,
    error
  }
})()

// const { isLoading, error } = useImage({ src: props.src as string }, { delay: 1000 })

const thumbHashUrlData = computed(() => {
  if (props.thumbHash) {
    if (typeof props.thumbHash === 'string') {
      return base64ThumbHashToDataURL(props.thumbHash)
    }

    // if thumbHash is Uint8Array
    if (props.thumbHash instanceof Uint8Array) {
      return binaryThumbHashToDataURL(props.thumbHash as Uint8Array)
    }
  }

  return null
})

const srcValue = computed(() => {
  if (isLoading.value) {
    return '#'
  } else if (error.value) {
    return '#'
  } else {
    return data.value || (props.src as string)
  }
})
</script>

<template>
  <Transition name="fade" mode="out-in">
    <img
      v-if="isLoading && thumbHashUrlData"
      :class="props.class"
      :style="props.style"
      :src="thumbHashUrlData"
    />
    <Skeleton
      :class="cn('w-full h-full min-w-32 min-h-32 rounded-none', props.class)"
      :style="props.style"
      v-else-if="isLoading && !thumbHashUrlData"
    />
    <div class="w-full h-full" v-else-if="!isLoading && error">
      <SolarLinkBrokenLineDuotone class="w-12 h-12" />
    </div>
    <img
      v-else
      :src="srcValue"
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
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0.5;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
