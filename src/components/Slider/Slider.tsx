import { useRef, type ReactNode } from "react";
import styles from "./styles.module.css";

type SliderProps = {
  children: ReactNode;
};

const Slider = ({ children }: SliderProps) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -150, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 150, behavior: "smooth" });
  };

  return (
    <div className={styles.slider}>
      <button type="button" onClick={scrollLeft} className={styles.arrow}>
        {"<"}
      </button>
      <div ref={sliderRef} className={styles.viewport}>
        {children}
      </div>
      <button type="button" onClick={scrollRight} className={styles.arrow}>
        {">"}
      </button>
    </div>
  );
};

export default Slider;
