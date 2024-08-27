import { rgbaToThumbHash, thumbHashToDataURL } from 'thumbhash'
import { urlToData } from './fetch'

export const urlToBinaryThumbHash = async (url: string) => {
  const { blob, fileName } = await urlToData(url)

  return fileToBinaryThumbHash(new File([blob], fileName, { type: blob.type }))
}

export const fileToBinaryThumbHash = async (file: File) => {
  const image = new Image()
  image.src = URL.createObjectURL(file)
  await new Promise((resolve) => {
    image.onload = resolve
  })

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  const scale = 100 / Math.max(image.width, image.height)
  canvas.width = Math.round(image.width * scale) || 100
  canvas.height = Math.round(image.height * scale) || 100
  context?.drawImage(image, 0, 0, canvas.width, canvas.height)
  const pixels = context?.getImageData(0, 0, canvas.width, canvas.height)
  const binaryThumbHash = rgbaToThumbHash(pixels!.width, pixels!.height, pixels!.data)

  URL.revokeObjectURL(image.src)
  canvas.remove()

  return binaryThumbHash
}

export const binaryToBase64 = (binary: Uint8Array) => btoa(String.fromCharCode(...binary))

export const base64ToBinary = (base64: string) =>
  new Uint8Array(
    atob(base64)
      .split('')
      .map((x) => x.charCodeAt(0))
  )

export const thumbHashFromBase64 = (thumbHash: string): Uint8Array => {
  const thumbHashFromBase64 = base64ToBinary(thumbHash)
  return thumbHashFromBase64
}

export const urlToBase64BinaryThumbHash = async (url: string) => {
  const binaryThumbHash = await urlToBinaryThumbHash(url)
  const thumbHashToBase64 = await binaryToBase64(binaryThumbHash)

  return thumbHashToBase64
}

export const fileToBase64ThumbHash = async (file: File) => {
  const binaryThumbHash = await fileToBinaryThumbHash(file)
  const thumbHashToBase64 = await binaryToBase64(binaryThumbHash)

  return thumbHashToBase64
}

export const binaryThumbHashToDataURL = (binaryThumbHash: Uint8Array) => {
  return thumbHashToDataURL(binaryThumbHash)
}

export const base64ThumbHashToDataURL = (thumbHash: string): string => {
  return thumbHashToDataURL(thumbHashFromBase64(thumbHash))
}

export const applyOpacityToImage = async (
  base64Image: string,
  opacity: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    opacity = Math.max(0, Math.min(1, opacity))

    if (opacity === 1) {
      resolve(base64Image)
      return
    }

    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        reject(new Error('No se pudo crear el contexto del canvas'))
        return
      }

      canvas.width = img.width
      canvas.height = img.height

      ctx.drawImage(img, 0, 0)

      ctx.globalAlpha = opacity
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const modifiedBase64 = canvas.toDataURL('image/png')
      resolve(modifiedBase64)
    }

    img.onerror = () => {
      reject(new Error('No se pudo cargar la imagen'))
    }

    img.src = base64Image
  })
}
