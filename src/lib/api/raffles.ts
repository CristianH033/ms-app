import type { Tables } from '@/types/supabase.db'
import { supabase } from '../supabase.client'

export interface NewRaffleWithPrizes extends Omit<Tables<'raffles'>, 'id'> {
  prizes: Omit<Tables<'prizes'>, 'id'>[]
}

export const getAllRaffles = async (): Promise<Tables<'raffles'>[]> => {
  const { data: raffles, error } = await supabase.from('raffles').select('*')

  if (error) {
    throw new Error(error.message)
  }

  return raffles
}

export const getAllRafflesWithPrizes = async () => {
  const { data: raffles, error } = await supabase
    .from('raffles')
    .select('*, prizes(*)')
    .order('id', { ascending: true })

  if (error) {
    throw new Error(error.message)
  } else {
    return raffles
  }
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

export const getRaffleById = async (id: number): Promise<Tables<'raffles'> | undefined> => {
  const { data: raffle, error } = await supabase.from('raffles').select('*').eq('id', id).single()

  if (error) {
    throw new Error(error.message)
  }

  return raffle
}

export const createNewRaffle = async (raffle: NewRaffleWithPrizes) => {
  const { data, error } = await supabase.from('raffles').insert(raffle)

  if (error) {
    throw new Error(error.message)
  }

  return data
}
