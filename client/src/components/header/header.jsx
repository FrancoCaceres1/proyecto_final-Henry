import { useLocation } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import styles from "./header.module.css";

const Header = ({onFilterChange}) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Countries.API</h1>
      {isHomePage && (
      <div className={styles.search}>
        <SearchBar onFilterChange={onFilterChange}/>
      </div>
      )}
      <div className={`${styles.earth} ${styles.animation}`}></div>
    </header>
  );
};

export default Header;
