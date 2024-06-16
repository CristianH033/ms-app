<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import MaterialSymbolsErrorOutline from '~icons/material-symbols/error-outline'
import MaterialSymbolsForwardMediaRounded from '~icons/material-symbols/forward-media-rounded'
import type { PropType } from 'vue'

const router = useRouter()

defineProps({
  error: {
    type: Error as PropType<Error>,
    default: () => new Error('Unknown error')
  }
})

const reload = () => {
  router.go(0)
}
</script>
<template>
  <div
    class="@container w-full max-w-[30rem] m-auto rounded-lg p-4 flex flex-col gap-4 outline-offset-4 outline-dashed outline-destructive"
  >
    <div
      class="w-full flex flex-col-reverse justify-between text-destructive @sm:items-end @sm:flex-row @sm:gap-4"
    >
      <div>
        <h1 class="text-2xl break-all">{{ error.name ?? 'Error' }}</h1>
      </div>
      <MaterialSymbolsErrorOutline class="w-12 h-12 shrink-0 self-end @sm:self-center" />
    </div>
    <p>{{ error.message ?? 'An unknown error occurred.' }}</p>
    <div class="flex flex-col-reverse justify-end gap-2 @sm:flex-row">
      <RouterLink :to="{ name: 'home' }">
        <Button variant="ghost">Return to home</Button>
      </RouterLink>
      <Button variant="destructive" class="gap-2" @click="reload">
        <MaterialSymbolsForwardMediaRounded />
        <span>Reload page</span>
      </Button>
    </div>
  </div>
</template>
