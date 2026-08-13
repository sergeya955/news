import styles from "./styles.module.css";

type SearchProps = {
  keywords: string
  setKeywords: (value: string) => void
}

const Search = ({ keywords, setKeywords }: SearchProps) => {
  return (
    <div className={styles.search}>
      <input
        type="text"
        className={styles.input}
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        placeholder="Javascript"
      />
    </div>
  );
};

export default Search;
