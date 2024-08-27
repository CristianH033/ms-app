import mitt from 'mitt'

type EventBus = {
  createRaffle?: string
  updateRaffle?: string
  deleteRaffle?: string
}

export const eventBus = mitt<EventBus>()
