import { useEffect, useState } from "react";
import styles from "./paginated.module.css";

const Paginated = ({
  paginated,
  currentPage,
  allCountries,
  countryPerPage,
}) => {
  const [totalPages, setTotalPages] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const totalPagesCount = Math.ceil(allCountries.length / countryPerPage);
    setTotalPages(totalPagesCount);
  }, [allCountries, countryPerPage]);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <nav className={styles.nav}>
      {totalPages > 1 && (
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
              {pageNumbers?.map((number, index) => {
                const isHidden =
                  windowWidth <= 948 && index !== currentPage - 1;
                return (
                  <button
                    key={number}
                    onClick={() => paginated(number)}
                    className={`${styles.paging} ${
                      isHidden ? styles.hidden : ""
                    }${currentPage === number ? styles.pagingActive : ""}`}
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
              disabled={currentPage === totalPages}
              className={styles.pagingButton}
            >
              Next&#10095;
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Paginated;
