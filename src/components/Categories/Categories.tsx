import styles from "./styles.module.css";

type CategoriesProps = {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const Categories = ({ categories, selectedCategory, setSelectedCategory }: CategoriesProps) => {
  return (
    <div className={styles.categories}>
      {categories.map((category: string) => {
        return (
          <button
            className={category === selectedCategory ? styles.active : styles.item}
            onClick={() => setSelectedCategory(category)}
            key={category}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default Categories;
