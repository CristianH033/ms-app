<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

const colorMode = useColorMode({ emitAuto: true })
</script>

<template>
  <div class="inline-block">
    <button
      :class="{ 'bg-primary dark:bg-primary-dark': colorMode == 'light' }"
      @click="colorMode = 'light'"
    >
      Light
    </button>
    <button
      :class="{ 'bg-primary dark:bg-primary-dark': colorMode == 'auto' }"
      @click="colorMode = 'auto'"
    >
      System
    </button>
    <button
      :class="{ 'bg-primary dark:bg-primary-dark': colorMode == 'dark' }"
      @click="colorMode = 'dark'"
    >
      Dark
    </button>
  </div>
</template>
