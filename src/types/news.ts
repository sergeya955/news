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
