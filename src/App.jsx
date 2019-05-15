import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "./NavBar.jsx";
import CalendarMonth from "./CalendarMonth.jsx";
import CalendarWeek from "./CalendarWeek.jsx";
import "./calendarmonth.css";
import "./calendarweek.css";

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
      return <CalendarWeek />;
    }
    return <CalendarMonth />;
  };

  render = () => {
    return (
      <div className="App">
        <header>
          <div>
            <span className="icon" />
            <NavBar />
          </div>
        </header>
        <main>{this.renderCalendar()}</main>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return { display: state.display };
};

let App = connect(mapStateToProps)(UnconnectedApp);
export default App;
