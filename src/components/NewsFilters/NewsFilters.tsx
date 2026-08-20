import { getCategories } from "../../api/apiNews";
import { useFetch } from "../../helpers/hooks/useFetch";
import type { ChangeFilters, Filters } from "../../helpers/hooks/useFilters";
import Categories from "../Categories/Categories";
import Search from "../Search/search";
import Slider from "../Slider/Slider";
import styles from "./styles.module.css";

type NewsFiltersProps = {
  filters: Filters;
  changeFilters: ChangeFilters<Filters>;
};

const NewsFilters = ({ filters, changeFilters }: NewsFiltersProps) => {
  const { data: dataCategories = [] } = useFetch<string[]>(
    getCategories,
    undefined,
    [],
  );

  const categories = [
    "All",
    ...dataCategories.filter((category) => category !== "All"),
  ];
  return (
    <div className={styles.filters}>
      <Slider>
        {categories.length ? (
          <Categories
            categories={categories}
            selectedCategory={filters.category}
            setSelectedCategory={(category) => {
              changeFilters("category", category);
            }}
          />
        ) : null}
      </Slider>

      <Search
        keywords={filters.keywords}
        setKeywords={(keywords) => {
          changeFilters("keywords", keywords);
        }}
      />
    </div>
  );
};

export default NewsFilters;
