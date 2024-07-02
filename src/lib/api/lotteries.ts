import type { Tables } from '@/types/supabase.db'
import { supabase } from '../supabase.client'

export const getAllLotteries = async (): Promise<Tables<'lotteries'>[] | undefined> => {
  const { data: lotteries, error } = await supabase.from('lotteries').select('*')

  if (error) {
    throw new Error(error.message)
  }

  return lotteries
}

export const getLotteryById = async (id: number): Promise<Tables<'lotteries'> | undefined> => {
  const { data: lottery, error } = await supabase
    .from('lotteries')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return lottery
}
