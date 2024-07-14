import axios, { type AxiosInstance, type AxiosResponse } from 'axios'

interface QueryParams {
  filter?: Record<string, any>
  sort?: string | string[]
  order?: 'asc' | 'desc'
  page?: {
    number: number
    limit?: number
  }
  search?: string
}

interface Image {
  id: string
  src: string
  original_src: string
  category: string
  thumbhash?: string
  width?: number
  height?: number
  ratio?: 'square' | 'landscape' | 'portrait'
}

class ImageApi {
  private api: AxiosInstance

  constructor(baseURL: string = 'http://localhost:3000') {
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json'
      }
    })
  }

  // Método index con opciones de filtrado, ordenación, paginación y búsqueda
  async index(params: QueryParams = {}): Promise<AxiosResponse<Image[], any>> {
    const queryParams = this.buildQueryParams(params)
    return this.api.get(`/images${queryParams}`)
  }

  // Método show
  async show(id: string): Promise<AxiosResponse<Image, any>> {
    return this.api.get(`/images/${id}`)
  }

  // Método create
  async create(data: any): Promise<any> {
    return this.api.post('/images', { data })
  }

  // Método update
  async update(id: string, data: any): Promise<any> {
    return this.api.patch(`/images/${id}`, { data })
  }

  // Método delete
  async delete(id: string): Promise<any> {
    return this.api.delete(`/images/${id}`)
  }

  private buildQueryParams(params: QueryParams): string {
    const parts: string[] = []

    if (params.filter) {
      parts.push(
        Object.entries(params.filter)
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
          .join('&')
      )
    }

    if (params.sort) {
      const sort = Array.isArray(params.sort) ? params.sort.join(',') : params.sort
      parts.push(`_sort=${encodeURIComponent(sort)}`)
    }

    if (params.order) {
      parts.push(`_order=${encodeURIComponent(params.order)}`)
    }

    if (params.page) {
      parts.push(`_page=${params.page.number}`)

      if (params.page.limit) {
        parts.push(`_limit=${params.page.limit}`)
      }
    }

    if (params.search) {
      parts.push(`q=${encodeURIComponent(params.search)}`)
    }

    return parts.length > 0 ? `?${parts.join('&')}` : ''
  }
}

export default ImageApi
