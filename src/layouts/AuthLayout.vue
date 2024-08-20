<script setup lang="ts">
import ThemeSelector from '@/components/ThemeSelector.vue'
import { RouterView } from 'vue-router'
import MdiCardsOutline from '~icons/mdi/cards-outline'
</script>

<template>
  <div class="grid min-h-dvh w-screen grid-flow-row grid-rows-[auto_1fr_auto]">
    <nav class="flex h-auto w-full flex-row items-center justify-between px-4 py-2">
      <!-- <img alt="Vue logo" src="@/assets/img/logo.svg" class="max-w-24" /> -->
      <MdiCardsOutline class="h-11 w-11" />
      <ThemeSelector />
    </nav>
    <main class="flex h-full flex-col items-center justify-center p-4">
      <RouterView v-slot="{ Component, route }">
        <Transition name="zoom" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>
    <footer class="flex h-10 w-full flex-row items-center justify-center px-4 py-2">
      <p class="text-xs">
        <span>Copyright © 2024</span>
        <span> - </span>
        <a class="text-xs" href="https://github.com/cristianh033" target="_blank">Cristian Home</a>
      </p>
    </footer>
  </div>
</template>

<style scoped lang="css"></style>
