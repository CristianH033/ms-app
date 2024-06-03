<script setup lang="ts">
import BuyersList from '@/components/BuyersList.vue'
</script>

<template>
  <div class="w-full">
    <h1>Customers View</h1>
    <BuyersList :buyers="[]" />
  </div>
</template>
