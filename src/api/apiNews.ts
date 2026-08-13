import type { NewsApiResponse, NewsItem } from '../types/news'

const API_KEY = import.meta.env.VITE_NEWS_API_KEY
const BASE_URL = import.meta.env.VITE_NEWS_BASE_API_URL

const getApiUrl = (endpoint: string): string => {
  const url = new URL(endpoint, BASE_URL)

  return url.toString()
}

const getNews = async (pageNumber = 1, pageSize = 10, category?: string | null, keywords?: string): Promise<NewsItem[]> => {
  try {
    if (!API_KEY || !BASE_URL) {
      console.error("News API env variables are missing")
      return []
    }

    const params = new URLSearchParams({
      page_number: String(pageNumber),
      page_size: String(pageSize),
    })

    if (category) {
      params.set("category", category)
    }

    if (keywords) {
      params.set("keywords", keywords)
    }

    const response = await fetch(`${getApiUrl("search")}?${params}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    })

    const data: NewsApiResponse = await response.json()

    return data.news ?? data.data ?? data.results ?? []
  } catch (error) {
    console.log(error)
    return []
  }
}

const getCategories = async (): Promise<string[]> => {
  try {
    if (!API_KEY || !BASE_URL) {
      console.error("News API env variables are missing")
      return []
    }

    const response = await fetch(getApiUrl("available/categories/"), {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    })

    const data: unknown = await response.json()

    if (Array.isArray(data)) {
      return data.filter((item): item is string => typeof item === 'string')
    }

    if (data && typeof data === 'object' && 'categories' in data) {
      const categories = (data as { categories?: unknown }).categories

      if (Array.isArray(categories)) {
        return categories.filter((item): item is string => typeof item === 'string')
      }
    }

    return []
  } catch (error) {
    console.log(error)
    return []
  }
}

export { getCategories, getNews }
