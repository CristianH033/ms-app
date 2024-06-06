import { useEventBus, type EventBusKey } from '@vueuse/core'

export const setGlobalBusKey: EventBusKey<{ name: string }> = Symbol('symbol-key')

export const globalBus = useEventBus(setGlobalBusKey)
