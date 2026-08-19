import { useFilters } from "../../helpers/hooks/useFilters";
import { TOTAL_PAGES } from "../../constants/pagination";
import type { NewsItem } from "../../types/news";
import NewsList from "../../NewsList/NewsList";
import NewsItemSkeleton from "../../NewsItem/NewsItemSkeleton";
import styles from "./styles.module.css";
import NewsFilters from "../NewsFilters/NewsFilters";
import { useFetch } from "../../helpers/hooks/useFetch";
import { getNews } from "../../api/apiNews";
import { useDebounce } from "../../helpers/hooks/useDebounce";
import PaginationWrapper from "../PaginationWrapper/PaginationWrapper";

const NewsByFilters = () => {
  const PAGE_SIZE = 10;

  const { filters, changeFilters } = useFilters({
    page_number: 1,
    page_size: PAGE_SIZE,
    category: "All",
    keywords: "",
  });

  const debouncedKeywords = useDebounce(filters.keywords, 500);

  const { data: news = [], isLoading: isLoading } = useFetch<NewsItem[]>(
    getNews,
    {
      page_number: filters.page_number,
      page_size: PAGE_SIZE,
      category: filters.category === "All" ? null : filters.category,
      keywords: debouncedKeywords,
    },
    [],
  );

  const handleNextPage = () => {
    if (filters.page_number < TOTAL_PAGES) {
      changeFilters("page_number", filters.page_number + 1);
    }
  };

  const handlePrevPage = () => {
    if (filters.page_number > 1) {
      changeFilters("page_number", filters.page_number - 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    changeFilters("page_number", pageNumber);
  };

  return (
    <section className={styles.section}>
      <NewsFilters filters={filters} changeFilters={changeFilters} />

      <PaginationWrapper
        totalPages={TOTAL_PAGES}
        currentPage={filters.page_number}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        handlePageClick={handlePageClick}
      >
        {isLoading ? (
          <ul className={styles.skeletonList}>
            {Array.from({ length: 5 }).map((_, index) => (
              <NewsItemSkeleton key={index} />
            ))}
          </ul>
        ) : (
          <NewsList news={news} />
        )}
      </PaginationWrapper>
    </section>
  );
};

export default NewsByFilters;
