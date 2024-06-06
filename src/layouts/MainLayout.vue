<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

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
  useAuthStore().logout()
}
</script>

<template>
  <div
    class="w-screen min-h-dvh grid gap-0 grid-rows-[auto_1fr_auto] grid-cols-[1fr_1fr_1fr] auto-rows-[row] md:grid-cols-[10rem_1fr_1fr] md:grid-rows-[auto_1fr_1fr]"
  >
    <header
      class="col-span-3 row-start-1 row-end-2 w-screen sticky top-0 z-10 p-2 h-16 flex flex-row justify-between bg-primary dark:bg-primary-dark text-on-primary dark:text-on-primary-dark"
    >
      <div class="max-w-32 w-full h-full justify-self-start">
        <img class="w-full h-full" alt="Vue logo" src="@/assets/img/logo.svg" />
      </div>
      <span class="justify-self-center self-center">MS App</span>
      <button class="max-w-32 w-full h-full justify-self-end" @click="logout">Logout</button>
    </header>
    <main class="p-4 col-span-3 row-start-2 row-end-3 md:col-span-2 md:row-start-2 md:row-end-4">
      <RouterView v-slot="{ Component, route }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" :key="route.name" />
        </Transition>
      </RouterView>
    </main>
    <nav
      class="col-span-3 row-start-3 row-end-3 w-full h-16 mx-0 flex flex-row items-center justify-center sticky bottom-0 z-10 rounded-t-xl bg-primary dark:bg-primary-dark text-on-primary dark:text-on-primary-dark pb-safe md:col-span-1 md:row-start-2 md:row-end-4 md:col-start-1 md:col-end-1 md:h-fit md:flex-col md:items-stretch md:top-20 md:p-2 md:bg-transparent md:dark:bg-transparent"
    >
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

<style scoped lang="css"></style>
