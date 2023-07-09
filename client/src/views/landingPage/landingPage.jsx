import style from "./landingPage.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const LandingPage = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showButtonText, setShowButtonText] = useState(true);
  const [isHoverDisabled, setIsHoverDisabled] = useState(false);

  useEffect(() => {
    setShowContent(true);
  }, []);

  const handleButtonClick = () => {
    setIsHoverDisabled(true);
    setIsLoading(true);
    setShowButtonText(false);
    setShowContent(false);
    setTimeout(() => {
      navigate("/home");
    }, 1500);
  };

  return (
    <div
      className={`${style.landingContainer} ${
        showContent ? style.transitionFade : ""
      }`}
    >
      <div className={`${style.satellite}`}></div>
      <div className={`${style.earth} ${style.animation}`}></div>
      <div
        className={`${style.estrella} ${style.estrellaImparPrimera} ${style.impar}`}
      ></div>
      <div
        className={`${style.estrella} ${style.estrellaParSegunda} ${style.par}`}
      ></div>
      <div
        className={`${style.estrella} ${style.estrellaImparTercera} ${style.impar}`}
      ></div>
      <div
        className={`${style.estrella} ${style.estrellaParCuarta} ${style.par}`}
      ></div>
      <div
        className={`${style.estrella} ${style.estrellaImparQuinta} ${style.impar}`}
      ></div>
      <div
        className={`${style.estrella} ${style.estrellaParsexta} ${style.par}`}
      ></div>
      <div
        className={`${style.estrella} ${style.estrellaImparSeptima} ${style.impar}`}
      ></div>
      <div
        className={`${style.estrella} ${style.estrellaParOctava} ${style.par}`}
      ></div>
      <button
        className={`${style.ingresarButton} ${
          isLoading ? style.loadingButton : ""
        } ${isHoverDisabled ? style.hoverDisabled : ""}`}
        onClick={handleButtonClick}
        disabled={isLoading}
      >
        <span
          className={`${style.buttonText} ${
            !showButtonText ? style.hidden : ""
          }`}
        >
          Start
        </span>
      </button>
    </div>
  );
};

export default LandingPage;
