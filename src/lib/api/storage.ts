// File upload and download from Supabase storage
import { supabase } from '@/lib/supabase.client'
import { v4 as uuidv4 } from 'uuid'
import { blobToBase64 } from '../utils/fetch'
import { useMemoize } from '@vueuse/core'

export const uploadFile = async (file: File, name: string, bucket: string = '') => {
  const uuid = uuidv4().slice(-10)
  name = uuid + '-' + name
  const { data, error } = await supabase.storage.from(bucket).upload(name, file, {
    cacheControl: '3600',
    upsert: false
  })

  if (error) {
    console.log(error)
  }

  return data
}

export const getFile = async (path: string, bucket: string = '') => {
  const { data, error } = await supabase.storage.from(bucket).download(path)

  if (error) {
    console.log(error)
  }

  return data
}

export const getFileAsBase64 = useMemoize(async (path: string, bucket: string = '') => {
  const blob = await getFile(path, bucket)
  const base64 = await blobToBase64(blob!)
  return base64
})

export const getFileUrl = async (path: string) => {
  const { data, error } = await supabase.storage
    .from('raffles')
    .createSignedUrl(path, 60 * 60 * 24 * 365 * 10)

  if (error) {
    console.log(error)
  }

  return data
}

export const deleteFile = async (path: string) => {
  const { data, error } = await supabase.storage.from('raffles').remove([path])

  if (error) {
    console.log(error)
  }

  return data
}
