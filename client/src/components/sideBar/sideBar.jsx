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
      {/* <button className={styles.homeButton}>
        <img src="../../../public/img/home-01.png" alt="" />
      </button> */}
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
            <NavBarSideBar className={styles.navBarSideBar} />
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
