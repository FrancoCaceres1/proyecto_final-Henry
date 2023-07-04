// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
// import store from "./redux/store";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Provider> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </Provider> */}
  </React.StrictMode>
);
