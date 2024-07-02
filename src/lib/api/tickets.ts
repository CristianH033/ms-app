import type { Tables } from '@/types/supabase.db'
import { supabase } from '../supabase.client'

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
