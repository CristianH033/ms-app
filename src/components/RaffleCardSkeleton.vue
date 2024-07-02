<script setup lang="ts">
import Skeleton from './ui/skeleton/Skeleton.vue'
import { Card, CardHeader, CardFooter, CardDescription, CardContent } from './ui/card'
</script>

<template>
  <Card class="overflow-hidden">
    <Skeleton class="w-full h-60 rounded-none" />
    <CardHeader>
      <div class="w-full flex flex-row justify-between">
        <Skeleton class="w-32 h-4 rounded-full" />
        <Skeleton class="w-8 h-8 rounded-full" />
      </div>
      <CardDescription>
        <Skeleton class="w-20 h-2 rounded-full" />
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Skeleton class="mb-4 w-full h-2 rounded-full" />
    </CardContent>
    <CardFooter
      class="flex-col items-stretch sm:items-center sm:justify-end sm:flex-row gap-x-2 gap-y-4"
    >
      <Skeleton class="sm:w-20 h-11 rounded-lg" />
      <Skeleton class="sm:w-20 h-11 rounded-lg" />
      <Skeleton class="sm:w-20 h-11 rounded-lg" />
    </CardFooter>
  </Card>
</template>

<style scoped></style>
