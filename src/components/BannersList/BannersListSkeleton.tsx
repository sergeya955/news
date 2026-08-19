import NewsBannerSkeleton from "../NewsBanner/NewsBannerSkeleton";
import styles from "./styles.module.css";

const BannersListSkeleton = () => {
  return (
    <ul className={styles.banners} aria-hidden="true">
      {Array.from({ length: 6 }).map((_, index) => (
        <li key={index}>
          <NewsBannerSkeleton />
        </li>
      ))}
    </ul>
  );
};

export default BannersListSkeleton;
