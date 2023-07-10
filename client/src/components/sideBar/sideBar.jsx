import { useState } from "react";
import styles from "./sideBar.module.css";
import Navbar from "../navbar/navbar";
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
            <Navbar />
            <button className={styles.closeButton} onClick={toggleSidebar}>
              X
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
