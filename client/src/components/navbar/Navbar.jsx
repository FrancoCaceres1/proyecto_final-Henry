import { Link, useLocation } from "react-router-dom";
import style from "./navbar.module.css";

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  return (
    <div>
      <Link to="/home">
        <button className={style.button}>HOME</button>
      </Link>
      {isHomePage && (
        <Link to="/activities">
          <button className={style.button}>ACTIVIDADES</button>
        </Link>
      )}
      {location.pathname === "/activities" && (
        <Link to="/ver">
          <button className={style.button}>Ver</button>
        </Link>
      )}
      {location.pathname === "/ver" && (
        <button className={style.button} onClick={() => window.history.back()}>
          Back
        </button>
      )}
      <Link to="/">
        <button className={style.button}>LOGOUT</button>
      </Link>
    </div>
  );
};

export default Navbar;
