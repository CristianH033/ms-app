<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppBar from '@/components/AppBar.vue'
import NavMenu from '@/components/NavMenu.vue'
</script>

<template>
  <div
    class="w-full min-h-dvh grid gap-0 grid-rows-[auto_1fr_auto] grid-cols-[1fr_1fr_1fr] auto-rows-[row] md:grid-cols-[auto_1fr_1fr] md:grid-rows-[auto_1fr_1fr]"
  >
    <AppBar />
    <main
      class="@container/main p-4 col-span-3 row-start-2 row-end-3 md:col-span-2 md:row-start-2 md:row-end-4"
    >
      <RouterView v-slot="{ Component, route }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" :key="route.name" />
        </Transition>
      </RouterView>
    </main>
    <NavMenu />
  </div>
</template>

<style scoped lang="css"></style>
