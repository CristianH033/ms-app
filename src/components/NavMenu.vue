<script setup lang="ts">
import SolarHomeLineDuotone from '~icons/solar/home-line-duotone'
import SolarHomeBoldDuotone from '~icons/solar/home-bold-duotone'
import SolarCalendarLineDuotone from '~icons/solar/calendar-line-duotone'
import SolarCalendarBoldDuotone from '~icons/solar/calendar-bold-duotone'
import SolarBellBingLineDuotone from '~icons/solar/bell-bing-line-duotone'
import SolarBellBingBoldDuotone from '~icons/solar/bell-bing-bold-duotone'
import SolarUserLineDuotone from '~icons/solar/user-line-duotone'
import SolarUserBoldDuotone from '~icons/solar/user-bold-duotone'
import Button from '@/components/ui/button/Button.vue'
import ThemeSelector from '@/components/ThemeSelector.vue'

const menuItems = [
  {
    iconComponent: SolarHomeLineDuotone,
    activeIconComponent: SolarHomeBoldDuotone,
    name: 'Inicio',
    pathName: 'home'
  },
  {
    iconComponent: SolarCalendarLineDuotone,
    activeIconComponent: SolarCalendarBoldDuotone,
    name: 'Calendario',
    pathName: 'calendar'
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
    class="px-4 py-2 col-span-3 row-start-3 row-end-3 w-full h-16 mx-0 flex flex-row items-center justify-between sticky bottom-0 z-10 pb-safe border-t bg-background/90 text-foreground backdrop-blur-sm md:col-span-1 md:row-start-2 md:row-end-4 md:col-start-1 md:col-end-1 md:h-fit md:flex-col md:items-stretch md:top-20 md:px-4 md:border-t-0 md:min-h-[calc(100dvh-6rem)] md:border-r md:backdrop-blur-none md:bg-transparent"
  >
    <ul class="w-full flex flex-row gap-2 justify-around md:gap-4 md:flex-col">
      <li
        v-for="item in menuItems"
        :key="item.name"
        class="app-main-menu-item w-1/4 max-w-32 md:w-full md:max-w-full"
      >
        <RouterLink
          class="app-main-menu-item-link w-full"
          :to="{ name: item.pathName }"
          v-slot="{ isActive }"
        >
          <Button
            variant="ghost"
            class="w-full p-1 flex flex-col justify-center overflow-hidden items-center hover:bg-primary/30 md:flex-row md:justify-start h-full md:h-12 md:p-2 md:gap-2"
            :class="{
              'bg-primary text-primary-foreground hover:text-primary-foreground hover:bg-primary/90':
                isActive
            }"
          >
            <component
              :is="isActive ? item.activeIconComponent : item.iconComponent"
              class="w-6 h-6"
            />
            <div
              class="w-full text-center whitespace-nowrap overflow-hidden overflow-ellipsis md:text-left"
            >
              {{ item.name }}
            </div>
          </Button>
        </RouterLink>
      </li>
    </ul>
    <ThemeSelector class="hidden md:block" />
  </nav>
</template>
