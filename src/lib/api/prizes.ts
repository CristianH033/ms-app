import type { Tables } from '@/types/supabase.db'
import { supabase } from '../supabase.client'

export const getAllPrizes = async (): Promise<Tables<'prizes'>[]> => {
  const { data: prizes, error } = await supabase.from('prizes').select('*')

  if (error) {
    throw new Error(error.message)
  }

  return prizes
}

export const getRafflePrizes = async (raffleId: number): Promise<Tables<'prizes'>[]> => {
  const { data: prizes, error } = await supabase
    .from('prizes')
    .select('*')
    .eq('raffle_id', raffleId)
    .order('id', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return prizes
}

export const getPrizeById = async (id: number): Promise<Tables<'prizes'> | undefined> => {
  const { data: prize, error } = await supabase.from('prizes').select('*').eq('id', id).single()

  if (error) {
    throw new Error(error.message)
  }

  return prize
}
