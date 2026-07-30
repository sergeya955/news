import Skeleton from '../skeleton/Skeleton'
import styles from './styles.module.css'

const NewsBannerSkeleton = () => {
  return (
    <div className={styles.banner}>
      <Skeleton className={styles.imagePlaceholder} />
      <Skeleton className={styles.titlePlaceholder} />
      <Skeleton className={styles.extraPlaceholder} />
    </div>
  )
}

export default NewsBannerSkeleton
