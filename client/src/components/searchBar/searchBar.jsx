import { useState } from "react";
import style from "./searchBar.module.css";
import { useDispatch } from "react-redux";
import { onSearch } from "../../redux/actions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const handleChange = (event) => {
    setName(event.target.value);
  };
  const handleSubmit = async() => {
    await dispatch(onSearch(name))
  };
  return (
    <div>
      <input
        className={style.input}
        type="search"
        placeholder="Ingresa un país"
        onChange={handleChange}
        value={name}
      />
      <button
        className={style.button}
        onClick={() => {
          handleSubmit();
          setName("");
        }}
      >
        Buscar / Traer todos
      </button>
    </div>
  );
};

export default SearchBar;
