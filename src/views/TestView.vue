<script setup lang="ts">
import LazyImage from '@/components/LazyImage.vue'
import TicketInfo from '@/components/TicketInfo.vue'
import type { Tables } from '@/types/supabase.db'
import { supabase } from '@/lib/supabase.client'

import { onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'

const raffles = ref<Tables<'raffles'>[]>([])

const show = ref(false)

const urlToBase64 = async (url: string): Promise<string> => {
  try {
    // Fetch la imagen
    const response = await fetch(url)

    // Convertir la respuesta a un Blob
    const blob = await response.blob()

    // Crear un FileReader para leer el Blob
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result)
        } else {
          reject(new Error('Failed to convert to base64'))
        }
      }
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch (error) {
    console.error('Error converting URL to base64:', error)
    throw error
  }
}

const getSubabaseFile = async (bucket: string, path: string) => {
  const { data, error } = await supabase.storage.from('').download(path)

  if (error) {
    throw new Error(error.message)
  }

  return URL.createObjectURL(data)
}

// const testData = ref<string>('')

onMounted(async () => {
  // testData.value = await urlToBase64('https://placehold.co/5000/png')
  const { data, error } = await supabase
    .from('raffles')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  raffles.value = data
})
</script>
<template>
  <div class="w-full flex flex-col items-center gap-4">
    <ul class="flex flex-col gap-2">
      <li v-for="raffle in raffles" :key="raffle.id">
        <p>{{ raffle.image_path }}</p>
        <p class="text-xs">{{ raffle.thumb_hash }}</p>
      </li>
    </ul>
    <Button @click="show = !show">Show/hide</Button>
    <div class="w-64" v-if="show">
      <LazyImage
        class="w-full aspect-auto"
        :src="getSubabaseFile('raffles', raffle.image_path!)"
        v-for="raffle in raffles"
        :key="raffle.id"
      />
    </div>
    <!-- <TicketInfo :ticket-id="'53'" class="border border-dashed rounded-md p-4" /> -->
  </div>
</template>

<style scoped></style>
