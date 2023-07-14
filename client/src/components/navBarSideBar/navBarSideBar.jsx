import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import styles from "./navBarSideBar.module.css";

const NavBarSideBar = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  const handleShowAllCountries = () => {
    dispatch(actions.resetFilters());
  };

  return (
    <div className={styles.buttonContainer}>
      <Link to="/home">
        <button className={styles.homeButton} onClick={handleShowAllCountries}>
          <img src="../../../public/img/home.png" alt="home button" />
          <p>home</p>
        </button>
      </Link>
      {isHomePage && (
        <Link to="/activities">
          <button className={styles.activityButton}>
            <img
              src="../../../public/img/caminata.png"
              alt="activities button"
            />
            <p>activities</p>
          </button>
        </Link>
      )}
      {location.pathname === "/activities" && (
        <Link to="/ver">
          <button className={styles.showActivityButton}>
            <img
              src="../../../public/img/lista.png"
              alt="activities list button"
            />
            <p>activities</p>
          </button>
        </Link>
      )}
      {location.pathname === "/ver" && (
        <button
          className={styles.backButton}
          onClick={() => window.history.back()}
        >
          <img
            // src="../../../public/img/caminata.png"
            alt="back button"
          />
          <p>back</p>
        </button>
      )}
      <Link to="/">
        <button className={styles.logoutButton}>
          <img src="../../../public/img/logout.png" alt="logout button" />
          <p>logout</p>
        </button>
      </Link>
    </div>
  );
};

export default NavBarSideBar;
