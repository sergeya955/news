import styles from './styles.module.css'

type SkeletonProps = {
  className?: string
}

const Skeleton = ({ className = '' }: SkeletonProps) => {
  return <div className={`${styles.skeleton} ${className}`.trim()} aria-hidden="true" />
}

export default Skeleton
