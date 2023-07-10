import { Link, useLocation } from "react-router-dom";
import styles from "./navBarSideBar.module.css";

const NavBarSideBar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  return (
    <div>
      <Link to="/home">
      <button className={styles.homeButton}>
        <img src="../../../public/img/home-01.png" alt="" />
      </button>
      </Link>
    </div>
  );
}

export default NavBarSideBar;