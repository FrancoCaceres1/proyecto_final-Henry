import { useSelector } from "react-redux";
import ActivityCards from "../../components/cards/activityCards";
import Navbar from "../../components/navbar/navbar"

const ActivitiesPage = () => {
  const activities = useSelector((state) => state.allActivities);
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <h2>Activities</h2>
      <ActivityCards activities={activities} />
    </div>
  );
};

export default ActivitiesPage;