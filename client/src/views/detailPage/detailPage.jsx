import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
        <div className={styles.box}>
          <img
            src={countryDetail[0]?.image}
            alt={countryDetail[0]?.name}
            className={styles.img}
          />
        </div>

        <div className={styles.box2}>
          <h2 className={styles.text}>ID: {countryDetail[0]?.id}</h2>
          <h2 className={styles.text}>País: {countryDetail[0]?.name}</h2>
          <h3 className={styles.text}>
            Continente: {countryDetail[0]?.continent}
          </h3>
          <h3 className={styles.text}>Capital: {countryDetail[0]?.capital}</h3>
          <h3 className={styles.text}>
            Subregión: {countryDetail[0]?.subregion}
          </h3>
          <h3 className={styles.text}>Área: {countryDetail[0]?.area} m3</h3>
          <h3 className={styles.text}>
            Población: {countryDetail[0]?.population} habitantes
          </h3>
          <h2>Actividades creadas en el país: </h2>
          {countryDetail[0]?.Activities.length > 0 ? (
            <div>
              {countryDetail[0]?.Activities.map((activity) => (
                <p key={activity.id} className={styles.text}>
                  Actividad: {activity.name}
                  <br />
                  Dificultad: {activity.difficulty}
                  <br />
                  Duración: {activity.duration} hs
                  <br />
                  Estación: {activity.season}
                </p>
              ))}
            </div>
          ) : (
            <h3
              className={styles.text}
            >{`El país ${countryDetail[0]?.name} no tiene actividades asociadas`}</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
