<script setup lang="ts">
import { computed, defineComponent, h, ref, type Component, type ImgHTMLAttributes } from 'vue'
import { useAsyncState, useImage } from '@vueuse/core'
import { Skeleton } from './ui/skeleton'
import { base64ThumbHashToDataURL, binaryThumbHashToDataURL } from '@/lib/utils/thumbHash'
import SolarLinkBrokenLineDuotone from '~icons/solar/link-broken-line-duotone'
import { cn } from '@/lib/utils'

type Base64DataURL = `data:image/png;base64,${string}`

const props = withDefaults(
  defineProps<{
    src?: ImgHTMLAttributes['src'] | Promise<string>
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
    delay?: number
  }>(),
  {
    placeholder: defineComponent({
      props: {
        class: {
          type: String,
          default: ''
        }
      },
      setup(props) {
        return () =>
          h(Skeleton, {
            class: cn('flex flex-col justify-center items-center rounded-md p-4', props.class)
          })
      }
    }),
    errorPlaceholder: defineComponent({
      props: {
        class: {
          type: String,
          default: ''
        }
      },
      setup(props) {
        return () =>
          h(
            'div',
            {
              class: cn(
                'flex flex-col justify-center items-center border border-dashed border-destructive rounded-md p-4 text-center text-destructive',
                props.class
              )
            },
            [h(SolarLinkBrokenLineDuotone, { class: 'w-3/5 min-w-[3rem] max-w-[5rem] h-auto' })]
          )
      }
    })
  }
)

const { isLoading, src, error } = (() => {
  const isLoading = ref<boolean>(false)
  const src = ref<ImgHTMLAttributes['src'] | Base64DataURL | null>(null)
  const error = ref<unknown | null | string>(null)

  // if props.src is ImgHTMLAttributes['src'] then use vueuse/core/useImage
  if (typeof props.src === 'string') {
    const { isLoading, error, state } = useImage({ src: props.src })
    return {
      isLoading,
      src: state,
      error
    }
  }

  if (props.src instanceof Promise) {
    console.log('props.src instanceof Promise')
    const {
      state: src,
      isLoading,
      error
    } = useAsyncState(
      props.src.then((src) => src),
      null
    )

    return {
      isLoading,
      src,
      error
    }
  }

  return {
    isLoading,
    src,
    error
  }
})()

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

  return undefined
})

const loadingSrcValue = computed(() => {
  if (thumbHashUrlData.value) {
    return thumbHashUrlData.value
  }

  if (typeof props.placeholder === 'string') {
    return props.placeholder
  }

  return undefined
})

const errorSrcValue = computed(() => {
  if (typeof props.errorPlaceholder === 'string') {
    return props.errorPlaceholder
  }

  return undefined
})

const srcValue = computed(() => {
  if (src.value instanceof HTMLImageElement) {
    return src.value.src
  }

  if (typeof src.value === 'string') {
    return src.value
  }

  return undefined
})

const showPlaceholderAsComponent = computed(() => {
  const show = typeof props.placeholder === 'object' && !thumbHashUrlData.value

  return show
})

const showErrorPlaceholderAsComponent = computed(() => {
  const show = typeof props.errorPlaceholder === 'object'

  return show
})
</script>

<template>
  <!-- LOADING -->
  <component
    v-if="isLoading && showPlaceholderAsComponent"
    :is="placeholder"
    :class="props.class"
    :style="props.style"
  />
  <img
    v-else-if="isLoading && !showPlaceholderAsComponent"
    :src="loadingSrcValue"
    :class="cn('animate-brightness', props.class)"
    :style="props.style"
    :alt="props.alt"
    :title="props.title"
    :crossorigin="props.crossorigin"
    :sizes="props.sizes"
    :srcset="props.srcset"
  />
  <!-- ERROR -->
  <component
    v-else-if="error && showErrorPlaceholderAsComponent"
    :is="errorPlaceholder"
    :class="props.class"
    :style="props.style"
  />
  <img
    v-else-if="error && !showErrorPlaceholderAsComponent"
    :src="errorSrcValue"
    :class="props.class"
    :style="props.style"
    :alt="props.alt"
    :title="props.title"
    :crossorigin="props.crossorigin"
    :sizes="props.sizes"
    :srcset="props.srcset"
  />
  <!-- IMG -->
  <img
    v-else
    :src="srcValue"
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
