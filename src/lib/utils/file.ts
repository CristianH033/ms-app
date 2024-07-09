export const fileDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = URL.createObjectURL(file)
    image.onload = () => {
      resolve({ width: image.width, height: image.height })
    }
    image.onerror = (error) => {
      reject(error)
    }
  })
}
