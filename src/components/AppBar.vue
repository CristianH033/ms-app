<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import SolarLogout3LineDuotone from '~icons/solar/logout-3-line-duotone'
import Button from '@/components/ui/button/Button.vue'
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'

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
    class="col-span-3 row-start-1 row-end-2 w-screen sticky top-0 z-20 px-4 py-2 h-16 flex flex-row justify-between gap-4 bg-background/90 text-foreground backdrop-blur border-b"
  >
    <div class="w-32 h-full justify-self-start flex justify-start items-center">
      <!-- <img class="w-full h-full" alt="Vue logo" src="@/assets/img/logo.svg" /> -->
      <span>App logo</span>
    </div>
    <div class="flex justify-center items-center justify-self-center self-center w-full">
      <Transition name="fade" mode="out-in">
        <span class="text-2xl" :key="appStore.getAppTitle">{{ appStore.getAppTitle }}</span>
      </Transition>
    </div>
    <Button
      variant="ghost"
      class="w-32 h-full justify-self-end gap-2"
      @click="logout"
      :loading="loading"
    >
      <SolarLogout3LineDuotone class="" />
      <span class="">Salir</span>
    </Button>
  </header>
</template>
