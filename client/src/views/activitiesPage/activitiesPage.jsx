import { useSelector } from "react-redux";
import ActivityCards from "../../components/cards/activityCards";
import Header from "../../components/header/header";
import Sidebar from "../../components/sideBar/sideBar";
import styles from "./activitiesPage.module.css";

const ActivitiesPage = () => {
  const activities = useSelector((state) => state.allActivities);
  
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <Header></Header>
        <div className={styles.titleContainer}>
          <h1>Activities</h1>
        </div>
        <div className={styles.navContainer}>
          <button onClick={() => window.history.back()}>&#9664; Back</button>
        </div>
        <div className={styles.cardsContent}>
          <ActivityCards activities={activities} />
        </div>
      </div>
    </div>
  );
};

export default ActivitiesPage;
