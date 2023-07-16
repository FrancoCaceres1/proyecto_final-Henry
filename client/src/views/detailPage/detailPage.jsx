import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import * as actions from "./../../redux/actions";
import Header from "../../components/header/header";
import Sidebar from "../../components/sideBar/sideBar";
import styles from "./detailPage.module.css";

const DetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const countryDetail = useSelector((state) => state.countryDetail);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(actions.getCountryDetail(id));
      } catch (error) {
        alert("Error: " + error.response.data.error);
      }
    };

    fetchData();
  }, [dispatch, id]);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <Header></Header>
        <div className={styles.titleContainer}>
          <img src="../../../public/img/place.png" alt="" />
          <h1>{countryDetail[0]?.name}</h1>
        </div>
        <div className={styles.navContainer}>
          <button onClick={() => window.history.back()}>&#9664; Back</button>
        </div>
        <div className={styles.boxContainer}>
          <div className={styles.box}>
            <div className={styles.imgContainer}>
              <img
                src={countryDetail[0]?.image}
                alt={countryDetail[0]?.name}
                className={styles.img}
              />
            </div>
            <div className={styles.activities}>
              <h2>Activities created in the country</h2>
              {countryDetail[0]?.Activities.length > 0 ? (
                <div className={styles.textActivities}>
                  <h3>{countryDetail[0]?.Activities.length}</h3>
                  <Link to="/ver">
                    <button className={styles.seeButton}>See Activities</button>
                  </Link>
                </div>
              ) : (
                <h3 className={styles.textActivities}>0</h3>
              )}
            </div>
          </div>
          <div className={styles.box2}>
            <h2 className={styles.text}>
              ID: <span>{countryDetail[0]?.id}</span>
            </h2>
            <h3 className={styles.text}>
              Area:{" "}
              <span>
                {countryDetail[0]?.area} km<sup>2</sup>
              </span>
            </h3>
            <h3 className={styles.text}>
              Capital: <span>{countryDetail[0]?.capital}</span>
            </h3>
            <h3 className={styles.text}>
              Continent: <span>{countryDetail[0]?.continent}</span>
            </h3>

            <h3 className={styles.text}>
              Subregion: <span>{countryDetail[0]?.subregion}</span>
            </h3>
            <h3 className={styles.text}>
              Population: <span>{countryDetail[0]?.population}</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
