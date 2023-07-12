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
  const [selectedOrder, setSelectedOrder] = useState("Any");

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
    if (event.target.value === "Any") {
      handleResetFilters();
    } else {
      setSelectedOrder(event.target.value);
      dispatch(actions.filterOrder(event.target.value));
    }
    dispatch(actions.filterOrder(event.target.value));
  };

  const handleResetFilters = () => {
    dispatch(actions.getCountries());
    setSelectedContinent(initialState.selectedContinent);
    setSelectedActivity(initialState.selectedActivity);
    setSelectedOrder("Any");
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
      <div className={style.optionsContainer}>
        <select
          value={selectedContinent}
          onChange={handleFilterContinent}
          className={style.select}
        >
          <option value="All">All Continents</option>
          <option value="Asia">Asia</option>
          <option value="North America">North America</option>
          <option value="South America">South America</option>
          <option value="Africa">Africa</option>
          <option value="Antarctica">Antarctica</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
        <select
          value={selectedActivity}
          onChange={handleFilterActivities}
          className={style.select}
        >
          <option value="All">All Activities</option>
          <option value="Trekking">Trekking</option>
          <option value="Caminata">hike</option>
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
          <option value="Any">Any</option>
          <option value="D">↑A-Z Country</option>
          <option value="A">↓A-Z Country</option>
          <option value="P">↑ Population</option>
          <option value="G">↓ Population</option>
        </select>
        <button onClick={handleResetFilters}>Reset Filters</button>
      </div>
    </div>
  );
};

export default Options;
