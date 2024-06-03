<script setup lang="ts"></script>

<template>
  <div class="w-full">
    <h1>Home</h1>
    <div class="w-full flex flex-col mt-4 gap-4">
      <RouterLink to="/raffles">
        <div class="h-16 p-4">Raffles</div>
      </RouterLink>
      <RouterLink to="/draws">
        <div class="h-16 p-4">Draws</div>
      </RouterLink>
      <RouterLink to="/sellers">
        <div class="h-16 p-4">Sellers</div>
      </RouterLink>
      <RouterLink to="/buyers">
        <div class="h-16 p-4">Buyers</div>
      </RouterLink>
    </div>
    <p v-for="i in 10" :key="i">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ducimus facilis perspiciatis fuga
      non at magnam et explicabo aut, possimus laboriosam excepturi doloremque neque? Incidunt odio
      modi perspiciatis illum voluptatibus?
    </p>
  </div>
</template>
