// File upload and download from Supabase storage
import { supabase } from '@/lib/supabase.client'

export const uploadFile = async (file: File) => {
  const { data, error } = await supabase.storage.from('files').upload(file.name, file)

  if (error) {
    throw new Error(error.message)
  }

  return data
}
