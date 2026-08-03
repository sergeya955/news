import { useEffect, useState } from 'react'
import NewsBanner from '../../components/NewsBanner/NewsBanner'
import styles from './styles.module.css'
import getNews from '../../api/apiNews'
import type { NewsItem } from '../../types/news'
import NewsList from '../../NewsList/NewsList'
import NewsBannerSkeleton from '../../components/NewsBanner/NewsBannerSkeleton'
import NewsItemSkeleton from '../../NewsItem/NewsItemSkeleton'
import Pagintaion from '../../components/Pagination/Pagintaion'

const Main = () => {
    const [news, setNews] = useState<NewsItem[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const totalPages = 10;
    const pageSize = 10;

    const fetchNews = async (currentPage: number) => {
            setLoading(true)
            try{
                const response = await getNews(currentPage, pageSize)
                console.log(response);
                
                setNews(Array.isArray(response) ? response : [])
                
            }catch (error){
                console.log(error);
                
            } finally {
                setLoading(false)
            }
        }

    useEffect(() => {

        fetchNews(currentPage)

    }, [currentPage]) 
    
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    return (
        <main className={styles.main}>
            {loading ? <NewsBannerSkeleton /> : news.length ? <NewsBanner item={news[0]}/> : null}

        <Pagintaion 
        totalPages={totalPages}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        handlePageClick={handlePageClick}
        currentPage={currentPage}
        />

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
