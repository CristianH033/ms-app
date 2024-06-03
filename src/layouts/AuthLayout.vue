<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="w-screen min-h-dvh grid grid-flow-row grid-rows-[auto_1fr_auto]">
    <nav class="w-full h-12">
      <img alt="Vue logo" src="@/assets/img/logo.svg" class="max-w-24" />
    </nav>
    <main class="h-full flex flex-col justify-center items-center">
      <RouterView v-slot="{ Component, route }">
        <Transition name="zoom" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>
    <footer class="w-full h-12">Footer</footer>
  </div>
</template>

<style scoped lang="css">
.zoom-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.zoom-enter-to {
  opacity: 1;
  transform: scale(1);
}

.zoom-enter-active {
  transition: all 0.3s ease;
}

.zoom-leave-from {
  opacity: 1;
  transform: scale(1);
}

.zoom-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

.zoom-leave-active {
  transition: all 0.3s ease;
}
</style>
