import type { NewsApiResponse, NewsItem } from '../types/news'
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = import.meta.env.VITE_NEWS_BASE_API_URL;

const getNews = async (page_number = 1, page_size = 10): Promise<NewsItem[]> => { 
  try {
    const params = new URLSearchParams({
      page_number: String(page_number),
      page_size: String(page_size),
    })
    const response = await fetch(
      `${BASE_URL}search?${params}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`
        },
      },
    );

    const data: NewsApiResponse = await response.json()

    return data.news ?? data.data ?? data.results ?? []
  } catch (error) {
    console.log(error);
    return []
  }
};

export default getNews
