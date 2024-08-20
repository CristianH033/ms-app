<script setup lang="ts">
import Skeleton from './ui/skeleton/Skeleton.vue'
import { Card, CardHeader, CardFooter, CardDescription, CardContent } from './ui/card'
</script>

<template>
  <Card class="overflow-hidden">
    <Skeleton class="aspect-[16/7] w-full rounded-none" />
    <CardHeader>
      <div class="flex w-full flex-row justify-between">
        <Skeleton class="h-4 w-32 rounded-full" />
        <Skeleton class="h-8 w-8 rounded-full" />
      </div>
      <CardDescription>
        <Skeleton class="h-2 w-20 rounded-full" />
        <Skeleton class="mt-2 h-2 w-20 rounded-full" />
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Skeleton class="mt-4 h-2 w-full rounded-full" />
      <Skeleton class="mt-5 h-10 w-full rounded-full" />
    </CardContent>
    <CardFooter
      class="flex-col items-stretch gap-x-2 gap-y-4 sm:flex-row sm:items-center sm:justify-end"
    >
      <div class="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
        <Skeleton class="h-11 w-full rounded-lg sm:w-20" />
        <div class="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
          <Skeleton class="h-11 w-full rounded-lg sm:w-24" />
          <Skeleton class="h-11 w-full rounded-lg sm:w-24" />
        </div>
      </div>
    </CardFooter>
  </Card>
</template>

<style scoped></style>
