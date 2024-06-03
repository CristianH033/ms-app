<script setup lang="ts">
import { reactive } from 'vue'

type RaffleForm = {
  name: string
  description: string
  drawing: RaffleDrawing[]
  raffle_prizes: RafflePrize[]
  start_date: Date | null
  end_date: Date | null
  image: File | null
}

type RaffleDrawing = {
  name: string
  drawn_at: Date | null
  image: File | null
}

type RafflePrize = {
  name: string
  description: string
  prize_value: number
  image: File | null
}

const form = reactive<RaffleForm>({
  name: '',
  description: '',
  drawing: [],
  raffle_prizes: [],
  start_date: null,
  end_date: null,
  image: null
})

const addDrawing = () => {
  if (form.drawing.length < 1) {
    form.drawing.push({
      name: '',
      drawn_at: null,
      image: null
    })
  }
}

const addPrize = () => {
  form.raffle_prizes.push({
    name: '',
    description: '',
    prize_value: 0,
    image: null
  })
}

const removePrize = (index: number) => {
  form.raffle_prizes.splice(index, 1)
}

const handleRaffleImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement

  if (target.files) {
    form.image = target.files[0]
  }
}

const handleDrawingImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement

  if (target.files) {
    form.drawing[0].image = target.files[0]
  }
}

const handlePrizeImageChange = (event: Event, index: number) => {
  const target = event.target as HTMLInputElement

  if (target.files) {
    form.raffle_prizes[index].image = target.files[0]
  }
}

const handleSubmit = () => {
  // Aquí va la lógica para enviar el formulario
  console.log(form)
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="name">Nombre del sorteo</label>
      <input type="text" id="name" v-model="form.name" />
    </div>

    <div>
      <label for="description">Descripción del sorteo</label>
      <textarea name="description" v-model="form.description" />
    </div>

    <div>
      <label for="drawing">Sorteo</label>
      <ul>
        <li v-for="(drawing, index) in form.drawing" :key="index">
          <input type="text" v-model="drawing.name" />
          <input type="datetime-local" v-model="drawing.drawn_at" />
          <input type="file" @change="handleDrawingImageChange($event)" />
        </li>
      </ul>
      <button @click="addDrawing">agregar sorteo</button>
    </div>

    <div>
      <label for="prizes">Premios</label>
      <ul>
        <li v-for="(prize, index) in form.raffle_prizes" :key="index">
          <input type="text" v-model="prize.name" />
          <input type="text" v-model="prize.description" />
          <input type="number" v-model="prize.prize_value" />
          <input type="file" @change="handlePrizeImageChange($event, index)" />
          <button @click="removePrize(index)">Eliminar</button>
        </li>
      </ul>
      <button @click="addPrize">Agregar premio</button>
    </div>

    <div>
      <label for="start_date">Fecha de inicio</label>
      <input type="datetime-local" v-model="form.start_date" />
    </div>

    <div>
      <label for="end_date">Fecha de fin</label>
      <input type="datetime-local" v-model="form.end_date" />
    </div>

    <div>
      <label for="image">Imagen del sorteo</label>
      <input type="file" @change="handleRaffleImageChange" />
    </div>

    <button type="submit">Crear sorteo</button>
  </form>
</template>
