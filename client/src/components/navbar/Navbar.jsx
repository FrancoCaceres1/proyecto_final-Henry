import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import * as actions from "../../Redux/actions";
import style from "./navbar.module.css";

const Navbar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getCountries());
  }, []);

  const handlerClick = (event) => {
    event.preventDefault();
    dispatch(actions.getCountries());
  };

  return (
    <div>
      <Link to="/home">
        <button className={style.button}>HOME</button>
      </Link>
      <Link to="/activities">
        <button className={style.button}>ACTIVIDADES</button>
      </Link>
      <Link to="/">
        <button className={style.button}>LOGOUT</button>
      </Link>
      <button className={style.button} onClick={handlerClick}>
        Reset Countries
      </button>
    </div>
  );
};

export default Navbar;