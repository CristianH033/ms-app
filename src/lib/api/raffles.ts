import type { Tables } from '@/types/supabase.db'
import { supabase } from '../supabase.client'

export interface RaffleStats extends Tables<'raffle_stats'> {}

export interface RaffleStatsWithPrizes extends Tables<'raffle_stats'> {
  prizes: Tables<'prizes'>[]
}

export interface Raffle extends Omit<Tables<'raffles'>, 'description'> {
  description: string | undefined
}

export interface Prize extends Tables<'prizes'> {}

export interface NewRaffle extends Omit<Raffle, 'id' | 'created_at' | 'updated_at'> {
  number_of_tickets: number
  ticket_price: number
}

export interface NewPrize extends Omit<Prize, 'id' | 'raffle_id' | 'created_at' | 'updated_at'> {}

export interface RaffleWithPrizes extends Raffle {
  prizes: Prize[]
}

export interface NewRaffleWithPrizes extends NewRaffle {
  prizes: NewPrize[]
}

export interface UpdateRaffle extends Omit<Raffle, 'created_at' | 'updated_at'> {}

export interface UpdatePrize extends Omit<Prize, 'id' | 'created_at' | 'updated_at'> {
  id?: number
}

export interface UpdateRaffleWithPrizes extends UpdateRaffle {
  prizes: UpdatePrize[]
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

export const updateRaffle = async (raffle: Tables<'raffles'>) => {
  const { data, error } = await supabase
    .from('raffles')
    .update(raffle)
    .eq('id', raffle.id)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

export const updateRaffleWithPrizes = async (raffleData: UpdateRaffleWithPrizes) => {
  const { data, error: updateRaffleError } = await supabase
    .from('raffles')
    .update({
      draw_id: raffleData.draw_id,
      name: raffleData.name,
      description: raffleData.description,
      image_path: raffleData.image_path,
      thumb_hash: raffleData.thumb_hash
    })
    .eq('id', raffleData.id)
    .select()
    .single()

  if (updateRaffleError) {
    throw updateRaffleError
  }

  const currentPrizes = await getRafflePrizes(raffleData.id)

  const prizesToUpdate = raffleData.prizes.filter((p) => p.id !== undefined)

  const prizesToDelete = currentPrizes.filter(
    (cp) => !prizesToUpdate.map((p) => Number(p.id)).includes(Number(cp.id))
  )

  const prizesToCreate = raffleData.prizes.filter((p) => !prizesToUpdate.includes(p))

  const { error: deletePrizesError } = await supabase
    .from('prizes')
    .delete()
    .in(
      'id',
      prizesToDelete.map((p) => p.id)
    )

  if (deletePrizesError) {
    throw deletePrizesError
  }

  const { error: createPrizesError } = await supabase.from('prizes').insert(
    prizesToCreate.map((p) => {
      return {
        name: p.name,
        raffle_id: raffleData.id,
        prize_value: p.prize_value,
        image_path: p.image_path,
        thumb_hash: p.thumb_hash
      }
    })
  )

  if (createPrizesError) {
    throw createPrizesError
  }

  const { error: updatePrizesError } = await supabase.from('prizes').upsert(prizesToUpdate)

  if (updatePrizesError) {
    throw updatePrizesError
  }

  return data
}

export const deleteRaffleWithAssociatedData = async (id: number) => {
  const { data, error } = await supabase.rpc('delete_raffle_and_associated_data', {
    p_raffle_id: id
  })

  if (error) {
    throw error
  }

  return data
}

export const assignSellerToRaffle = async (
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
