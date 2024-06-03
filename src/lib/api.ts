import type { Tables } from '@/types/supabase.db'
import { supabase } from './supabase.client'

export const getAllTickets = async (): Promise<Tables<'tickets'>[]> => {
  const { data: tickets, error } = await supabase.from('tickets').select('*')

  if (error) {
    throw new Error(error.message)
  }

  return tickets
}

export const getTicketById = async (id: number): Promise<Tables<'tickets'> | undefined> => {
  const { data: ticket, error } = await supabase.from('tickets').select('*').eq('id', id).single()

  if (error) {
    throw new Error(error.message)
  }

  return ticket
}

export const getAllSellers = async (): Promise<Tables<'sellers'>[] | undefined> => {
  const { data: sellers, error } = await supabase.from('sellers').select('*')

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

export const getAllRaffles = async (): Promise<Tables<'raffles'>[]> => {
  const { data: raffles, error } = await supabase.from('raffles').select('*')

  if (error) {
    throw new Error(error.message)
  }

  return raffles
}

export const getRaffleById = async (id: number): Promise<Tables<'raffles'> | undefined> => {
  const { data: raffle, error } = await supabase.from('raffles').select('*').eq('id', id).single()

  if (error) {
    throw new Error(error.message)
  }

  return raffle
}

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

export const getAllTicketsByRaffle = async (
  raffleId: number
): Promise<Tables<'tickets'>[] | undefined> => {
  const { data: tickets, error } = await supabase
    .from('tickets')
    .select('*')
    .eq('raffle_id', raffleId)
    .order('id', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return tickets
}

export const getAllDraws = async (): Promise<Tables<'draws'>[] | undefined> => {
  const { data: draws, error } = await supabase.from('draws').select('*')

  if (error) {
    throw new Error(error.message)
  }

  return draws
}

export const getDrawById = async (id: number): Promise<Tables<'draws'> | undefined> => {
  const { data: draw, error } = await supabase.from('draws').select('*').eq('id', id).single()

  if (error) {
    throw new Error(error.message)
  }

  return draw
}
