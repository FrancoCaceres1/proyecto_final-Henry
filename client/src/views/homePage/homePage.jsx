import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import Card from "../../components/card/Card";
import Options from "../../components/options/options";
import Paginated from "../../components/paginated/paginated";
import Sidebar from "../../components/sideBar/sideBar";
import Header from "../../components/header/header";
import style from "./homePage.module.css";

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

  useEffect(() => {
    dispatch(actions.fetchCountries());
    dispatch(actions.fetchActivities());
  }, []);

  return (
    <div className={style.container}>
      <Sidebar />
      <div className={style.content}>
          <Header></Header>
        <div>
          <Options />
        </div>
        <div>
          <Paginated
            countryPerPage={10}
            allCountries={allCountries}
            paginated={paginated}
            currentPage={currentPage}
          />
        </div>
        <div className={style.fondo}>
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
              <div className={style.error}>
                <h2>No countries were found</h2>
                <div className={style.errorImage}>
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
