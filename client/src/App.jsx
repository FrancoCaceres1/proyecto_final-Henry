// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./views/landingPage/landingPage";
import Home from "./views/homePage/homePage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
