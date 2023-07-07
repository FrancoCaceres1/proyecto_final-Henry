import * as actions from "../../redux/actions";
import { initialState } from "../../redux/reducers";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import style from "./options.module.css";

const Options = () => {
  const dispatch = useDispatch();
  const [resetFilters, setResetFilters] = useState(false);

  const [selectedContinent, setSelectedContinent] = useState(
    initialState.selectedContinent
  );
  const [selectedActivity, setSelectedActivity] = useState(
    initialState.selectedActivity
  );
  const [selectedOrder, setSelectedOrder] = useState("Any"); // Ordenamiento predeterminado en descendente

  useEffect(() => {
    setSelectedContinent(initialState.selectedContinent);
    setSelectedActivity(initialState.selectedActivity);

    dispatch(actions.filterCountryByContinent(initialState.selectedContinent));
    dispatch(actions.filterActivities(initialState.selectedActivity));
  }, [dispatch]);

  const handleFilterContinent = (event) => {
    setSelectedContinent(event.target.value);
    dispatch(actions.filterCountryByContinent(event.target.value));
  };

  const handleFilterActivities = (event) => {
    setSelectedActivity(event.target.value);
    dispatch(actions.filterActivities(event.target.value));
  };

  const handleFilterOrder = (event) => {
    setSelectedOrder(event.target.value);
    dispatch(actions.filterOrder(event.target.value));
  };

  const handleResetFilters = () => {
    dispatch(actions.getCountries());
    setSelectedContinent(initialState.selectedContinent);
    setSelectedActivity(initialState.selectedActivity);
    setSelectedOrder("Any"); // Restablecer el ordenamiento a descendente
    dispatch(actions.filterCountryByContinent(initialState.selectedContinent));
    dispatch(actions.filterActivities(initialState.selectedActivity));
  };

  useEffect(() => {
    if (resetFilters) {
      dispatch(actions.resetFilters());
      setResetFilters(false);
    }
  }, [resetFilters, dispatch]);

  return (
    <div>
      <div>
        <select
          value={selectedContinent}
          onChange={handleFilterContinent}
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
          value={selectedActivity}
          onChange={handleFilterActivities}
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
          value={selectedOrder}
          onChange={handleFilterOrder}
          className={style.select}
        >
          <option value="" disabled defaultValue>
            Ordenar por:
          </option>
          <option value="Any">Cualquiera</option>
          <option value="A">Descendente País</option>
          <option value="D">Ascendente País</option>
          <option value="P">Ascendente Población</option>
          <option value="G">Descendente Población</option>
        </select>
        {/* hacer estados locales
                handleChange
                useEffect
                actions
                reducer */}
      </div>
      <button onClick={handleResetFilters}>Restablecer filtros</button>
    </div>
  );
};

export default Options;
