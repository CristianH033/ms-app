<script setup lang="ts">
import ThemeSelector from '@/components/ThemeSelector.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="w-screen min-h-dvh grid grid-flow-row grid-rows-[auto_1fr_auto]">
    <nav class="w-full h-12 bg-primary dark:bg-primary-dark">
      <img alt="Vue logo" src="@/assets/img/logo.svg" class="max-w-24" />
    </nav>
    <main class="h-full flex flex-col justify-center items-center">
      <RouterView v-slot="{ Component, route }">
        <Transition name="zoom" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>
    <footer class="w-full h-12">
      <span>Footer</span>
      <ThemeSelector />
    </footer>
  </div>
</template>

<style scoped lang="css"></style>
