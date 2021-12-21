import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import HostelDetails from "./routes/hostel";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Itinerary from "./routes/itinerary";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="hostel" element={<HostelDetails />} />
          <Route path="itinerary" element={<Itinerary />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
