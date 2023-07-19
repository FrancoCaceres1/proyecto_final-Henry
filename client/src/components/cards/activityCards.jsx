import { deleteActivities, flipCard } from "../../redux/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./activityCards.module.css";

const ActivityCards = ({ activities }) => {
  const dispatch = useDispatch();
  const flippedCards = useSelector((state) => state.flippedCards);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState({
    id: "",
    name: "",
  });

  useEffect(() => {
    return () => {
      activities.forEach((activity) => {
        if (flippedCards[activity.id]) {
          dispatch(flipCard(activity.id));
        }
      });
    };
  }, [activities, flippedCards, dispatch]);

  const handleDelete = (id, name) => {
    setActivityToDelete({ id: id, name: name });
    console.log(activityToDelete);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (activityToDelete) {
      dispatch(deleteActivities(activityToDelete.id));
    }

    setShowDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleFlip = (cardId) => {
    dispatch(flipCard(cardId));
  };

  return (
    <div className={styles.container}>
      {activities.length > 0 ? (
        activities.map((activity) => (
          <div
            key={activity.id}
            className={`${styles.card} ${
              flippedCards.includes(activity.id) ? styles.flipped : ""
            }`}
          >
            <div className={styles.cardContent}>
              <div className={styles.front}>
                <div className={styles.detailContainer}>
                  <h3 className={styles.title}>{activity.name}</h3>
                  <div className={styles.details}>
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
                <div className={styles.buttonContainer}>
                  <button
                    className={styles.flipButton}
                    onClick={() => handleFlip(activity.id)}
                  >
                    Associated countries
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(activity.id, activity.name)}
                  >
                    <img src="/img/trash.png" alt="" />
                  </button>
                </div>
              </div>
              <div className={styles.back}>
                <div className={styles.countriesCountainer}>
                  <h4 className={styles.subtitle}>Associated countries</h4>
                  <ul className={styles.countryList}>
                    {activity.Countries.map((country, index) => (
                      <li key={index} className={styles.countryItem}>
                        <p>{country.name}</p>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={styles.flipButtonBack}
                    onClick={() => handleFlip(activity.id)}
                  >
                    &#9664;
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className={styles.error}>
          <h2>No activities were found</h2>
          <div className={styles.errorImage}>
            <img src="/img/noFoundActivity.png" alt="" />
          </div>
        </div>
      )}
      {showDeleteConfirmation && (
        <div className={styles.confirmationDialog}>
          <p>
            Are you sure you want to delete the {activityToDelete.name} activity?
          </p>
          <div className={styles.confirmationButtons}>
            <button onClick={handleConfirmDelete} className={styles.yesButton}>Yes</button>
            <button onClick={handleCancelDelete} className={styles.noButton}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityCards;
