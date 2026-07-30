import { useEffect, useState } from 'react'
import NewsBanner from '../../components/NewsBanner/NewsBanner'
import styles from './styles.module.css'
import getNews from '../../api/apiNews'
import type { NewsItem } from '../../types/news'
import NewsList from '../../NewsList/NewsList'
import NewsBannerSkeleton from '../../components/NewsBanner/NewsBannerSkeleton'
import NewsItemSkeleton from '../../NewsItem/NewsItemSkeleton'

const Main = () => {
    const [news, setNews] = useState<NewsItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchNews = async () => {
            try{
                const response = await getNews()
                console.log(response);
                
                setNews(Array.isArray(response) ? response : [])
                
            }catch (error){
                console.log(error);
                
            } finally {
                setLoading(false)
            }
        }

        fetchNews()

    }, [])    

    return (
        <main className={styles.main}>
            {loading ? <NewsBannerSkeleton /> : news.length ? <NewsBanner item={news[0]}/> : null}

            {loading ? (
                <ul className={styles.skeletonList}>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <NewsItemSkeleton key={index} />
                    ))}
                </ul>
            ) : (
                <NewsList news={news} />
            )}
        </main>
    )
}

export default Main
