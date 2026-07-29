import type { NewsApiResponse, NewsItem } from '../types/news'
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = import.meta.env.VITE_NEWS_BASE_API_URL;

const getNews = async (): Promise<NewsItem[]> => { 
  try {
    const response = await fetch(
      BASE_URL,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
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
