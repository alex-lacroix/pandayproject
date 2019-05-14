import ReactDOM from "react-dom";
import React from "react";
import App from "./App.jsx";
import "./calendarmonth.css";
import "./calendarweek.css";
import { Provider } from "react-redux";
import store from "./store.jsx";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
