<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { onMounted, watch } from 'vue'
import { useColorMode } from '@vueuse/core'
import { useAuthStore } from './stores/auth'

const colorMode = useColorMode({ emitAuto: true })

const router = useRouter()

const authStore = useAuthStore()

authStore.$subscribe(() => {
  if (authStore.isAuthenticated) {
    if (router.currentRoute.value.query['redirect']) {
      router.push({ path: router.currentRoute.value.query['redirect'] as string })
    } else {
      router.push({ name: 'home' })
    }
  } else {
    authStore.logout()
    router.push({ name: 'login' })
  }
})

onMounted(() => {})

watch(colorMode, () => {
  const metaLight = document.querySelector(
    'meta[name="theme-color"][media="(prefers-color-scheme: light)"]'
  )
  const metaDark = document.querySelector(
    'meta[name="theme-color"][media="(prefers-color-scheme: dark)"]'
  )
  if (colorMode.value === 'dark') {
    metaLight?.setAttribute('content', 'rgb(66, 0, 0)')
    metaDark?.setAttribute('content', 'rgb(66, 0, 0)')
  } else if (colorMode.value === 'light') {
    metaLight?.setAttribute('content', 'rgb(96, 0, 0)')
    metaDark?.setAttribute('content', 'rgb(96, 0, 0)')
  } else if (colorMode.value === 'auto') {
    metaLight?.setAttribute('content', 'rgb(96, 0, 0)')
    metaDark?.setAttribute('content', 'rgb(66, 0, 0)')
  }
})
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style lang="css">
/* Vue transitions */
.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter-active {
  transition: opacity 0.3s ease;
}

.fade-leave-from {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  transition: opacity 0.3s ease;
}

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
