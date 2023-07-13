import styles from "./paginated.module.css";

const Paginated = ({ paginated, currentPage }) => {
  const pageNumbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25
  ];

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      paginated(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < pageNumbers.length) {
      paginated(currentPage + 1);
    }
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <li>
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={styles.pagingButton}
          >
            &#10094;Prev
          </button>
        </li>
        <li className={styles.numbers}>
          <div className={styles.numbersContainer}>
            {pageNumbers?.map((number) => {
              return (
                <button
                  key={number}
                  onClick={() => paginated(number)}
                  className={
                    number === currentPage ? styles.pagingActive : styles.paging
                  }
                >
                  {number}
                </button>
              );
            })}
          </div>
        </li>
        <li>
          <button
            onClick={goToNextPage}
            disabled={currentPage === pageNumbers.length}
            className={styles.pagingButton}
          >
            Next&#10095;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Paginated;
