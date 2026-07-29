import type { NewsItem as NewsItemType } from "../types/news"
import styles from "./styles.module.css"
import formatTimeAgo from "../helpers/formatTimeAgo"

type NewsItemProps = {
  item: NewsItemType
}

const NewsItem = ({ item }: NewsItemProps) => {
  return (
    <li className={styles.item}>
      <div
        className={styles.wrapper}
        style={item.image ? { backgroundImage: `url(${item.image})` } : undefined}
      />
      <div className={styles.info}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.extra}>
          {item.published ? formatTimeAgo(item.published) : null}
          {item.author ? ` by ${item.author}` : null}
        </p>
      </div>
    </li>
  )
}

export default NewsItem
