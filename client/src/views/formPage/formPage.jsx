import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import validation from "./validation";
import Header from "../../components/header/header";
import Sidebar from "../../components/sideBar/sideBar";
import styles from "./formPage.module.css";

const FormPage = () => {
  const allCountries = useSelector((state) => state.allCountries);
  const [isOpenSeason, setIsOpenSeason] = useState(false);
  const [isOpenActivity, setIsOpenActivity] = useState(false);
  const [isOpenDifficulty, setIsOpenDifficulty] = useState(false);
  const selectDifficultyRef = useRef(null);
  const selectActivityRef = useRef(null);
  const selectSeasonRef = useRef(null);
  const [showTitle, setShowTitle] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const selectRef = useRef(null);
  const dispatch = useDispatch();
  const [isSearchListVisible, setSearchListVisible] = useState(false);
  const [isFormValid, setFormValid] = useState(false);
  const incrementIntervalRef = useRef(null);
  const decrementIntervalRef = useRef(null);
  const [showAlert1, setShowAlert1] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [showAlert3, setShowAlert3] = useState(false);
  const [form, setForm] = useState({
    name: "",
    difficulty: "",
    duration: "1",
    season: "",
    pais: [],
  });
  const [errors, setErrors] = useState({
    name: "*",
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

  useEffect(() => {
    const isFormValid =
      !errors.name &&
      !errors.difficulty &&
      !errors.duration &&
      !errors.season &&
      !errors.pais &&
      form.pais.length > 0;
    setFormValid(isFormValid);
  }, [errors, form]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(form));

    if (
      !errors.name &&
      !errors.difficulty &&
      !errors.duration &&
      !errors.season &&
      !errors.pais
    ) {
      dispatch(actions.addActivity(form))
        .then(() => {
          setForm({
            name: "",
            difficulty: "",
            duration: "1",
            season: "",
            pais: [],
          });
          setShowAlert1(true);
          selectRef.current.selectedIndex = 0;
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            const errorMessage = error.response.data.error;
            alert("Error: " + errorMessage);
          } else if (
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            const validationErrors = error.response.data.errors;
            const errorMessage = validationErrors
              .map((err) => err.message)
              .join("\n");
            alert("Validation error:\n" + errorMessage);
          } else {
            alert("An error occurred while creating the activity");
          }
        });
    } else {
      setErrors(validation(form));
    }
    setShowTitle(true);
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredResults = allCountries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm)
    );
    setFilteredCountries(filteredResults);
    setSearchTerm(searchTerm);
    setSearchListVisible(false);
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setSearchListVisible(true);
      setSearchTerm("");
    }, 100);
  };

  const handleSearchSubmit = (country = filteredCountries[0]) => {
    if (country) {
      const selectedCountry = country.name;
      if (form.pais.includes(selectedCountry)) {
        setShowAlert2(true);
      } else if (form.pais.length >= 10) {
        setShowAlert3(true);
      } else {
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
        setFormValid(true);
        setShowTitle(false);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearchSubmit();
    }
  };

  const handleDelete = (element) => {
    setForm({
      ...form,
      pais: form.pais.filter((ele) => ele !== element),
    });
    const remainingCountries = form.pais.filter((ele) => ele !== element);
    setShowTitle(remainingCountries.length === 0);
    const isFormValid =
      !errors.name &&
      !errors.difficulty &&
      !errors.duration &&
      !errors.season &&
      !errors.pais &&
      form.pais.length - 1 > 0;
    setFormValid(isFormValid);
  };

  const handleSelectToggleSeason = () => {
    setIsOpenSeason(!isOpenSeason);
  };

  const handleSelectToggleActivity = () => {
    setIsOpenActivity(!isOpenActivity);
  };

  const handleSelectToggleDifficulty = () => {
    setIsOpenDifficulty(!isOpenDifficulty);
  };

  useEffect(() => {
    const handleClickOutside = (event, ref, setIsOpen) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleDocumentClick = (event) => {
      handleClickOutside(event, selectDifficultyRef, setIsOpenDifficulty);
      handleClickOutside(event, selectActivityRef, setIsOpenActivity);
      handleClickOutside(event, selectSeasonRef, setIsOpenSeason);
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const handleDurationChange = (amount) => {
    const newDuration = +form.duration + amount;
    if (newDuration >= 1) {
      setForm((prevForm) => ({
        ...prevForm,
        duration: newDuration,
      }));
    }
  };

  const handleIncrementMouseDown = () => {
    clearInterval(decrementIntervalRef.current);
    incrementIntervalRef.current = setTimeout(() => {
      increment();
      incrementIntervalRef.current = setInterval(increment, 100);
    }, 500);
  };

  const handleDecrementMouseDown = () => {
    clearInterval(incrementIntervalRef.current);
    decrementIntervalRef.current = setTimeout(() => {
      decrement();
      decrementIntervalRef.current = setInterval(decrement, 100);
    }, 500);
  };

  const handleButtonMouseUp = () => {
    clearInterval(incrementIntervalRef.current);
    clearInterval(decrementIntervalRef.current);
    clearTimeout(decrementIntervalRef.current);
  };

  const decrement = () => {
    setForm((prevForm) => {
      const newDuration = Math.max(+prevForm.duration - 1, 1);
      if (newDuration === 1) {
        clearInterval(decrementIntervalRef.current);
      }
      return {
        ...prevForm,
        duration: newDuration,
      };
    });
  };

  const increment = () => {
    setForm((prevForm) => ({
      ...prevForm,
      duration: Math.max(+prevForm.duration + 1, 1),
    }));
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <Header></Header>
        <div className={styles.titleContainer}>
          <h1>Create Activity</h1>
        </div>
        <div className={styles.navContainer}>
          <button onClick={() => window.history.back()}>&#9664; Back</button>
        </div>
        <div className={styles.formContainer}>
          <div
            className={`${styles.imgContainer} ${
              showTitle ? "" : styles.hidden
            }`}
          >
            {showAlert1 && (
              <div className={styles.alerta}>
                <div className={styles.alertContainer}>
                  <p className={styles.alertSucces}>
                    The activity has been successfully created!
                  </p>
                  <button onClick={() => setShowAlert1(false)}>Okey</button>
                </div>
              </div>
            )}
            {showAlert2 && (
              <div className={styles.alerta}>
                <div className={styles.alertContainer}>
                  <p className={styles.alertError}>
                    The selected country is already in the list!
                  </p>
                  <button onClick={() => setShowAlert2(false)}>Okey</button>
                </div>
              </div>
            )}
            {showAlert3 && (
              <div className={styles.alerta}>
                <div className={styles.alertContainer}>
                  <p className={styles.alertError}>
                    Cannot add more than 10 countries!
                  </p>
                  <button onClick={() => setShowAlert3(false)}>Okey</button>
                </div>
              </div>
            )}
            <div className={styles.tituloContainer}>
              <h2>Selected Countries</h2>
              <p>&quot;Click&quot; to delete</p>
            </div>
            <img src="/img/activity.png" alt="" />
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div
              className={`${styles.line} ${styles.name} ${
                isOpenActivity ? styles.open : ""
              }`}
            >
              <label htmlFor="">Name : </label>
              <select
                className={styles.select}
                ref={selectActivityRef}
                onClick={handleSelectToggleActivity}
                name="name"
                value={form.name}
                onChange={handleChange}
              >
                <option value="" disabled defaultValue="">
                  Select the activity
                </option>
                <option value="Trekking">Trekking</option>
                <option value="Hike">Hike</option>
                <option value="Bike Tour">Bike Tour</option>
                <option value="City Tour">City Tour</option>
                <option value="Gastronomic Circuit">Gastronomic Circuit</option>
                <option value="Rapel">Rapel</option>
                <option value="Shopping">Shopping</option>
                <option value="Museum Circuit">Museum Circuit</option>
              </select>
              <div className={styles.selectArrow}></div>
              {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>
            <div
              className={`${styles.line} ${styles.difficulty} ${
                isOpenDifficulty ? styles.open : ""
              }`}
            >
              <label>Difficulty : </label>
              <select
                ref={selectDifficultyRef}
                onClick={handleSelectToggleDifficulty}
                className={styles.select}
                name="difficulty"
                value={form.difficulty}
                onChange={handleChange}
                id=""
              >
                <option value="" disabled defaultValue="">
                  Select a value
                </option>
                <option value={"Soft"}>Soft</option>
                <option value={"Easy"}>Easy</option>
                <option value={"Normal"}>Normal</option>
                <option value={"Difficult"}>Difficult</option>
                <option value={"Hard"}>Hard</option>
              </select>
              <div className={styles.selectArrow}></div>
              {errors.difficulty && (
                <p className={`${styles.error} ${styles.difficulty}`}>
                  {errors.difficulty}
                </p>
              )}
            </div>
            <div
              className={`${styles.line} ${styles.season} ${
                isOpenSeason ? styles.open : ""
              }`}
            >
              <label htmlFor="">Season : </label>
              <select
                ref={selectSeasonRef}
                onClick={handleSelectToggleSeason}
                className={styles.select}
                name="season"
                value={form.season}
                onChange={handleChange}
                id=""
              >
                <option value="" disabled defaultValue="">
                  Select a value
                </option>
                <option value="Summer">Summer</option>
                <option value="Autumn">Autumn</option>
                <option value="Winter">Winter</option>
                <option value="Spring">Spring</option>
              </select>
              <div className={styles.selectArrow}></div>
              {errors.season && (
                <p className={`${styles.error} ${styles.season}`}>
                  {errors.season}
                </p>
              )}
            </div>
            <div className={`${styles.line} ${styles.duration}`}>
              <label htmlFor="duration">Duration : </label>
              <input
                className={styles.selectDuration}
                type="number"
                value={form.duration}
                onChange={handleChange}
                name="duration"
                min={1}
                readOnly
              />
              <div className={styles.buttonContainer}>
                <button
                  className={styles.buttonIn}
                  type="button"
                  onMouseDown={handleIncrementMouseDown}
                  onMouseUp={handleButtonMouseUp}
                  onMouseLeave={handleButtonMouseUp}
                  onClick={() => handleDurationChange(1)}
                >
                  &#9650;
                </button>
                <button
                  className={styles.buttonDe}
                  type="button"
                  onMouseDown={handleDecrementMouseDown}
                  onMouseUp={handleButtonMouseUp}
                  onMouseLeave={handleButtonMouseUp}
                  onClick={() => handleDurationChange(-1)}
                  disabled={form.duration <= 1}
                >
                  &#9660;
                </button>
              </div>
              <p>hrs</p>
              {errors.duration && (
                <p className={styles.error}>{errors.duration}</p>
              )}
            </div>
            <div className={`${styles.line} ${styles.country}`}>
              <label htmlFor="">Country / Countries : </label>
              <div>
                <input
                  type="text"
                  placeholder="Search Country"
                  name="pais"
                  value={searchTerm}
                  onBlur={handleSearchBlur}
                  onChange={(event) => {
                    handleSearchChange(event);
                  }}
                  className={styles.searchInput}
                  onKeyPress={handleKeyPress}
                  ref={selectRef}
                  autoComplete="off"
                />
                <button
                  type="button"
                  className={styles.searchButton}
                  onClick={() => handleSearchSubmit(filteredCountries[0])}
                  disabled={filteredCountries.length !== 1}
                >
                  <p>&#8594;</p>
                </button>
              </div>
              {filteredCountries.length > 0 && !isSearchListVisible && (
                <ul className={styles.searchResults}>
                  {filteredCountries.slice(0, 5).map((country) => (
                    <li
                      key={country.name}
                      onClick={() => handleSearchSubmit(country)}
                    >
                      {country.name}
                    </li>
                  ))}
                </ul>
              )}
              {errors.pais && (
                <p className={`${styles.error} ${styles.country}`}>
                  {errors.pais}
                </p>
              )}
              <div className={`${styles.line} ${styles.added}`}>
                <div className={styles.countriesContainer}>
                  {form.pais?.map((element) => (
                    <div className={styles.countries} key={element}>
                      <button
                        className={styles.setcountry}
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
            </div>
            <div className={`${styles.line} ${styles.submit}`}>
              <button
                type="submit"
                className={styles.button}
                onClick={handleSubmit}
                disabled={!isFormValid || form.duration < 1}
              >
                Create Activity
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
