import { useState } from "react";
import style from "./searchBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { onSearch } from "../../redux/actions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchError = useSelector((state) => state.searchError);
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
    dispatch(onSearch(event.target.value));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      dispatch(onSearch(name));
    }
  };

  const handleSubmit = () => {
    dispatch(onSearch(name));
  };

  return (
    <div>
      <input
        className={style.input}
        type="search"
        placeholder="Ingresa un país"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={name}
      />
      <button className={style.button} onClick={handleSubmit}>
        Buscar / Traer todos
      </button>
      {searchError && <p>{searchError}</p>}
    </div>
  );
};

export default SearchBar;
