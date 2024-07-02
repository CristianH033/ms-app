<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import SeparatorLine from '@/components/SeparatorLine.vue'
import SolarPulseLineDuotone from '~icons/solar/pulse-line-duotone'
import SolarSirenRoundedLineDuotone from '~icons/solar/siren-rounded-line-duotone'
</script>
<template>
  <div class="w-full flex flex-col items-center gap-4">
    <div class="w-full max-w-3xl flex flex-col gap-4">
      <Alert class="[&>svg~*]:pl-10">
        <SolarPulseLineDuotone class="w-8 h-8" />
        <AlertTitle>Camnios pendientes!</AlertTitle>
        <AlertDescription>
          Hay cambios pendientes para aplicar en la base de datos.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive" class="[&>svg~*]:pl-10">
        <SolarSirenRoundedLineDuotone class="w-8 h-8" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Algo salió mal mientras se sincronizaba la base de datos.
        </AlertDescription>
      </Alert>
      <SeparatorLine>Ayer</SeparatorLine>
      <Alert variant="destructive" class="[&>svg~*]:pl-10">
        <SolarSirenRoundedLineDuotone class="w-8 h-8" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Algo salió mal mientras se sincronizaba la base de datos.
        </AlertDescription>
      </Alert>
    </div>
  </div>
</template>
