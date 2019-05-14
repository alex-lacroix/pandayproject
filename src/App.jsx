import React, { Component } from "react";
import CalendarMonth from "./CalendarMonth.jsx";
import CalendarWeek from "./CalendarWeek.jsx";
import "./calendarmonth.css";
import "./calendarweek.css";

class App extends Component {
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

export default App;
