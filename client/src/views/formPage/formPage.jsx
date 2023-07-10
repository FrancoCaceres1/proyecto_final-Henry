import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../Redux/actions";
import validation from "./validation";
import Navbar from "../../components/navbar/navbar"
import style from "./formPage.module.css";

const FormPage = () => {
  const allCountries = useSelector((state) => state.allCountries);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const selectRef = useRef(null);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    pais: [],
  });
  const [errors, setErrors] = useState({
    name: "Debes seleccionar una actividad",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  
    setErrors(
      validation({
        ...form,
        [name]: value,
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!errors.pais) {
      dispatch(actions.addActivity(form));
      setForm({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        pais: [],
      });
      alert("La actividad se creó con éxito");
      selectRef.current.selectedIndex = 0;
    } else {
      alert("Por favor, completa todos los datos");
    }
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredResults = allCountries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm)
    );
    setFilteredCountries(filteredResults);
    setSearchTerm(searchTerm);
  };

  const handleSearchSubmit = (country) => {
    const selectedCountry = country.name;
    setForm((prevForm) => ({
      ...prevForm,
      pais: [...prevForm.pais, selectedCountry],
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      pais: "",
    }));
    setSearchTerm("");
    setFilteredCountries([]);
  };

  const handleDelete = (element) => {
    setForm({
      ...form,
      pais: form.pais.filter((ele) => ele !== element),
    });
  };

  return (
    <div className={style.container}>
      <div><Navbar/></div>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.line}>
          <label htmlFor="">Nombre: </label>
          <select
            className={style.select}
            name="name"
            value={form.name}
            onChange={handleChange}
          >
            <option value="" disabled defaultValue="">
              Selecciona la actividad
            </option>
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
          {errors.name && <p className={style.error}>{errors.name}</p>}
        </div>

        <div className={style.line}>
          <label>Dificultad: </label>
          <select
            className={style.select}
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
            id=""
          >
            <option value="" disabled defaultValue="">
              Seleccione un valor
            </option>
            <option value={1}>muy fácil</option>
            <option value={2}>facil</option>
            <option value={3}>normal</option>
            <option value={4}>difícil</option>
            <option value={5}>muy difícil</option>
          </select>
          {errors.difficulty && (
            <p className={style.error}>{errors.difficulty}</p>
          )}
        </div>
        <div className={style.line}>
          <label htmlFor="duration">Duración (en Horas): </label>
          <input
            className={style.select}
            type="number"
            value={form.duration}
            onChange={handleChange}
            name="duration"
            min={1}
            max={6}
          />
          {errors.duration && <p className={style.error}>{errors.duration}</p>}
        </div>

        <div className={style.line}>
          <label htmlFor="">Temporada: </label>
          <select
            className={style.select}
            name="season"
            value={form.season}
            onChange={handleChange}
            id=""
          >
            <option value="" disabled defaultValue="">
              Seleccione un valor
            </option>
            <option value="Verano">Verano</option>
            <option value="Otoño">Otoño</option>
            <option value="Invierno">Invierno</option>
            <option value="Primavera">Primavera</option>
          </select>
          {errors.season && <p className={style.error}>{errors.season}</p>}
        </div>
        <div className={style.line}>
          <label htmlFor="">País / Países: </label>
          <div>
            <input
              type="text"
              placeholder="Buscar país"
              name="pais"
              value={searchTerm}
              onChange={(event) => {
                handleSearchChange(event);
              }}
              className={style.searchInput}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  handleSearchSubmit();
                }
              }}
              ref={selectRef}
            />
            <button
              type="button"
              className={style.searchButton}
              onClick={() => handleSearchSubmit(filteredCountries[0])}
              disabled={filteredCountries.length !== 1}
            >
              Agregar
            </button>
          </div>
          {filteredCountries.length > 0 && (
            <ul className={style.searchResults}>
              {filteredCountries.slice(0, 10).map((country) => (
                <li
                  key={country.name}
                  onClick={() => handleSearchSubmit(country)}
                >
                  {country.name}
                </li>
              ))}
            </ul>
          )}
          {errors.pais && <p className={style.error}>{errors.pais}</p>}
          <div className={style.line}>
            {form.pais?.map((element) => (
              <div className={style.countries} key={element}>
                <button
                  className={style.setcountry}
                  onClick={() => {
                    handleDelete(element);
                  }}
                >
                  {`${element}`}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className={style.line}>
          <button type="submit" className={style.button} onClick={handleSubmit}>
            Crear Actividad
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPage;
