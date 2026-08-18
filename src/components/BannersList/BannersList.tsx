import type { NewsItem } from '../../types/news'
import NewsBanner from '../NewsBanner/NewsBanner'
import styles from './styles.module.css'

type BannersProps = {
    banners: NewsItem[]
}

const BannersList = ({ banners }: BannersProps) => {
    return (
        <ul className={styles.banners}>
            {banners?.map((banner) => {
                return (
                    <NewsBanner key={banner.id} item={banner}/>
                )
            })}
        </ul>
    )
}

export default BannersList
