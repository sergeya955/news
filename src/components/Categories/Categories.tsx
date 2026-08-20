import styles from "./styles.module.css";

type CategoriesProps = {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const Categories = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategoriesProps) => {
  return (
    <div className={styles.categories}>
      {categories.map((category) => (
        <button
          key={category}
          className={category === selectedCategory ? styles.active : styles.item}
          onClick={() => setSelectedCategory(category)}
          type="button"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Categories;
