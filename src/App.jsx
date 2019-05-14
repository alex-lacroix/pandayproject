import React, { Component } from "react";
import { connect } from "react-redux";
import CalendarMonth from "./CalendarMonth.jsx";
import CalendarWeek from "./CalendarWeek.jsx";
import "./calendarmonth.css";
import "./calendarweek.css";

class UnconnectedApp extends Component {
  componentDidMount = () => {
    fetch("http://localhost:4000/autoLogin", { credentials: "include" })
      .then(response => {
        return response.text();
      })
      .then(ResponseBody => {
        let body = JSON.parse(ResponseBody);
        if (body.success) {
          this.props.dispatch({ type: "login-success" });
          this.props.dispatch({
            type: "set-username",
            username: body.username
          });
        }
      });
  };

  render = () => {
    return (
      <div className="App">
        <header>
          <div id="logo">
            <span className="icon" />
            <span>Panday</span>
          </div>
        </header>
        <main>
          <CalendarWeek />
        </main>
      </div>
    );
  };
}

let App = connect()(UnconnectedApp);
export default App;
