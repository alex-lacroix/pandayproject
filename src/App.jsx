import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "./NavBar.jsx";
import CalendarMonth from "./CalendarMonth.jsx";
import CalendarWeek from "./CalendarWeek.jsx";
import "./calendar.css";

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
            <NavBar />
          </div>
        </header>
        <main>
          <CalendarMonth />
          <CalendarWeek />
        </main>
      </div>
    );
  };
}

let App = connect()(UnconnectedApp);
export default App;
