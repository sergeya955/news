import type { ReactNode } from "react";
import Pagintaion from "../Pagination/Pagintaion";
import styles from "./styles.module.css";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  handlePageClick: (pageNumber: number) => void;
};

type PaginationWrapperProps = PaginationProps & {
  children: ReactNode;
  top?: boolean;
  bottom?: boolean;
};

const PaginationWrapper = ({
  top = true,
  bottom = true,
  children,
  ...paginationProps
}: PaginationWrapperProps) => {
  return (
    <div className={styles.paginationWrapper}>
      {top ? <Pagintaion {...paginationProps} /> : null}
      {children}
      {bottom ? <Pagintaion {...paginationProps} /> : null}
    </div>
  );
};

export default PaginationWrapper;
