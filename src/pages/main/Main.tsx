import { useEffect, useState } from 'react'
import NewsBanner from '../../components/NewsBanner/NewsBanner'
import styles from './styles.module.css'
import getNews from '../../api/apiNews'
import type { NewsItem } from '../../types/news'
import NewsList from '../../NewsList/NewsList'

const Main = () => {
    const [news, setNews] = useState<NewsItem[]>([])

    useEffect(() => {
        const fetchNews = async () => {
            try{
                const response = await getNews()
                console.log(response);
                
                setNews(Array.isArray(response) ? response : [])
                
            }catch (error){
                console.log(error);
                
            }
        }

        fetchNews()

    }, [])

    console.log(news);
    

    return (
        <main className={styles.main}>
            {news.length ? <NewsBanner item={news[0]}/> : null}

            <NewsList 
            news={news}
            />
        </main>
    )
}

export default Main
