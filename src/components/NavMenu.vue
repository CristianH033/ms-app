<script setup lang="ts">
import ThemeSelector from '@/components/ThemeSelector.vue'
import Button from '@/components/ui/button/Button.vue'
import SolarBellBingBoldDuotone from '~icons/solar/bell-bing-bold-duotone'
import SolarBellBingLineDuotone from '~icons/solar/bell-bing-line-duotone'
import SolarHomeBoldDuotone from '~icons/solar/home-bold-duotone'
import SolarHomeLineDuotone from '~icons/solar/home-line-duotone'
import SolarUserBoldDuotone from '~icons/solar/user-bold-duotone'
import SolarUserLineDuotone from '~icons/solar/user-line-duotone'
import SolarUserSpeakBoldDuotone from '~icons/solar/user-speak-bold-duotone'
import SolarUserSpeakLineDuotone from '~icons/solar/user-speak-line-duotone'

const menuItems = [
  {
    iconComponent: SolarHomeLineDuotone,
    activeIconComponent: SolarHomeBoldDuotone,
    name: 'Inicio',
    pathName: 'home'
  },
  {
    iconComponent: SolarUserSpeakLineDuotone,
    activeIconComponent: SolarUserSpeakBoldDuotone,
    name: 'Vendedores',
    pathName: 'sellers'
  },
  {
    iconComponent: SolarBellBingLineDuotone,
    activeIconComponent: SolarBellBingBoldDuotone,
    name: 'Notificaciones',
    pathName: 'notifications'
  },
  {
    iconComponent: SolarUserLineDuotone,
    activeIconComponent: SolarUserBoldDuotone,
    name: 'Cuenta',
    pathName: 'account'
  }
]
</script>

<template>
  <nav
    class="pb-safe sticky bottom-0 z-10 col-span-3 row-start-3 row-end-3 mx-0 flex h-16 w-full flex-row items-center justify-between border-t bg-background/90 px-4 py-2 text-foreground backdrop-blur md:bottom-[inherit] md:top-16 md:col-span-1 md:col-start-1 md:col-end-1 md:row-start-2 md:row-end-4 md:h-fit md:min-h-[calc(100dvh-4rem)] md:flex-col md:items-stretch md:border-r md:border-t-0 md:bg-transparent md:px-4 md:py-4 md:backdrop-blur-none"
  >
    <ul class="flex w-full flex-row justify-around gap-2 md:flex-col md:gap-4">
      <li
        v-for="item in menuItems"
        :key="item.name"
        class="app-main-menu-item w-1/4 max-w-32 md:w-full md:max-w-full"
      >
        <RouterLink :to="{ name: item.pathName }" custom v-slot="{ isActive, navigate }">
          <Button
            @click="navigate"
            role="link"
            variant="ghost"
            class="flex h-full w-full flex-col items-center justify-center overflow-hidden p-1 hover:bg-primary/30 md:h-12 md:flex-row md:justify-start md:gap-2 md:p-2 md:px-4"
            :class="{
              'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground':
                isActive
            }"
          >
            <component
              :is="isActive ? item.activeIconComponent : item.iconComponent"
              class="h-6 w-6 md:h-8 md:w-8"
            />
            <div
              class="w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-center md:text-left"
            >
              <span class="text-xs md:block md:text-sm">{{ item.name }}</span>
            </div>
          </Button>
        </RouterLink>
      </li>
    </ul>
    <ThemeSelector class="hidden md:block" />
  </nav>
</template>
