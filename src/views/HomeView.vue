<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'

const items = [
  {
    title: 'Rifas',
    icon: 'RaffleIcon',
    pathName: 'raffles'
  },
  {
    title: 'Sorteos',
    icon: 'DrawIcon',
    pathName: 'draws'
  },
  {
    title: 'Vendedores',
    icon: 'SellerIcon',
    pathName: 'sellers'
  },
  {
    title: 'Clientes',
    icon: 'BuyerIcon',
    pathName: 'buyers'
  }
]
</script>

<template>
  <div class="w-full">
    <div class="w-full flex flex-col items-center mt-4 gap-4">
      <RouterLink
        class="block w-full md:max-w-md"
        v-for="item in items"
        :key="item.title"
        :to="{ name: item.pathName }"
      >
        <Card class="w-full">
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium"> {{ item.title }} </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              class="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">+2350</div>
            <p class="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
      </RouterLink>
    </div>
    <!-- <p v-for="i in 10" :key="i">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ducimus facilis perspiciatis fuga
      non at magnam et explicabo aut, possimus laboriosam excepturi doloremque neque? Incidunt odio
      modi perspiciatis illum voluptatibus?
    </p> -->
  </div>
</template>
