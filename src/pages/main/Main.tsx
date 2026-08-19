import { getNews } from "../../api/apiNews";
import { useDebounce } from "../../helpers/hooks/useDebounce";
import { useFetch } from "../../helpers/hooks/useFetch";
import type { NewsItem } from "../../types/news";
import styles from "./styles.module.css";
import { useFilters } from "../../helpers/hooks/useFilters";
import LatestNews from "../../components/LatestNews/LatestNews";
import NewsByFilters from "../../components/NewsByFilters/NewsByFilters";

const Main = () => {
  const PAGE_SIZE = 10;

  const { filters, changeFilters } = useFilters({
    page_number: 1,
    page_size: PAGE_SIZE,
    category: "All",
    keywords: "",
  });

  const debouncedKeywords = useDebounce(filters.keywords, 500);

  const { data: data = [], isLoading: isLoading } = useFetch<NewsItem[]>(
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
      <LatestNews banners={data} />

      <NewsByFilters news={data} isLoading={isLoading} filters={filters} changeFilters={changeFilters} />
    </main>
  );
};

export default Main;
