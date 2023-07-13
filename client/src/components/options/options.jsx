import * as actions from "../../redux/actions";
import { initialState } from "../../redux/reducers";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import style from "./options.module.css";

const Options = () => {
  const dispatch = useDispatch();
  const [isOpenContinent, setIsOpenContinent] = useState(false);
  const [isOpenActivity, setIsOpenActivity] = useState(false);
  const [isOpenOrder, setIsOpenOrder] = useState(false);
  const [showButtonText, setShowButtonText] = useState(false);

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

  useEffect(() => {
    if (selectedContinent === "All" && selectedActivity === "All") {
      setShowButtonText(false);
    } else {
      setShowButtonText(true);
    }
  }, [selectedContinent, selectedActivity]);

  const handleFilterContinent = (event) => {
    setSelectedContinent(event.target.value);
    dispatch(actions.filterCountryByContinent(event.target.value));
    setShowButtonText(true);
  };

  const handleFilterActivities = (event) => {
    setSelectedActivity(event.target.value);
    dispatch(actions.filterActivities(event.target.value));
    setShowButtonText(true);
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
    setShowButtonText(true);
  };

  const handleResetFilters = () => {
    dispatch(actions.getCountries());
    setSelectedContinent(initialState.selectedContinent);
    setSelectedActivity(initialState.selectedActivity);
    setSelectedOrder("Any");
    dispatch(actions.filterCountryByContinent(initialState.selectedContinent));
    dispatch(actions.filterActivities(initialState.selectedActivity));
    setShowButtonText(false);
  };

  const handleSelectToggleContinent = () => {
    setIsOpenContinent(!isOpenContinent);
  };

  const handleSelectToggleActivity = () => {
    setIsOpenActivity(!isOpenActivity);
  };

  const handleSelectToggleOrder = () => {
    setIsOpenOrder(!isOpenOrder);
  };

  return (
    <div className={style.optionsContainer}>
      <div className={style.selectContainer}>
        <div
          className={`${style.selectContainerFilter} ${
            isOpenContinent ? style.open : ""
          }`}
        >
          <select
            value={selectedContinent}
            onChange={handleFilterContinent}
            className={style.select}
            onClick={handleSelectToggleContinent}
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
          <div className={style.selectArrow}></div>
        </div>
        <div
          className={`${style.selectContainerFilter} ${
            isOpenActivity ? style.open : ""
          }`}
        >
          <select
            value={selectedActivity}
            onChange={handleFilterActivities}
            className={style.select}
            onClick={handleSelectToggleActivity}
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
          <div className={style.selectArrow}></div>
        </div>
        <div
          className={`${style.selectContainerFilter} ${
            isOpenOrder ? style.open : ""
          }`}
        >
          <select
            value={selectedOrder}
            onChange={handleFilterOrder}
            className={style.select}
            onClick={handleSelectToggleOrder}
          >
            <option value="Any">Any Order</option>
            <option value="D">↑A-Z Country</option>
            <option value="A">↓A-Z Country</option>
            <option value="P">↑ Population</option>
            <option value="G">↓ Population</option>
          </select>
          <div className={style.selectArrow}></div>
        </div>
      </div>
      <button
        onClick={handleResetFilters}
        className={`${style.resetButton} ${
          !showButtonText && selectedOrder === "Any" ? style.hidden : ""
        }`}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Options;
