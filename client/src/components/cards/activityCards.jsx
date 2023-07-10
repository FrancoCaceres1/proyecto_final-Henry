import { deleteActivities } from "../../redux/actions";
import { useDispatch } from "react-redux";
import style from "./activityCards.module.css";

const ActivityCards = ({ activities }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteActivities(id));
  };
  return (
    <div className={style.container}>
      {activities.map((activity) => (
        <div key={activity.id} className={style.card}>
          <h3 className={style.title}>{activity.name}</h3>
          <p className={style.details}>
            Dificultad: {activity.difficulty}
            <br />
            Duración: {activity.duration} hs
            <br />
            Estación: {activity.season}
          </p>
          <h4 className={style.subtitle}>Países asociados:</h4>
          <ul className={style.countryList} key={activity.id}>
            {activity.Countries.map((country, index) => (
              <li key={index} className={style.countryItem}>
                {country.name}
              </li>
            ))}
          </ul>
          <button
            className={style.deleteButton}
            onClick={() => handleDelete(activity.id)}
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
};

export default ActivityCards;
