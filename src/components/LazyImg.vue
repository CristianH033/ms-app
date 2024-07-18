<script lang="ts">
const skeletonClass = 'flex flex-col justify-center items-center rounded-md p-4'
const errorPlaceholderClass =
  'flex flex-col justify-center items-center border border-dashed border-destructive rounded-md p-4 text-center text-destructive'
const imgPlaceholderClass = 'animate-brightness'

export const defaultPlaceholderComponent = defineComponent({
  props: { class: { type: String, default: '' } },
  setup(props) {
    return () => h(Skeleton, { class: cn(skeletonClass, props.class) })
  }
})

export const imgPlaceholderComponent = defineComponent({
  props: {
    src: { type: String, default: '' },
    class: { type: String, default: '' },
    style: { type: String, default: '' },
    alt: { type: String, default: '' },
    title: { type: String, default: '' },
    crossorigin: { type: String, default: '' },
    sizes: { type: String, default: '' },
    srcset: { type: String, default: '' }
  },
  setup(props) {
    return () =>
      h('img', {
        src: props.src,
        class: cn(imgPlaceholderClass, props.class),
        style: props.style,
        alt: props.alt,
        title: props.title,
        crossorigin: props.crossorigin,
        sizes: props.sizes,
        srcset: props.srcset
      })
  }
})

export const defaultErrorPlaceholderComponent = defineComponent({
  props: { class: { type: String, default: '' } },
  setup(props) {
    return () =>
      h('div', { class: cn(errorPlaceholderClass, props.class) }, [
        h(SolarLinkBrokenLineDuotone, { class: 'w-3/5 min-w-[3rem] max-w-[5rem] h-auto' })
      ])
  }
})

export const imgErrorPlaceholderComponent = defineComponent({
  props: {
    src: { type: String, default: '' },
    class: { type: String, default: '' },
    style: { type: String, default: '' },
    alt: { type: String, default: '' },
    title: { type: String, default: '' }
  },
  setup(props) {
    return () =>
      h('img', {
        src: props.src,
        class: props.class,
        style: props.style,
        alt: props.alt,
        title: props.title
      })
  }
})
</script>

<script setup lang="ts">
import { cn } from '@/lib/utils'
import { base64ThumbHashToDataURL, binaryThumbHashToDataURL } from '@/lib/utils/thumbHash'
import {
  computed,
  defineComponent,
  h,
  onMounted,
  ref,
  type Component,
  type ComponentPublicInstance,
  type ImgHTMLAttributes,
  type Ref
} from 'vue'
import SolarLinkBrokenLineDuotone from '~icons/solar/link-broken-line-duotone'
import { Skeleton } from './ui/skeleton'

type Base64DataURL = `data:image/png;base64,${string}`

interface LoaderState {
  data: Ref<string | null>
  error: Ref<unknown | null | string>
  isLoading: Ref<boolean>
  isReady: Ref<boolean>
}

interface ImageOptions {
  src: string
  srcset?: string
  sizes?: string
  alt?: string
  class?: string
  loading?: HTMLImageElement['loading']
  crossorigin?: string
  referrerPolicy?: HTMLImageElement['referrerPolicy']
}

interface LoaderOptions extends Omit<ImageOptions, 'src'>, LoaderState {
  src: ImgHTMLAttributes['src'] | Promise<string>
}

const props = withDefaults(
  defineProps<{
    src: ImgHTMLAttributes['src'] | Promise<string>
    thumbHash?: Uint8Array | string | null | undefined
    placeholder?: ImgHTMLAttributes['src'] | Base64DataURL | Component
    errorPlaceholder?: ImgHTMLAttributes['src'] | Base64DataURL | Component
    class?: ImgHTMLAttributes['class']
    style?: ImgHTMLAttributes['style']
    loading?: ImgHTMLAttributes['loading']
    alt?: ImgHTMLAttributes['alt']
    title?: ImgHTMLAttributes['title']
    crossorigin?: ImgHTMLAttributes['crossorigin']
    sizes?: ImgHTMLAttributes['sizes']
    srcset?: ImgHTMLAttributes['srcset']
    referrerPolicy?: HTMLImageElement['referrerPolicy']
    delay?: number
  }>(),
  {
    placeholder: defaultPlaceholderComponent,
    errorPlaceholder: defaultErrorPlaceholderComponent
  }
)

const placeHolderElement = ref<ComponentPublicInstance | null>(null)

const data = ref<string | null>(null)
const error = ref<unknown | null | string>(null)
const isLoading = ref<boolean>(true)
const isReady = ref<boolean>(false)

const thumbHashDataURL = computed(() => {
  if (props.thumbHash) {
    if (typeof props.thumbHash === 'string') {
      return base64ThumbHashToDataURL(props.thumbHash)
    }

    // if thumbHash is Uint8Array
    if (props.thumbHash instanceof Uint8Array) {
      return binaryThumbHashToDataURL(props.thumbHash as Uint8Array)
    }
  }

  return undefined
})

const placeHolderComponent = computed(() => {
  if (props.thumbHash || typeof props.placeholder === 'string') {
    return imgPlaceholderComponent
  }

  return props.placeholder
})

const placeholderSrc = computed(() => {
  if (thumbHashDataURL.value) {
    return thumbHashDataURL.value
  }

  if (typeof props.placeholder === 'string') {
    return props.placeholder
  }

  return undefined
})

const errorComponent = computed(() => {
  if (typeof props.errorPlaceholder === 'string') {
    return imgErrorPlaceholderComponent
  }

  return props.errorPlaceholder
})

const loadedSrcValue = computed(() => {
  return data.value
})

const loadImg = (loaderOptions: LoaderOptions) => {
  const { src, data, error, isLoading, isReady, ...imageOptions } = loaderOptions

  if (src instanceof Promise) {
    loadPromise(src, { data, error, isLoading, isReady })
  }

  if (typeof src === 'string') {
    loadImgFromURL({ src, ...imageOptions }, { data, error, isLoading, isReady })
  }
}

const loadPromise = (promise: Promise<string>, state: LoaderState) => {
  const { data, error, isLoading, isReady } = state
  isLoading.value = true
  promise
    .then((src) => {
      data.value = src
      isLoading.value = false
      isReady.value = true
    })
    .catch((err) => {
      error.value = err
      isLoading.value = false
      isReady.value = true
    })
    .finally(() => {
      isLoading.value = false
      isReady.value = true
    })
}

const loadImgFromURL = (imageOptions: ImageOptions, state: LoaderState) => {
  const { data, error, isLoading, isReady } = state
  isLoading.value = true
  data.value = null
  error.value = null
  isReady.value = false
  loadImage(imageOptions)
    .then((img) => {
      data.value = img.src
    })
    .catch((err) => {
      error.value = err
    })
    .finally(() => {
      isLoading.value = false
      isReady.value = true
    })
}

const loadImage = async (options: ImageOptions): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const { src, srcset, sizes, class: className, loading, crossorigin, referrerPolicy } = options

    img.src = src

    if (srcset) img.srcset = srcset

    if (sizes) img.sizes = sizes

    if (className) img.className = className

    if (loading) img.loading = loading

    if (crossorigin) img.crossOrigin = crossorigin

    if (referrerPolicy) img.referrerPolicy = referrerPolicy

    img.onload = () => resolve(img)
    img.onerror = reject
  })
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
  loadImg({
    src: props.src,
    data,
    error,
    isLoading,
    isReady,
    alt: props.alt,
    class: props.class,
    crossorigin: props.crossorigin,
    referrerPolicy: props.referrerPolicy,
    loading: props.loading,
    sizes: props.sizes,
    srcset: props.srcset
  })
  // stop observing
  placeHolderElement.value?.$el && observer.unobserve(placeHolderElement.value?.$el!)
  // deregister observer
  observer.disconnect()
}

onMounted(() => {
  observer.observe(placeHolderElement.value?.$el)
})
</script>

<template>
  <!-- LOADING -->
  <component
    v-if="isLoading"
    :is="placeHolderComponent"
    :src="placeholderSrc"
    :class="props.class"
    :style="props.style"
    ref="placeHolderElement"
  />
  <!-- ERROR -->
  <component
    v-else-if="error"
    :is="errorComponent"
    :src="typeof props.errorPlaceholder === 'string' ? props.errorPlaceholder : undefined"
    :class="props.class"
    :style="props.style"
  />
  <!-- IMG -->
  <img
    v-else
    :src="loadedSrcValue!"
    :class="props.class"
    :style="props.style"
    :alt="props.alt"
    :title="props.title"
    :crossorigin="props.crossorigin"
    :sizes="props.sizes"
    :srcset="props.srcset"
  />
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 25s ease;
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
