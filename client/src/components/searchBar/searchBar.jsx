import { useState, useEffect, useRef } from "react";
import style from "./searchBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";

const SearchBar = () => {
  const allCountries = useSelector((state) => state.allCountries);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [errors, setErrors] = useState(false);
  const resultsRef = useRef(null);
  const [isListVisible, setListVisible] = useState(false);
  const [resetFilters, setResetFilters] = useState(true);

  const handleShowAllCountries = () => {
    dispatch(actions.resetFilters());
    setResetFilters(true);
  };

  const handleChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredResults = allCountries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm)
    );
    setFilteredCountries(filteredResults);
    setName(event.target.value);

    if (event.target.value === "") {
      setFilteredCountries([]);
    }

    setListVisible(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && filteredCountries.length === 1) {
      dispatch(actions.onSearch(name));
      if (resultsRef.current) {
        resultsRef.current.style.display = "none";
      }
      setResetFilters(false);
    }
  };

  const handleSubmit = () => {
    dispatch(actions.onSearch(name));
    setResetFilters(false);
  };

  useEffect(() => {
    setErrors(filteredCountries.length === 0 && name.length > 0);
  }, [filteredCountries, name]);

  const handleSelectCountry = (country) => {
    setName(country.name);
    dispatch(actions.onSearch(country.name));
    setErrors(false);
    resultsRef.current.style.display = "none";
    setListVisible(false);
    setResetFilters(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.style.display = "none";
        setListVisible(false);
      }
    }, 200);
  };

  const handleFocus = () => {
    if (resultsRef.current && filteredCountries.length > 0 && !isListVisible) {
      resultsRef.current.style.display = "block";
      setListVisible(false);
    }
  };

  return (
    <div className={style.searchContainer}>
      <div className={style.searchInputContainer}>
        <button
          onClick={handleShowAllCountries}
          className={`${style.showAllButton} ${
            resetFilters && filteredCountries.length >= 0 ? style.hidden : ""
          }`}
        >
          <img src="../../../public/img/recarga.png" alt="" />
        </button>
        <input
          type="text"
          placeholder="Search"
          name="pais"
          value={name}
          onChange={(event) => {
            handleChange(event);
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={style.searchInput}
          onKeyPress={handleKeyDown}
          autoComplete="off"
        />
        <button
          type="button"
          className={style.searchIcon}
          onClick={() => handleSubmit(filteredCountries[0])}
          disabled={filteredCountries.length !== 1}
        ></button>
      </div>
      {isListVisible && filteredCountries.length > 0 && (
        <ul className={style.searchResults} ref={resultsRef}>
          {filteredCountries.slice(0, 5).map((country) => (
            <li key={country.name} onClick={() => handleSelectCountry(country)}>
              {country.name}
            </li>
          ))}
        </ul>
      )}
      {errors && name.length > 0 && (
        <p className={style.error}>Not founded</p>
      )}
    </div>
  );
};

export default SearchBar;
