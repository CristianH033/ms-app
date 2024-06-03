<script setup lang="ts">
import SellersList from '@/components/SellersList.vue'
</script>

<template>
  <div class="w-full">
    <h1>Sellers View</h1>
    <SellersList :sellers="[]" />
  </div>
</template>
