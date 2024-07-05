import { format, parse } from '@formkit/tempo'

export const formatDate = (date: string | undefined, formatString: string = 'YYYY/MM/DD') => {
  if (!date) return

  return format(parse(date, 'YYYY-MM-DDTHH:mm:ss'), formatString)
}
