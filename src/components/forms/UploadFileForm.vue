<script setup lang="ts">
import { base64ThumbHasToDataURL } from '@/lib/utils/thumbHash'
import ImageInput from '../inputs/ImageInput.vue'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { ref, watch } from 'vue'
import { getFileUrl, uploadFile } from '@/lib/api/storage'

// const { handleSubmit } = useForm()

const thumbDataUrl = ref<string>()
const base64ThumbHash = ref<string | null>(null)
const uploadedUrl = ref<string>()

const handleSubmit = (event: Event) => {
  event.preventDefault()

  const formData = new FormData(event.target as HTMLFormElement)

  console.log(formData)

  const files = (() => {
    let files: File[] = []
    for (const entry of formData.entries()) {
      if (entry[1] instanceof File) {
        files.push(entry[1])
      }
    }

    return files
  })()

  console.log(files)

  console.log(files.filter((file) => file.size > 0))

  files
    .filter((file) => file.size > 0)
    .forEach(async (file) => {
      const data = await uploadFile(file, file.name)
      console.log(data)
      uploadedUrl.value = (await getFileUrl(data!.path))?.signedUrl
    })
}

watch(base64ThumbHash, (value) => {
  console.log(value)
  if (value) {
    thumbDataUrl.value = base64ThumbHasToDataURL(value)
  }
})
</script>

<template>
  <div class="w-full">
    <form action="" @submit.prevent="handleSubmit">
      <div class="flex flex-col gap-4">
        <Input type="text" name="name" />
        <ImageInput name="image" v-model:base64-thumb-hash="base64ThumbHash" />
        <Button type="submit">Submit</Button>
      </div>
    </form>
    <img class="w-60" v-if="thumbDataUrl" :src="thumbDataUrl" />
    <pre>{{ base64ThumbHash }}</pre>
    <img class="w-60" v-if="uploadedUrl" :src="uploadedUrl" />
  </div>
</template>

<style scoped lang="css"></style>
