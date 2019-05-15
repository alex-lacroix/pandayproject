import ReactDOM from "react-dom";
import React from "react";
import App from "./App.jsx";
import "./calendarmonth.css";
import "./calendarweek.css";
import { Provider } from "react-redux";
import { Route, BrowserRouter } from "react-router-dom";
import store from "./store.jsx";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
