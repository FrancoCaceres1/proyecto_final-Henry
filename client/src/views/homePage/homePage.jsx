import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import Card from "../../components/card/Card";
import Cards from "../../components/cards/Cards";
import Options from "../../components/options/options";
import Paginated from "../../components/paginated/paginated";
import style from "./homePage.module.css";

const Home = () => {
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
  const currentActivities = allActivities.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const paginated = (pageNumber) => {
    setCurrentPage(() => pageNumber);
  };

  useEffect(() => {
    dispatch(actions.fetchCountries()); // Cargar los países al montar el componente
    dispatch(actions.fetchActivities()); // Cargar las actividades al montar el componente
  }, [dispatch]);

  return (
    <div>
      <div>
        <Options />
      </div>
      <div>
        <Paginated
          countryPerPage={10}
          allCountries={allCountries.length}
          paginated={paginated}
          currentPage={currentPage}
          allActivities={allActivities.length}
        />
      </div>
      <div className={style.card}>
        {currentCountry?.map((coun) => {
          return (
            <div className={style.tarjet} key={coun.id}>
              <Card
                name={coun.name}
                image={coun.image}
                continent={coun.continent}
                id={coun.id}
              />
            </div>
          );
        })}
      </div>
      <div className={style.cards}>
        {currentActivities?.map((coun) => {
          return (
            <div className={style.tarjet} key={coun.id}>
              <Cards
                name={coun.name}
                difficulty={coun.difficulty}
                duration={coun.duration}
                season={coun.season}
                Countries={coun.Countries}
                id={coun.id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
