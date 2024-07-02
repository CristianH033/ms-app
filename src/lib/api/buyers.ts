import type { Tables } from '@/types/supabase.db'
import { supabase } from '../supabase.client'

export const getAllBuyers = async (): Promise<Tables<'buyers'>[] | undefined> => {
  const { data: buyers, error } = await supabase.from('buyers').select('*')

  if (error) {
    throw new Error(error.message)
  }

  return buyers
}

export const getBuyerById = async (id: number): Promise<Tables<'buyers'> | undefined> => {
  const { data: buyer, error } = await supabase.from('buyers').select('*').eq('id', id).single()

  if (error) {
    throw new Error(error.message)
  }

  return buyer
}
