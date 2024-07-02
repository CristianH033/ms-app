<script setup lang="ts">
export interface Props {
  variant?: 'horizontal' | 'vertical'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'horizontal'
})
</script>

<template>
  <div
    class="relative flex py-5 items-center"
    :class="props.variant === 'horizontal' ? 'flex-row' : 'flex-col'"
  >
    <div class="flex-grow border-t"></div>
    <span class="flex-shrink mx-4" :class="{ orientation: props.variant === 'horizontal' }">
      <slot />
    </span>
    <div class="flex-grow border-t"></div>
  </div>
</template>
