import Skeleton from '../components/skeleton/Skeleton'
import styles from './styles.module.css'

const NewsItemSkeleton = () => {
  return (
    <li className={styles.item}>
      <Skeleton className={styles.wrapper} />
      <div className={styles.info}>
        <Skeleton className={styles.titlePlaceholder} />
        <Skeleton className={styles.extraPlaceholder} />
      </div>
    </li>
  )
}

export default NewsItemSkeleton
