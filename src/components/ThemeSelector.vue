<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import SolarMonitorLineDuotone from '~icons/solar/monitor-line-duotone'
import SolarMonitorBoldDuotone from '~icons/solar/monitor-bold-duotone'
import SolarSunLineDuotone from '~icons/solar/sun-line-duotone'
import SolarSunBoldDuotone from '~icons/solar/sun-bold-duotone'
import SolarMoonLineDuotone from '~icons/solar/moon-line-duotone'
import SolarMoonBoldDuotone from '~icons/solar/moon-bold-duotone'
import { Button } from '@/components/ui/button'
import { computed } from 'vue'

const colorMode = useColorMode({ emitAuto: true })

const lightIconComponent = computed(() => {
  return colorMode.value === 'light' ? SolarSunBoldDuotone : SolarSunLineDuotone
})

const autoIconComponent = computed(() => {
  return colorMode.value === 'auto' ? SolarMonitorBoldDuotone : SolarMonitorLineDuotone
})

const darkIconComponent = computed(() => {
  return colorMode.value === 'dark' ? SolarMoonBoldDuotone : SolarMoonLineDuotone
})
</script>

<template>
  <div class="inline-block w-auto">
    <div class="flex flex-row flex-nowrap">
      <Button
        class="flex flex-row gap-2 rounded-r-none border"
        :variant="colorMode === 'light' ? 'default' : 'outline'"
        @click="colorMode = 'light'"
      >
        <component :is="lightIconComponent" />
      </Button>
      <Button
        class="flex flex-row gap-2 rounded-none border border-l-0 border-r-0"
        :variant="colorMode === 'auto' ? 'default' : 'outline'"
        @click="colorMode = 'auto'"
      >
        <component :is="autoIconComponent" />
      </Button>
      <Button
        class="flex flex-row gap-2 rounded-l-none border"
        :variant="colorMode === 'dark' ? 'default' : 'outline'"
        @click="colorMode = 'dark'"
      >
        <component :is="darkIconComponent" />
      </Button>
    </div>
  </div>
</template>
