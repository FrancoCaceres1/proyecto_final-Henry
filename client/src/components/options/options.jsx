import * as actions from "../../redux/actions";
import { initialState } from "../../redux/reducers";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import styles from "./options.module.css";

const Options = ({ onFilterChange }) => {
  const dispatch = useDispatch();
  const [isOpenContinent, setIsOpenContinent] = useState(false);
  const [isOpenActivity, setIsOpenActivity] = useState(false);
  const [isOpenOrder, setIsOpenOrder] = useState(false);
  const [showButtonText, setShowButtonText] = useState(false);
  const selectOrderRef = useRef(null);
  const selectActivityRef = useRef(null);
  const selectContinentRef = useRef(null);
  const [selectedContinent, setSelectedContinent] = useState("All");
  const [selectedActivity, setSelectedActivity] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState("Any");

  useEffect(() => {
    dispatch(actions.resetPage());
  }, [dispatch]);

  useEffect(() => {
    setSelectedContinent(initialState.selectedContinent);
    setSelectedActivity(initialState.selectedActivity);

    dispatch(actions.filterCountryByContinent(initialState.selectedContinent));
    dispatch(actions.filterActivities(initialState.selectedActivity));
  }, [dispatch]);

  const handleFilterContinent = (event) => {
    setSelectedContinent(event.target.value);
    if (event.target.value === "All") {
      handleResetFilters();
      setShowButtonText(false);
    } else {
      setSelectedContinent(event.target.value);
      dispatch(actions.filterCountryByContinent(event.target.value));
      setShowButtonText(true);
      onFilterChange();
    }
  };

  const handleFilterActivities = (event) => {
    setSelectedActivity(event.target.value);
    if (event.target.value === "All") {
      handleResetFilters();
      setShowButtonText(false);
    } else {
      setSelectedActivity(event.target.value);
      dispatch(actions.filterActivities(event.target.value));
      setShowButtonText(true);
      onFilterChange();
    }
  };

  const handleFilterOrder = (event) => {
    setSelectedOrder(event.target.value);
    if (event.target.value === "Any") {
      handleResetFilters();
      setShowButtonText(false);
    } else {
      setSelectedOrder(event.target.value);
      dispatch(actions.filterOrder(event.target.value));
      onFilterChange();
    }
    dispatch(actions.filterOrder(event.target.value));
    setShowButtonText(true);
  };

  const handleResetFilters = () => {
    dispatch(actions.getCountries());
    setSelectedContinent(initialState.selectedContinent);
    setSelectedActivity(initialState.selectedActivity);
    setSelectedOrder("Any");
    setSelectedActivity("All");
    setSelectedContinent("All");
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

  useEffect(() => {
    const handleClickOutside = (event, ref, setIsOpen) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleDocumentClick = (event) => {
      handleClickOutside(event, selectOrderRef, setIsOpenOrder);
      handleClickOutside(event, selectActivityRef, setIsOpenActivity);
      handleClickOutside(event, selectContinentRef, setIsOpenContinent);
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    dispatch(actions.filterActivities(selectedActivity)); 
  }, [dispatch, selectedActivity]);

  return (
    <div className={styles.optionsContainer}>
      <div className={styles.selectContainer}>
        <div
          className={`${styles.selectContainerFilter} ${
            isOpenContinent ? styles.open : ""
          }`}
        >
          <select
            ref={selectContinentRef}
            value={selectedContinent}
            onChange={handleFilterContinent}
            className={styles.select}
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
          <div className={styles.selectArrow}></div>
        </div>
        <div
          className={`${styles.selectContainerFilter} ${
            isOpenActivity ? styles.open : ""
          }`}
        >
          <select
            ref={selectActivityRef}
            value={selectedActivity}
            onChange={handleFilterActivities}
            className={styles.select}
            onClick={handleSelectToggleActivity}
          >
            <option value="All">All Activities</option>
            <option value="Trekking">Trekking</option>
            <option value="Hike">Hike</option>
            <option value="Bike Tour">Bike Tour</option>
            <option value="City Tour">City Tour</option>
            <option value="Gastronomic Circuit">Gastronomic Circuit</option>
            <option value="Rapel">Rapel</option>
            <option value="Shopping">Shopping</option>
            <option value="Museum Circuit">Museum Circuit</option>
            <option value="Free Choice">Free Choice</option>
          </select>
          <div className={styles.selectArrow}></div>
        </div>
        <div
          className={`${styles.selectContainerFilter} ${
            isOpenOrder ? styles.open : ""
          }`}
        >
          <select
            ref={selectOrderRef}
            value={selectedOrder}
            onChange={handleFilterOrder}
            className={styles.select}
            onClick={handleSelectToggleOrder}
          >
            <option value="Any">Any Order</option>
            <option value="D">&uarr; A-Z Country</option>
            <option value="A">&darr; A-Z Country</option>
            <option value="P">&uarr; Population</option>
            <option value="G">&darr; Population</option>
          </select>
          <div className={styles.selectArrow}></div>
        </div>
      </div>
      <button
        onClick={handleResetFilters}
        className={`${styles.resetButton} ${
          !showButtonText ? styles.hidden : ""
        }`}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Options;
