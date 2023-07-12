import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import Card from "../../components/card/Card";
import Options from "../../components/options/options";
import Paginated from "../../components/paginated/paginated";
import Sidebar from "../../components/sideBar/sideBar";
import SearchBar from "../../components/searchBar/SearchBar";
import style from "./homePage.module.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.allCountriesFilter);
  const allActivities = useSelector((state) => state.allActivitiesFilter);
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

  const handleShowAllCountries = () => {
    dispatch(actions.resetFilters());
  };

  useEffect(() => {
    dispatch(actions.fetchCountries());
    dispatch(actions.fetchActivities());
  }, []);

  return (
    <div className={style.container}>
      <Sidebar />
      <div className={style.content}>
        <header className={style.header}>
          <h1 className={style.logo}>Countries.API</h1>
          <div className={style.search}>
            {allCountries.length === 1 && (
              <button onClick={handleShowAllCountries} className={style.showAllButton}>
                <img src="../../../public/img/recarga.png" alt="" />
              </button>
            )}
            <SearchBar />
          </div>
          <div className={`${style.earth} ${style.animation}`}></div>
        </header>
        <div>
          <Options />
        </div>
        <div className={style.card}>
          {currentCountry.length > 0 ? (
            currentCountry.map((coun) => (
              <div className={style.tarjet} key={coun.id}>
                <Card
                  name={coun.name}
                  image={coun.image}
                  continent={coun.continent}
                  id={coun.id}
                />
              </div>
            ))
          ) : (
            <p>No se encontraron países con esas actividades</p>
          )}
        </div>
        {allCountries.length > 10 && (
          <div>
            <Paginated
              countryPerPage={10}
              allCountries={allCountries.length}
              paginated={paginated}
              currentPage={currentPage}
              allActivities={allActivities.length}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
