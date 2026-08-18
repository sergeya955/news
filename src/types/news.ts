export interface NewsItem {
  id: string | number
  title?: string
  image?: string
  published?: string
  author?: string
}

export interface NewsApiResponse {
  news?: NewsItem[]
  data?: NewsItem[]
  results?: NewsItem[]
}

export interface NewsQueryParams {
  page_number?: number
  page_size?: number
  category?: string | null
  keywords?: string
}
