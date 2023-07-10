import { useState, useEffect } from "react";
import style from "./searchBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";

const SearchBar = () => {
  const allCountries = useSelector((state) => state.allCountries);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [errors, setErrors] = useState(false);

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
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && filteredCountries.length === 1) {
      dispatch(actions.onSearch(name));
    }
  };

  const handleSubmit = () => {
    dispatch(actions.onSearch(name));
  };

  useEffect(() => {
    setErrors(filteredCountries.length === 0 && name.length > 0);
  }, [filteredCountries, name]);

  const handleSelectCountry = (country) => {
    setName(country.name);
    dispatch(actions.onSearch(country.name));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar país"
        name="pais"
        value={name}
        onChange={(event) => {
          handleChange(event);
        }}
        className={style.searchInput}
        onKeyPress={handleKeyDown}
      />
      <button
        type="button"
        className={style.button}
        onClick={() => handleSubmit(filteredCountries[0])}
        disabled={filteredCountries.length !== 1}
      >
        Buscar
      </button>
      {(filteredCountries.length > 0 || name.length > 0) && (
        <ul className={style.searchResults}>
          {filteredCountries.slice(0, 10).map((country) => (
            <li key={country.name} onClick={() => handleSelectCountry(country)}>
              {country.name}
            </li>
          ))}
        </ul>
      )}
      {errors && <p className={style.error}>No se encontro ese pais</p>}
    </div>
  );
};

export default SearchBar;
