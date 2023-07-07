import style from "./paginated.module.css";

const Paginated = ({
  paginated,
  currentPage,
}) => {
  const pageNumbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,];

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
    <nav className={style.nav}>
      <ul className={style.ul}>
        <li>
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={style.paging}
          >
            {"<<<"}
          </button>
        </li>

        {pageNumbers?.map((number) => {
          return (
            <li key={number}>
              <button
                onClick={() => paginated(number)}
                className={
                  number === currentPage ? style.pagingActive : style.paging
                }
              >
                {number}
              </button>
            </li>
          );
        })}

        <li>
          <button
            onClick={goToNextPage}
            disabled={currentPage === pageNumbers.length}
            className={style.paging}
          >
            {">>>"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Paginated;
