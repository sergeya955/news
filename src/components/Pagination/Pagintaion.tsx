import styles from './styles.module.css'

type PaginationProps = {
  totalPages: number
  currentPage: number
  handleNextPage: () => void
  handlePrevPage: () => void
  handlePageClick: (pageNumber: number) => void
}

const Pagintaion = ({
    totalPages,
    currentPage,
    handleNextPage,
    handlePrevPage,
    handlePageClick,
} : PaginationProps) => {
    return (
        <div className={styles.pagination}>
            <button className={styles.arrow} onClick={handlePrevPage} disabled={currentPage === 1}>
                {'<'}
            </button>
            <div>
                {Array.from({ length: totalPages }, (_, index) => {
                    const pageNumber = index + 1

                    return (
                        <button
                            key={pageNumber}
                            className={styles.pageNumber}
                            onClick={() => handlePageClick(pageNumber)}
                            disabled={pageNumber === currentPage}
                        >
                            {pageNumber}
                        </button>
                    )
                })}
            </div>

            <button className={styles.arrow} onClick={handleNextPage} disabled={currentPage === totalPages}>
                {'>'}
            </button>
        </div>
    )
}

export default Pagintaion
