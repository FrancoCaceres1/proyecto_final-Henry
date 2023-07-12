import { Link } from "react-router-dom";
import styles from "./navBarSideBar.module.css";

const NavBarSideBar = () => {
  // const location = useLocation();
  // const isHomePage = location.pathname === "/home";

  return (
    <div className={styles.buttonContainer}>
      <Link to="/home">
      <button className={styles.homeButton}>
        <img src="../../../public/img/home.png" alt="home button" />
        <p>home</p>
      </button>
      </Link>
      <Link to="/activities">
        <button className={styles.activityButton}>
          <img src="../../../public/img/caminata.png" alt="activities button" />
          <p>activities</p>
        </button>
      </Link>
      <Link to="/">
        <button className={styles.logoutButton}>
          <img src="../../../public/img/logout.png" alt="logout button" />
          <p>logout</p>
        </button>
      </Link>
    </div>
  );
}

export default NavBarSideBar;