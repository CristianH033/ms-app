import type { Tables } from '@/types/supabase.db'
import { supabase } from '../supabase.client'
import type { QueryData } from '@supabase/supabase-js'

// Queries
const SellerWithTicketsQuery = supabase.from('sellers').select(`*, tickets(*)`)
const sellersWithTicketsCountQuery = supabase
  .from('sellers_with_tickets_count')
  .select('*')
  .order('name', { ascending: true })
const sellersWithTicketsCountByRaffleQuery = supabase
  .from('sellers_with_tickets_count_by_raffle')
  .select('*')

// Types for queries
export type SellersWithTickets = QueryData<typeof SellerWithTicketsQuery>
export type SellersWithTicketsCount = QueryData<typeof sellersWithTicketsCountQuery>
export type SellersWithTicketsCountByRaffle = QueryData<typeof sellersWithTicketsCountByRaffleQuery>

export const getAllSellers = async (): Promise<Tables<'sellers'>[] | undefined> => {
  const { data: sellers, error } = await supabase.from('sellers').select('*')

  if (error) {
    throw new Error(error.message)
  }

  return sellers
}

export const getAllSellersWithTickets = async (): Promise<SellersWithTickets> => {
  const { data: sellers, error } = await SellerWithTicketsQuery
  if (error) {
    throw new Error(error.message)
  }

  return sellers
}

export const getAllSellersWithTicketsCount = async (): Promise<SellersWithTicketsCount> => {
  const { data: sellers, error } = await sellersWithTicketsCountQuery
  if (error) {
    throw new Error(error.message)
  }

  return sellers
}

export const getAllSellersWithTicketsCountByRaffle =
  async (): Promise<SellersWithTicketsCountByRaffle> => {
    const { data: sellers, error } = await sellersWithTicketsCountByRaffleQuery

    if (error) {
      throw new Error(error.message)
    }

    return sellers
  }

export const getAllSellersWithTicketsCountByRaffleId = async (
  raffleId: number
): Promise<SellersWithTicketsCountByRaffle> => {
  const { data: sellers, error } = await sellersWithTicketsCountByRaffleQuery.eq(
    'raffle_id',
    raffleId
  )

  if (error) {
    throw new Error(error.message)
  }

  return sellers
}

export const getSellerById = async (id: number): Promise<Tables<'sellers'> | undefined> => {
  const { data: seller, error } = await supabase.from('sellers').select('*').eq('id', id).single()

  if (error) {
    throw new Error(error.message)
  }

  return seller
}

export const createSeller = async (data: {
  name: string
  email: string | null
  phone: string
  avatar_url: string | null
  thumb_hash: string | null
}): Promise<Tables<'sellers'> | undefined> => {
  const { data: seller, error } = await supabase
    .from('sellers')
    .insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      avatar_url: data.avatar_url,
      thumb_hash: data.thumb_hash
    })
    .single()

  if (error) {
    throw error
  }

  return seller
}
