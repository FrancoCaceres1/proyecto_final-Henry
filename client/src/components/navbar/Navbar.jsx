import { Link, useLocation } from "react-router-dom";
import styles from "./navbar.module.css";

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  return (
    <div className={styles.container}>
      <Link to="/home">
        <button className={styles.homeButton}>
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
          <button className={styles.button}>Ver</button>
        </Link>
      )}
      {location.pathname === "/ver" && (
        <button className={styles.button} onClick={() => window.history.back()}>
          Back
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

export default Navbar;
