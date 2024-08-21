import type { Tables } from '@/types/supabase.db'
import { supabase } from '../supabase.client'

export interface RaffleStats extends Tables<'raffle_stats'> {}

export interface RaffleStatsWithPrizes extends Tables<'raffle_stats'> {
  prizes: Tables<'prizes'>[]
}

export interface NewRaffle {
  draw_id: number
  name: string
  description?: string | undefined
  number_of_tickets: number
  ticket_price: number
  image_path: string
  thumb_hash: string | null
}

export interface NewPrize {
  name: string
  prize_value: number
  image_path: string | null
  thumb_hash: string | null
}

export interface NewRaffleWithPrizes extends NewRaffle {
  prizes: NewPrize[]
}

interface RaffleInsertResult {
  raffle_id?: number
  prizes_count?: number
  error?: string
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

export const getRafflesStats = async (): Promise<RaffleStats[]> => {
  const { data: raffles, error } = await supabase
    .from('raffle_stats')
    .select('*')
    .order('raffle_id', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return raffles
}

export const getRafflesStatsWithPrizes = async (): Promise<RaffleStatsWithPrizes[]> => {
  const { data: raffles, error } = await supabase
    .from('raffle_stats')
    .select('*, prizes(*)')
    .order('raffle_id', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return raffles
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

export const createNewRaffleWithPrizes = async (
  raffleData: NewRaffleWithPrizes
): Promise<RaffleInsertResult | null> => {
  const { prizes, ...raffle } = raffleData

  const jsonRaffle = JSON.parse(JSON.stringify(raffle))
  const jsonPrizes = JSON.parse(JSON.stringify(prizes))

  const { data, error } = (await supabase.rpc('create_raffle_with_prizes', {
    raffle_data: jsonRaffle,
    prizes_data: jsonPrizes
  })) as { data: RaffleInsertResult | null; error: Error | null }

  console.log({ data, error })

  if (error) throw error

  return data
}

export const assignSelletToRaffle = async (
  raffleId: number,
  sellerId: number,
  ticket_price: number
) => {
  const { data, error } = await supabase
    .from('raffles_sellers')
    .insert({
      raffle_id: raffleId,
      seller_id: sellerId,
      ticket_price: ticket_price
    })
    .select()

  if (error) {
    throw error
  }

  return data
}
