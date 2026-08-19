import type { ReactNode } from "react";
import Pagintaion from "../Pagination/Pagintaion";

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
    <>
      {top ? <Pagintaion {...paginationProps} /> : null}
      {children}
      {bottom ? <Pagintaion {...paginationProps} /> : null}
    </>
  );
};

export default PaginationWrapper;
