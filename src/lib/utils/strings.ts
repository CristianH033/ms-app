export const avatarLetters = (name: string) => {
  // max 2 letters
  return name
    .split(' ')
    .map((n) => n.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export const zeroPad = (num: number, places: number) => String(num).padStart(places, '0')
