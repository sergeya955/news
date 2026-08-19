import type { ChangeFilters, Filters } from "../../helpers/hooks/useFilters";
import { TOTAL_PAGES } from "../../constants/pagination";
import type { NewsItem } from "../../types/news";
import Pagintaion from "../Pagination/Pagintaion";
import NewsList from "../../NewsList/NewsList";
import NewsItemSkeleton from "../../NewsItem/NewsItemSkeleton";
import styles from "./styles.module.css";
import NewsFilters from "../NewsFilters/NewsFilters";

type NewsByFiltersProps = {
  filters: Filters;
  changeFilters: ChangeFilters<Filters>;
  news: NewsItem[];
  isLoading: boolean;
};

const NewsByFilters = ({
  filters,
  changeFilters,
  isLoading,
  news,
}: NewsByFiltersProps) => {

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

        <NewsFilters filters={filters} changeFilters={changeFilters}/>

      <Pagintaion
        totalPages={TOTAL_PAGES}
        currentPage={filters.page_number}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        handlePageClick={handlePageClick}
      />

      {isLoading ? (
        <ul className={styles.skeletonList}>
          {Array.from({ length: 5 }).map((_, index) => (
            <NewsItemSkeleton key={index} />
          ))}
        </ul>
      ) : (
        <NewsList news={news} />
      )}

      <Pagintaion
        totalPages={TOTAL_PAGES}
        currentPage={filters.page_number}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        handlePageClick={handlePageClick}
      />
    </section>
  );
};

export default NewsByFilters;
