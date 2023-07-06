import * as actions from "../../redux/actions";
import { useDispatch } from "react-redux";
import style from "./options.module.css";

const Options = () => {
  const dispatch = useDispatch();

  const handleFilterContinent = (event) => {
    dispatch(actions.filterCountryByContinent(event.target.value));
  };
  const handleFilterActivities = (event) => {
    dispatch(actions.filterActivities(event.target.value));
  };
  const handleFilterOrder = (event) => {
    dispatch(actions.filterOrder(event.target.value));
  };

  return (
    <div>
      <div>
        <select
          onChange={(event) => handleFilterContinent(event)}
          className={style.select}
        >
          <option value="All">Todos los continentes</option>
          <option value="Asia">Asia</option>
          <option value="North America">Nortemérica</option>
          <option value="South America">Sudamerica</option>
          <option value="Africa">África</option>
          <option value="Antarctica">Antártida</option>
          <option value="Europe">Europa</option>
          <option value="Oceania">Oceanía</option>
        </select>
        <select
          onChange={(event) => handleFilterActivities(event)}
          className={style.select}
        >
          <option value="All">Todas las actividades</option>
          <option value="Trekking">Trekking</option>
          <option value="Caminata">Caminata</option>
          <option value="Bike Tour">Bike Tour</option>
          <option value="City Tour">City Tour</option>
          <option value="Gastronomic Circuit">Gastronomic Circuit</option>
          <option value="Rapel">Rapel</option>
          <option value="Shopping">Shopping</option>
          <option value="Museum Circuit">Museum Circuit</option>
          <option value="Free Choice">Free Choice</option>
        </select>
        <select
          onChange={(event) => handleFilterOrder(event)}
          className={style.select}
        >
          <option value="" disabled selected>Ordenar por:</option>
          <option value="A">Ascendente País</option>
          <option value="D">Descendente País</option>
          <option value="P">Ascendente Población</option>
          <option value="G">Descendente Población</option>
        </select>
        {/* hacer estados locales
                handleChange
                useEffect
                actions
                reducer */}
      </div>
    </div>
  );
};

export default Options;
