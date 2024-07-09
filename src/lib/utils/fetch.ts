export const urlToData = async (url: string): Promise<{ blob: Blob; fileName: string }> => {
  const response = await fetch(url, { method: 'GET', mode: 'cors' })
  const contentDisposition = response.headers.get('Content-Disposition')
  let fileName = 'download' // Nombre por defecto

  if (contentDisposition) {
    const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/)
    if (fileNameMatch) {
      fileName = fileNameMatch[1]
    }
  }

  return { blob: await response.blob(), fileName }
}

export const blobToFile = async (blob: Blob, fileName: string): Promise<File> => {
  return new File([blob], fileName, { type: blob.type })
}

export const blobToBase64 = async (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('Failed to convert to base64'))
      }
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

export const urlToBase64 = async (url: string): Promise<string> => {
  try {
    const { blob } = await urlToData(url)
    // Crear un FileReader para leer el Blob
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result)
        } else {
          reject(new Error('Failed to convert to base64'))
        }
      }
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch (error) {
    console.error('Error converting URL to base64:', error)
    throw error
  }
}
