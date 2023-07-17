import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import styles from "./navBarSideBar.module.css";

const NavBarSideBar = () => {
  const dispatch = useDispatch();

  const handleShowAllCountries = () => {
    dispatch(actions.resetFilters());
  };

  return (
    <div className={styles.buttonContainer}>
      <Link to="/home">
        <button className={styles.homeButton} onClick={handleShowAllCountries}>
          <img src="/img/home.png" alt="home button" />
          <p>home</p>
        </button>
      </Link>
      <Link to="/activities">
        <button className={styles.activityButton}>
          <img src="/img/caminata.png" alt="activities button" />
          <p>new activities</p>
        </button>
      </Link>
      <Link to="/ver">
        <button className={styles.showActivityButton}>
          <img
            src="/img/lista.png"
            alt="activities list button"
          />
          <p>activities list</p>
        </button>
      </Link>
      <Link to="/">
        <button className={styles.logoutButton}>
          <img src="/img/logout.png" alt="logout button" />
          <p>logout</p>
        </button>
      </Link>
    </div>
  );
};

export default NavBarSideBar;
