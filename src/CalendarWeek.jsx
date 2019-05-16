import React, { Component } from "react";
import dateFns from "date-fns";
import NavBar from "./NavBar.jsx";

class CalendarWeek extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWeek: new Date(),
      selectedDate: new Date(),
      currentDay: new Date()
    };
  }

  renderHeader = () => {
    const dateFormat = "MMMM D YYYY";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <span className="changedate" onClick={this.prevWeek}>
            PREVIOUS WEEK
          </span>
        </div>
        <div className="col col-center">
          <div className="text">
            {dateFns.format(this.state.currentWeek, dateFormat)}
          </div>
        </div>
        <div className="col col-end" onClick={this.nextWeek}>
          <span className="changedate">NEXT WEEK</span>
        </div>
      </div>
    );
  };

  renderDays = () => {
    const dateFormat = "dddd D";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentWeek);
    for (let i = 0; i < 7; i++) {
      //looping through the days of the week
      days.push(
        <div className="col col-center">
          <div className="text">
            {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
          </div>
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  };

  renderWeek = () => {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentWeek);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }
  };

  renderCells = () => {
    const { currentWeek } = this.state;
    const weekStart = dateFns.startOfWeek(currentWeek);
    const weekEnd = dateFns.endOfWeek(weekStart);
    const startDate = dateFns.startOfWeek(weekStart);
    const endDate = dateFns.endOfWeek(weekEnd);
    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat); //format the date as D
        days.push(<div className="col weekcell" />);
        day = dateFns.addDays(day, 1);
      }
      for (let i = 0; i < 24; i++) {
        rows.push(<div className="row">{days}</div>);
      }
    }
    return <div className="body">{rows}</div>;
  };

  renderTime = () => {
    const { currentDay } = this.state;
    const hourFormat = "H:mm A";
    const startDay = dateFns.startOfDay(currentDay);
    const timeCol = [];

    let timeslot = [];
    let time = startDay;
    let formattedHour = "";

    //for every hour in the day
    for (let i = 0; i < 24; i++) {
      formattedHour = dateFns.format(time, hourFormat); //render hour in H A format (hour, am/pm)
      timeslot.push(<div className="time">{formattedHour}</div>); //push the formatted hour into the timeslot array
      time = dateFns.addHours(time, 1); //add 1 hour to every element

      timeCol.push(<div>{timeslot}</div>); //push the formatted hours into the column array
      timeslot = []; //prevents the hours from repeating
    }
    return <div className="timecol">{timeCol}</div>;
  };

  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
  };

  nextWeek = () => {
    this.setState({
      currentWeek: dateFns.addWeeks(this.state.currentWeek, 1)
    });
  };

  renderNavBar = () => {
    return <NavBar />;
  };

  prevWeek = () => {
    this.setState({
      currentWeek: dateFns.subWeeks(this.state.currentWeek, 1)
    });
  };

  render = () => {
    return (
      <div className="calendarweek">
        {this.renderTime()}
        <div className="calendar">
          {this.renderHeader()}
          {this.renderDays()}
          {this.renderCells()}
        </div>
      </div>
    );
  };
}

export default CalendarWeek;
