import style from "./landingPage.module.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className={style.landingContainer}>
      <h1>Bienvenidos</h1>
      <div className="background-image"></div>
      <Link to="/home">
        <button>Ingresar</button>
      </Link>
    </div>
  );
};

export default LandingPage;
