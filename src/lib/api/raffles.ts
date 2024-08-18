import type { Tables } from '@/types/supabase.db'
import { supabase } from '../supabase.client'

export interface NewRaffleWithPrizes
  extends Omit<Tables<'raffles'>, 'id' | 'created_at' | 'updated_at'> {
  prizes: Omit<Tables<'prizes'>, 'id' | 'raffle_id' | 'created_at' | 'updated_at'>[]
  number_of_tickets: number
  ticket_price: number
}

interface RaffleInsertResult {
  raffle_id?: number
  prizes_count?: number
  error?: string
}

// interface RpcParams {
//   raffle_data: Omit<NewRaffleWithPrizes, 'prizes'>
//   prizes_data: NewRaffleWithPrizes['prizes']
// }

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

export const createNewRaffleWithPrizes = async (
  raffleData: NewRaffleWithPrizes
): Promise<RaffleInsertResult | null> => {
  const { prizes, ...raffleDetails } = raffleData

  console.log(raffleDetails)

  console.log(prizes)

  const { data, error } = (await supabase.rpc('create_raffle_with_prizes', {
    raffle_data: raffleDetails,
    prizes_data: prizes
    //})) as QueryData<RaffleInsertResult>
  })) as { data: RaffleInsertResult | null; error: Error | null }

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
