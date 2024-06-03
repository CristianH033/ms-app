<script setup lang="ts">
import { RouterView } from 'vue-router'
import { supabase } from '@/lib/supabase.client'

const menuItems = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Calendar',
    path: '/calendar'
  },
  {
    name: 'Notifications',
    path: '/notifications'
  },
  {
    name: 'Account',
    path: '/account'
  }
]

const logout = () => {
  supabase.auth.signOut()
}
</script>

<template>
  <div class="layout" style="">
    <header class="app-bar">
      <img
        class="max-w-32 w-full h-full justify-self-start"
        alt="Vue logo"
        src="@/assets/img/logo.svg"
      />
      <span class="justify-self-center self-center">MS App</span>
      <button class="max-w-32 w-full h-full justify-self-end" @click="logout">Logout</button>
    </header>
    <main class="main-content">
      <RouterView v-slot="{ Component, route }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" :key="route.name" />
        </Transition>
      </RouterView>
    </main>
    <nav class="nav-bar">
      <ul class="flex flex-row gap-2 md:flex-col">
        <li
          v-for="item in menuItems"
          :key="item.name"
          class="md:p-2 md:rounded-xl md:bg-primary md:dark:bg-primary-dark md:text-on-primary md:dark:text-on-primary-dark"
        >
          <RouterLink :to="item.path">{{ item.name }}</RouterLink>
        </li>
      </ul>
    </nav>
  </div>
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
