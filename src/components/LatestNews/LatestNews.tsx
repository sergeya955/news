import type { NewsItem } from '../../types/news'
import BannersList from '../BannersList/BannersList'
import styles from './styles.module.css'

type LatetNewsProps = {
    banners: NewsItem[]
}

const LatestNews = ({ banners }: LatetNewsProps) => {
    return (
        <section className={styles.section}>
            <BannersList banners={banners}/>
        </section>
    )
}

export default LatestNews
