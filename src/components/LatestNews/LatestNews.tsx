import { getLatestNews } from "../../api/apiNews";
import { useFetch } from "../../helpers/hooks/useFetch";
import type { NewsItem } from "../../types/news";
import BannersList from "../BannersList/BannersList";
import BannersListSkeleton from "../BannersList/BannersListSkeleton";
import styles from "./styles.module.css";

const LatestNews = () => {
  const { data: banners = [], isLoading } = useFetch<NewsItem[]>(
    getLatestNews,
    {
      page_number: 1,
      page_size: 5,
    },
    [],
  );

  return (
    <section className={styles.section}>
      {isLoading ? <BannersListSkeleton /> : <BannersList banners={banners} />}
    </section>
  );
};

export default LatestNews;
