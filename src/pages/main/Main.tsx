import NewsBanner from "../../components/NewsBanner/NewsBanner";
import NewsBannerSkeleton from "../../components/NewsBanner/NewsBannerSkeleton";
import Categories from "../../components/Categories/Categories";
import Pagintaion from "../../components/Pagination/Pagintaion";
import Search from "../../components/Search/search";
import NewsList from "../../NewsList/NewsList";
import NewsItemSkeleton from "../../NewsItem/NewsItemSkeleton";
import { getCategories, getNews } from "../../api/apiNews";
import { TOTAL_PAGES } from "../../constants/pagination";
import { useDebounce } from "../../helpers/hooks/useDebounce";
import { useFetch } from "../../helpers/hooks/useFetch";
import type { NewsItem } from "../../types/news";
import styles from "./styles.module.css";
import { useFilters } from "../../helpers/hooks/useFilters";

const Main = () => {
  const PAGE_SIZE = 10;

  const { filters, changeFilters } = useFilters({
    page_number: 1,
    page_size: PAGE_SIZE,
    category: "All",
    keywords: "",
  });

  const handleCategorySelect = (category: string) => {
    changeFilters("category", category);
    changeFilters("page_number", 1);
  };

  const handleKeywordsChange = (keywords: string) => {
    changeFilters("keywords", keywords);
    changeFilters("page_number", 1);
  };

  const debouncedKeywords = useDebounce(filters.keywords, 500);

  const { data: news = [], isLoading: newsLoading } = useFetch<NewsItem[]>(
    getNews,
    {
      page_number: filters.page_number,
      page_size: PAGE_SIZE,
      category: filters.category === "All" ? null : filters.category,
      keywords: debouncedKeywords,
    },
    [],
  );

  const { data: dataCategories = [] } = useFetch<string[]>(
    getCategories,
    undefined,
    [],
  );
  const categories = ["All", ...dataCategories.filter((category) => category !== "All")];

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
    <main className={styles.main}>
      {categories.length ? (
        <Categories
          categories={categories}
          selectedCategory={filters.category}
          setSelectedCategory={handleCategorySelect}
        />
      ) : null}

      <Search keywords={filters.keywords} setKeywords={handleKeywordsChange} />

      {newsLoading ? (
        <NewsBannerSkeleton />
      ) : news.length ? (
        <NewsBanner item={news[0]} />
      ) : null}

      <Pagintaion
        totalPages={TOTAL_PAGES}
        currentPage={filters.page_number}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        handlePageClick={handlePageClick}
      />

      {newsLoading ? (
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
    </main>
  );
};

export default Main;
