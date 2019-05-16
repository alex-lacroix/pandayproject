import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "./NavBar.jsx";
import CalendarMonth from "./CalendarMonth.jsx";
import CalendarWeek from "./CalendarWeek.jsx";
import "./calendarmonth.css";
import "./calendarweek.css";
import "./login.css";
import "./signup.css";
import Login from "./Login.jsx";
import { Route, withRouter } from "react-router-dom";
import Signup from "./Signup.jsx";

class UnconnectedApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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

  renderCalendar = () => {
    if (!this.props.display) {
      return (
        <div>
          <NavBar />
          <CalendarWeek />
        </div>
      );
    }
    return (
      <div>
        <NavBar />
        <CalendarMonth />
      </div>
    );
  };

  renderLogin = () => {
    return <Login />;
  };

  renderSignup = () => {
    return <Signup />;
  };

  render = () => {
    return (
      <div>
        <div className="App">
          <Route exact={true} path="/" render={this.renderLogin} />
          <Route exact={true} path="/signup" render={this.renderSignup} />
          <Route exact={true} path="/mycalendar" render={this.renderCalendar} />
        </div>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return { display: state.display };
};

let App = connect(mapStateToProps)(UnconnectedApp);
export default withRouter(App);
