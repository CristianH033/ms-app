<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import SolarLogout3LineDuotone from '~icons/solar/logout-3-line-duotone'
import Button from '@/components/ui/button/Button.vue'
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import MdiCardsOutline from '~icons/mdi/cards-outline'

const appStore = useAppStore()

const loading = ref(false)

const logout = async () => {
  loading.value = true
  await useAuthStore().logout()
  loading.value = false
}
</script>

<template>
  <header
    class="sticky top-0 z-20 col-span-3 row-start-1 row-end-2 flex h-16 w-screen flex-row justify-between gap-4 border-b bg-background/90 px-4 py-2 text-foreground backdrop-blur print:hidden"
  >
    <div class="flex h-full w-32 items-center justify-start justify-self-start">
      <!-- <img class="w-full h-full" alt="Vue logo" src="@/assets/img/logo.svg" /> -->
      <!-- <span>App logo</span> -->
      <MdiCardsOutline class="h-11 w-11" />
    </div>
    <div class="flex w-full items-center justify-center self-center justify-self-center">
      <Transition name="fade" mode="out-in">
        <span class="text-2xl" :key="appStore.getAppTitle">{{ appStore.getAppTitle }}</span>
      </Transition>
    </div>
    <Button
      variant="ghost"
      class="h-full w-32 gap-2 justify-self-end"
      @click="logout"
      :loading="loading"
    >
      <SolarLogout3LineDuotone class="h-6 w-6" />
      <span class="">Salir</span>
    </Button>
  </header>
</template>
