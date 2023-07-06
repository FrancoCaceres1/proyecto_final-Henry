import style from "./paginated.module.css";

const Paginated = ({
  countryPerPage,
  allCountries,
  paginated,
  currentPage
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allCountries.length / countryPerPage); i++) {
    pageNumbers.push(i);
  }

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
