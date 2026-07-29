import styles from './styles.module.css'
import type { NewsItem } from '../types/news'
import NewsItemCard from '../NewsItem/NewsItem'

type NewsListProps = {
    news: NewsItem[]
}

const NewsList = ({ news }: NewsListProps) => {
    return (
        <ul className={styles.list}>
            {news.map((item: NewsItem) => {
                return <NewsItemCard key={item.id} item={item}/>
            })}
        </ul>
    )
}

export default NewsList
