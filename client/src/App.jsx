import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import LandingPage from "./views/landingPage/landingPage";
import HomePage from "./views/homePage/homePage";
import DetailPage from "./views/detailPage/detailPage";
import FormPage from "./views/formPage/formPage";
import ActivitiesPage from "./views/activitiesPage/activitiesPage";
import * as actions from "./redux/actions";
import axios from "axios";
import "./App.css";

axios.defaults.baseURL = "https://pi-countries-api-flax.vercel.app/";

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getCountries());
    dispatch(actions.getActivities());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path='/activities' element={<FormPage />}/>
        <Route path='/ver' element={<ActivitiesPage />}/>
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;
