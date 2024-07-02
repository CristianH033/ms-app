import sharp from 'sharp'
import { rgbaToThumbHash, thumbHashToDataURL } from 'thumbhash'
import axios from 'axios'
import { writeFileSync } from 'fs'

const images = [
  'https://placehold.co/600x400/red/white',
  'https://placehold.co/600x400/blue/white',
  'https://placehold.co/600x400/green/white',
  'https://placehold.co/600x400/black/white',
  'https://placehold.co/600x400/black/white',
  'https://placehold.co/600x400/orange/white',
  'https://placehold.co/600x400/orange/white',
  'https://placehold.co/600x400/orange/white',
  'https://placehold.co/600x400/orange/white',
  'https://i.pravatar.cc/300?u=comprador1@example.com',
  'https://i.pravatar.cc/300?u=comprador2@example.com',
  'https://i.pravatar.cc/300?u=vendedor1@example.com',
  'https://i.pravatar.cc/300?u=vendedor2@example.com'
]

const urlToBinaryThumbHash = async (url: string) => {
  const input = (await axios({ url: url, responseType: 'arraybuffer' })).data as Buffer
  return new Promise<Uint8Array>((resolve, reject) => {
    const image = sharp(input).resize(100, 100, { fit: 'inside' })
    image
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })
      .then(({ data, info }) => {
        const binaryThumbHash = rgbaToThumbHash(info.width, info.height, data)
        resolve(binaryThumbHash)
      })
      .catch((error) => reject(error))
      .finally(() => image?.destroy())
  })
}

const thumbHashes = await Promise.all(images.map(async (url) => await urlToBinaryThumbHash(url)))

thumbHashes.forEach((hash, index) => {
  const dataURL = thumbHashToDataURL(hash)

  // create file from dataURL
  const file = Buffer.from(dataURL.split(',')[1], 'base64')

  // write file to disk
  const filename = `thumbhash-${index}.png`
  const filePath = `./src/thumbs/${filename}`

  writeFileSync(filePath, file)
})

// images.forEach((url) =>
//   urlToBinaryThumbHash(url)
//     .then((hash) => {
//       console.log('Thumbhash:', hash)
//       // print size in bytes
//       console.log('Size:', hash.byteLength, 'bytes')
//     })
//     .catch((error) => console.error('Error:', error))
// )
