<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { supabase } from './lib/supabase.client'
import { onMounted } from 'vue'
import type { Subscription } from '@supabase/supabase-js'

const router = useRouter()
let authListener: { subscription: Subscription } | null = null

const listenToAuthChanges = () => {
  const { data } = supabase.auth.onAuthStateChange((event) => {
    console.log(event)

    switch (event) {
      case 'INITIAL_SESSION':
        break
      case 'SIGNED_IN':
        if (router.currentRoute.value.meta?.requires_guess) {
          router.push({ name: 'home' })
        }
        break
      case 'SIGNED_OUT':
        if (router.currentRoute.value.meta?.requires_auth) {
          router.push({ name: 'login' })
          cancelAuthListener()
        }
        break
      case 'PASSWORD_RECOVERY':
        break
      case 'TOKEN_REFRESHED':
        break
      case 'USER_UPDATED':
        break
      default:
        break
    }
  })

  authListener = data
}

const cancelAuthListener = () => {
  authListener?.subscription.unsubscribe()
}

onMounted(() => {
  listenToAuthChanges()
})
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style scoped lang="css">
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
</style>
