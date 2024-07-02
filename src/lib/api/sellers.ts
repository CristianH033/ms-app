import type { Tables } from '@/types/supabase.db'
import { supabase } from '../supabase.client'
import type { QueryData } from '@supabase/supabase-js'

// Queries
const SellerWithTicketsQuery = supabase.from('sellers').select(`*, tickets(*)`)
const sellersWithTicketsCountQuery = supabase.from('sellers_with_tickets_count').select('*')

// Types for queries
export type SellersWithTickets = QueryData<typeof SellerWithTicketsQuery>
export type SellersWithTicketsCount = QueryData<typeof sellersWithTicketsCountQuery>

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

export const getSellerById = async (id: number): Promise<Tables<'sellers'> | undefined> => {
  const { data: seller, error } = await supabase.from('sellers').select('*').eq('id', id).single()

  if (error) {
    throw new Error(error.message)
  }

  return seller
}
