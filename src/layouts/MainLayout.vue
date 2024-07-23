<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppBar from '@/components/AppBar.vue'
import NavMenu from '@/components/NavMenu.vue'
</script>

<template>
  <div
    class="grid min-h-dvh w-full auto-rows-[row] grid-cols-[1fr_1fr_1fr] grid-rows-[auto_1fr_auto] gap-0 md:grid-cols-[auto_1fr_1fr] md:grid-rows-[auto_1fr_1fr] print:grid-cols-[auto_1fr]"
  >
    <AppBar />
    <main
      class="col-span-3 row-start-2 row-end-3 p-4 @container/main md:col-span-2 md:row-start-2 md:row-end-4"
    >
      <RouterView v-slot="{ Component, route }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" :key="route.name" />
        </Transition>
      </RouterView>
    </main>
    <NavMenu class="print:hidden" />
  </div>
</template>

<style scoped lang="css"></style>
