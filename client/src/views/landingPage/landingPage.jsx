import styles from "./landingPage.module.css";
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
      className={`${styles.landingContainer} ${
        showContent ? styles.transitionFade : ""
      }`}
    >
      <div className={styles.container}>
        <div className={styles.welcomeContainer}>
          <h1>Countries.API</h1>
          <div className={`${styles.earth} ${styles.animation}`}></div>
          <button
            className={`${styles.ingresarButton} ${
              isLoading ? styles.loadingButton : ""
            } ${isHoverDisabled ? styles.hoverDisabled : ""}`}
            onClick={handleButtonClick}
            disabled={isLoading}
          >
            <span
              className={`${styles.buttonText} ${
                !showButtonText ? styles.hidden : ""
              }`}
            >
              Start
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
