import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import LandingPage from "./views/landingPage/landingPage";
import HomePage from "./views/homePage/homePage";
import DetailPage from "./views/detailPage/detailPage";
import Navbar from "./components/navbar/Navbar";
import SearchBar from "./components/searchBar/SearchBar";
import FormPage from "./views/formPage/formPage";
import * as actions from "./redux/actions";
import "./App.css";

function App() {
  const location = useLocation();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getCountries());
    dispatch(actions.getActivities());
  }, [dispatch]);

  return (
    <div>
      {location.pathname !== "/" && <Navbar />}
      {location.pathname === "/home" && <SearchBar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path='/activities' element={<FormPage/>}/>
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;
