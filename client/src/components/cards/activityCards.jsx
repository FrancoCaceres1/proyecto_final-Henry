import { deleteActivities, flipCard } from "../../redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./activityCards.module.css";

const ActivityCards = ({ activities }) => {
  const dispatch = useDispatch();
  const flippedCards = useSelector((state) => state.flippedCards);

  useEffect(() => {
    return () => {
      activities.forEach((activity) => {
        if (flippedCards[activity.id]) {
          dispatch(flipCard(activity.id));
        }
      });
    };
  }, [activities, flippedCards, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteActivities(id));
  };

  const handleFlip = (cardId) => {
    dispatch(flipCard(cardId));
  };

  return (
    <div className={style.container}>
      {activities.map((activity) => (
        <div
          key={activity.id}
          className={`${style.card} ${
            flippedCards.includes(activity.id) ? style.flipped : ""
          }`}
        >
          <div className={style.cardContent}>
            <div className={style.front}>
              <div className={style.detailContainer}>
                <h3 className={style.title}>{activity.name}</h3>
                <div className={style.details}>
                  <p>
                    Difficulty: <span>{activity.difficulty}</span>
                  </p>
                  <p>
                    Duration: <span>{activity.duration} hs</span>
                  </p>
                  <p>
                    Season: <span>{activity.season}</span>
                  </p>
                </div>
              </div>
              <div className={style.buttonContainer}>
                <button
                  className={style.flipButton}
                  onClick={() => handleFlip(activity.id)}
                >
                  Associated countries
                </button>
                <button
                  className={style.deleteButton}
                  onClick={() => handleDelete(activity.id)}
                >
                  <img src="../../../public/img/trash.png" alt="" />
                </button>
              </div>
            </div>
            <div className={style.back}>
              <div className={style.countriesCountainer}>
                <h4 className={style.subtitle}>Associated countries</h4>
                <ul className={style.countryList}>
                  {activity.Countries.map((country, index) => (
                    <li key={index} className={style.countryItem}>
                      <p>{country.name}</p>
                    </li>
                  ))}
                </ul>
                <button
                  className={style.flipButtonBack}
                  onClick={() => handleFlip(activity.id)}
                >
                  &#9664;
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityCards;
