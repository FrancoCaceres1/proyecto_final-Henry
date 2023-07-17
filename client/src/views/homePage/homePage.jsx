import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import Card from "../../components/card/Card";
import Options from "../../components/options/options";
import Paginated from "../../components/paginated/paginated";
import Sidebar from "../../components/sideBar/sideBar";
import Header from "../../components/header/header";
import styles from "./homePage.module.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.allCountriesFilter);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastCountry = currentPage * 10;
  const indexOfFirstCountry = indexOfLastCountry - 10;
  const currentCountry = allCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const paginated = (pageNumber) => {
    setCurrentPage(() => pageNumber);
  };

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  useEffect(() => {
    dispatch(actions.fetchCountries());
    dispatch(actions.fetchActivities());
  }, []);

  const cardRef = useRef(null);
  const paginatedRef = useRef(null);

  const handleScroll = () => {
    const cardRect = cardRef.current.getBoundingClientRect();
    const paginatedRect = paginatedRef.current.getBoundingClientRect();

    if (cardRect.top <= 0) {
      paginatedRef.current.classList.add(styles.fixed);
    } else {
      paginatedRef.current.classList.remove(styles.fixed);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
          <Header onFilterChange={handleFilterChange}></Header>
        <div>
          <Options onFilterChange={handleFilterChange}/>
        </div>
        <div className={styles.paginatedContainer} ref={paginatedRef}>
          <Paginated
            countryPerPage={10}
            allCountries={allCountries}
            paginated={paginated}
            currentPage={currentPage}
          />
        </div>
        <div className={styles.fondo}>
          <div className={styles.card} ref={cardRef}>
            {currentCountry.length > 0 ? (
              currentCountry.map((coun) => (
                <div className={styles.tarjet} key={coun.id}>
                  <Card
                    name={coun.name}
                    image={coun.image}
                    continent={coun.continent}
                    id={coun.id}
                  />
                </div>
              ))
            ) : (
              <div className={styles.error}>
                <h2>No countries were found</h2>
                <div className={styles.errorImage}>
                  <img src="../../../public/img/noFound.png" alt="" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
