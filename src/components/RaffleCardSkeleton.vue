<script setup lang="ts">
import Skeleton from './ui/skeleton/Skeleton.vue'
import { Card, CardHeader, CardFooter, CardDescription, CardContent } from './ui/card'
</script>

<template>
  <Card class="overflow-hidden">
    <Skeleton class="h-60 w-full rounded-none" />
    <CardHeader>
      <div class="flex w-full flex-row justify-between">
        <Skeleton class="h-4 w-32 rounded-full" />
        <Skeleton class="h-8 w-8 rounded-full" />
      </div>
      <CardDescription>
        <Skeleton class="h-2 w-20 rounded-full" />
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Skeleton class="mb-4 h-2 w-full rounded-full" />
    </CardContent>
    <CardFooter
      class="flex-col items-stretch gap-x-2 gap-y-4 sm:flex-row sm:items-center sm:justify-end"
    >
      <Skeleton class="h-11 rounded-lg sm:w-20" />
      <Skeleton class="h-11 rounded-lg sm:w-20" />
      <Skeleton class="h-11 rounded-lg sm:w-20" />
    </CardFooter>
  </Card>
</template>

<style scoped></style>
