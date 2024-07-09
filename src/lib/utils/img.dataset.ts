import data from './data.json'

interface ImgDataset {
  src: string
  thumbhash?: string
  width?: number
  height?: number
  ratio?: 'square' | 'landscape' | 'portrait'
}

export const imgDataset: ImgDataset[] = data as ImgDataset[]

export const randomDataSetValues = () => {
  return imgDataset
  // return imgDataset.map((img) => {
  //   const withoutThumbHash = Math.random() > 0.9
  //   const withBrokenURL = Math.random() > 0.9

  //   return {
  //     ...img,
  //     thumbhash: withoutThumbHash ? undefined : img.thumbhash,
  //     src: withBrokenURL ? 'https://via.assets.so/x.png' : img.src
  //   }
  // })
}
