type fetchPriority = 'high' | 'low' | 'auto'

interface QueryParams {
  filter?: Record<string, any>
  sort?: string | string[]
  order?: 'asc' | 'desc'
  page?: {
    number: number
    limit?: number
  }
  search?: string
  brokenratio?: number
  thumbhashratio?: number
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
  private baseURL: string

  constructor(baseURL: string = 'http://localhost:3000') {
    this.baseURL = baseURL
  }

  private async fetchWithPriority(
    url: string,
    options: RequestInit & { priority?: 'high' | 'low' | 'auto' }
  ): Promise<Response> {
    const { priority, ...fetchOptions } = options
    if (priority) {
      ;(fetchOptions as any).priority = priority
    }
    const response = await fetch(url, fetchOptions)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response
  }

  async index(params: QueryParams = {}, priority: fetchPriority = 'auto'): Promise<Image[]> {
    const queryParams = this.buildQueryParams(params)
    const response = await this.fetchWithPriority(`${this.baseURL}/images${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json'
      },
      priority: priority
    })
    return response.json()
  }

  async show(id: string, priority: fetchPriority = 'auto'): Promise<Image> {
    const response = await this.fetchWithPriority(`${this.baseURL}/images/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json'
      },
      priority
    })
    return response.json()
  }

  async create(data: any, priority: fetchPriority = 'auto'): Promise<any> {
    const response = await this.fetchWithPriority(`${this.baseURL}/images`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json'
      },
      body: JSON.stringify({ data }),
      priority
    })
    return response.json()
  }

  async update(id: string, data: any, priority: fetchPriority = 'auto'): Promise<any> {
    const response = await this.fetchWithPriority(`${this.baseURL}/images/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json'
      },
      body: JSON.stringify({ data }),
      priority
    })
    return response.json()
  }

  async delete(id: string, priority: fetchPriority = 'auto'): Promise<any> {
    const response = await this.fetchWithPriority(`${this.baseURL}/images/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json'
      },
      priority
    })
    return response.json()
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

    if (params.brokenratio) {
      parts.push(`_brokenratio=${encodeURIComponent(params.brokenratio)}`)
    }

    if (params.thumbhashratio) {
      parts.push(`_thumbhashratio=${encodeURIComponent(params.thumbhashratio)}`)
    }

    return parts.length > 0 ? `?${parts.join('&')}` : ''
  }
}

export default ImageApi
