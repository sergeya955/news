import { getNews } from "../../api/apiNews";
import LatestNews from "../../components/LatestNews/LatestNews";
import NewsByFilters from "../../components/NewsByFilters/NewsByFilters";
import { useDebounce } from "../../helpers/hooks/useDebounce";
import { useFetch } from "../../helpers/hooks/useFetch";
import { useFilters } from "../../helpers/hooks/useFilters";
import type { NewsItem } from "../../types/news";
import styles from "./styles.module.css";

const Main = () => {
  const PAGE_SIZE = 10;

  const { filters, changeFilters } = useFilters({
    page_number: 1,
    page_size: PAGE_SIZE,
    category: "All",
    keywords: "",
  });

  const debouncedKeywords = useDebounce(filters.keywords, 500);

  const { data: news = [], isLoading } = useFetch<NewsItem[]>(
    getNews,
    {
      page_number: filters.page_number,
      page_size: PAGE_SIZE,
      category: filters.category === "All" ? null : filters.category,
      keywords: debouncedKeywords,
    },
    [],
  );

  return (
    <main className={styles.main}>
      <LatestNews />

      <NewsByFilters
        filters={filters}
        changeFilters={changeFilters}
        news={news}
        isLoading={isLoading}
      />
    </main>
  );
};

export default Main;
