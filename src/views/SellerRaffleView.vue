<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { computed, onMounted, ref } from 'vue'

const tickets = ref<
  {
    id: number
    number: string
  }[]
>([])

const ticketsGrouped = computed(() => {
  // Get unique first chacters from tickets
  const uniqueFirstChars = Array.from(new Set(tickets.value.map((ticket) => ticket.number[0])))

  return uniqueFirstChars.map((firstChar) => {
    return {
      group: firstChar,
      tickets: tickets.value.filter((ticket) => ticket.number[0] === firstChar)
    }
  })
})

// const fill = (numbers: number = 200, groups: number = 10) => {
//   for (let i = 0; i < 20; i++) {
//     tickets.value.push({ id: i, number: zeroPad(i, 3) })
//   }

//   for (let i = 100; i < 120; i++) {
//     tickets.value.push({ id: i, number: zeroPad(i, 3) })
//   }

//   for (let i = 200; i < 220; i++) {
//     tickets.value.push({ id: i, number: zeroPad(i, 3) })
//   }

//   for (let i = 300; i < 320; i++) {
//     tickets.value.push({ id: i, number: zeroPad(i, 3) })
//   }

//   for (let i = 400; i < 420; i++) {
//     tickets.value.push({ id: i, number: zeroPad(i, 3) })
//   }

//   for (let i = 500; i < 520; i++) {
//     tickets.value.push({ id: i, number: zeroPad(i, 3) })
//   }

//   for (let i = 600; i < 620; i++) {
//     tickets.value.push({ id: i, number: zeroPad(i, 3) })
//   }

//   for (let i = 700; i < 720; i++) {
//     tickets.value.push({ id: i, number: zeroPad(i, 3) })
//   }

//   for (let i = 800; i < 820; i++) {
//     tickets.value.push({ id: i, number: zeroPad(i, 3) })
//   }

//   for (let i = 900; i < 920; i++) {
//     tickets.value.push({ id: i, number: zeroPad(i, 3) })
//   }
// }

onMounted(() => {
  // fill()
})
</script>

<template>
  <div class="p-4 rounded-md mx-auto">
    <div class="flex justify-between items-center mb-4">
      <div>
        <h1 class="text-2xl font-bold">Toyota Prado</h1>
        <h2 class="text-xl">Juan Carlos Sánchez</h2>
        <p>3222885970</p>
      </div>
      <div class="text-right">
        <p>13 de Jul</p>
        <p>$500000</p>
      </div>
    </div>
    <div class="space-y-4">
      <div
        v-for="group in ticketsGrouped"
        :key="group.group"
        class="flex items-center gap-4 print:gap-1 border p-4 print:p-1 rounded-md break-before-auto"
      >
        <h3 class="text-6xl mx-4">{{ group.group }}</h3>
        <div class="flex flex-wrap gap-2">
          <Button
            v-for="ticket in group.tickets"
            :key="ticket.id"
            variant="ghost"
            class="text-lg w-14 h-14 print:w-8 print:h-8 border rounded-full print:text-xs"
          >
            {{ ticket.number }}
          </Button>
          <Button variant="secondary" class="print:hidden text-lg w-14 h-14 border rounded-full">
            +
          </Button>
        </div>
      </div>
      <div class="w-full h-16"></div>
      <h3 class="text-xl break-before-page">Pulles</h3>
      <div class="flex items-center gap-4 border p-4 rounded-md">
        <div class="flex gap-2">
          <Button variant="ghost" class="text-lg w-14 h-14 border bg-green-700 rounded-md">
            12
          </Button>
          <Button variant="ghost" class="text-lg w-14 h-14 border bg-green-700 rounded-md">
            14
          </Button>
          <Button
            variant="ghost"
            class="print:hidden text-lg w-14 h-14 border bg-gray-700 rounded-md"
          >
            +
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
