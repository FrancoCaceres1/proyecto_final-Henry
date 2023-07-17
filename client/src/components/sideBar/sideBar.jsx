import { useState } from "react";
import styles from "./sideBar.module.css";
import NavBarSideBar from "../navBarSideBar/navBarSideBar";

const Sidebar = () => {
  const [isExpanded, setExpanded] = useState(false);

  const toggleSidebar = () => {
    setExpanded(!isExpanded);
  };

  return (
    <div className={styles.sidebar}>
      <button className={styles.toggleButton} onClick={toggleSidebar}>
        <span></span>
      </button>
      <NavBarSideBar />
      <div
        className={`${styles.content} ${isExpanded ? styles.showContent : ""}`}
      >
        {isExpanded && (
          <>
            <div className={styles.closeButtonContainer}>
              <button className={styles.closeButton} onClick={toggleSidebar}>
                <span></span>
              </button>
              <p>Countries.API</p>
            </div>
            <div className={styles.navBarSideBarContainer}>
            <NavBarSideBar className={styles.navBarSideBar} />
            <span className={styles.line}></span>
            <div className={styles.buttonContainer}>
              <a href="https://github.com/FrancoCaceres1" rel="noreferrer" target="_blank">
                <button className={styles.gitButton}>
                  <img src="../../../public/img/github.png" alt="github"/>
                  <p>github</p>
                </button>
              </a>
              <a href="https://www.linkedin.com/in/franco-c%C3%A1ceres-2731a0273/" rel="noreferrer" target="_blank">
                <button className={styles.linButton}>
                  <img src="../../../public/img/linkedin.png" alt="linkedin"/>
                  <p>linkedin</p>
                </button>
              </a>
            </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
