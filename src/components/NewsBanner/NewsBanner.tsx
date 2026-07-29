import styles from './styles.module.css'
import formatTimeAgo from '../../helpers/formatTimeAgo'
import Image from '../image/Image'
import type { NewsItem } from '../../types/news'

type NewsBannerProps = {
    item: NewsItem
}

const NewsBanner = ({ item }: NewsBannerProps) => {
    return (
        <div className={styles.banner}>
            <Image image={item?.image} />
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.extra}>
                {item.published ? formatTimeAgo(item.published) : null} by {item.published}
            </p>
        </div>
    )
}

export default NewsBanner
