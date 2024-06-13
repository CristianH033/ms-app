<script setup lang="ts">
import ThemeSelector from '@/components/ThemeSelector.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="w-screen min-h-dvh grid grid-flow-row grid-rows-[auto_1fr_auto]">
    <nav class="w-full h-auto px-4 py-2 flex flex-row justify-between items-center">
      <!-- <img alt="Vue logo" src="@/assets/img/logo.svg" class="max-w-24" /> -->
      <span>App Logo</span>
      <ThemeSelector />
    </nav>
    <main class="h-full flex flex-col justify-center items-center p-4">
      <RouterView v-slot="{ Component, route }">
        <Transition name="zoom" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>
    <footer class="w-full h-10 px-4 py-2 flex flex-row justify-center items-center">
      <p class="text-xs">
        <span>Copyright © 2024</span>
        <span> - </span>
        <a class="text-xs" href="https://github.com/cristianh033" target="_blank">Cristian Home</a>
      </p>
    </footer>
  </div>
</template>

<style scoped lang="css"></style>
