import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import dateFns from "date-fns";

class UnconnectedCalendarMonth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: new Date(), //display current month
      selectedDate: new Date() //display today's date
    };
  }
  renderHeader = () => {
    const dateFormat = "MMMM YYYY";

    return (
      <div className="header row flex-middle">
        <div className="monthCol monthCol-start">
          <span className="changedate" onClick={this.prevMonth}>
            PREVIOUS MONTH
          </span>
        </div>
        <div className="monthCol monthCol-center">
          <div className="text">
            {dateFns.format(this.state.currentMonth, dateFormat)}
          </div>
        </div>
        <div className="monthCol monthCol-end" onClick={this.nextMonth}>
          <span className="changedate">NEXT MONTH</span>
        </div>
      </div>
    );
  };

  renderDays = () => {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);
    for (let i = 0; i < 7; i++) {
      //looping through the days of the week
      days.push(
        <div className="monthCol monthCol-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days monthRow">{days}</div>;
  };

  renderCells = () => {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    const dateFormat = "YYYY-MM-D";
    const dayFormat = "D";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    let formattedDay = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        formattedDay = dateFns.format(day, dayFormat);
        let visibility = {};
        this.props.usersEvents.forEach(event => {
          if (
            event.eventCategory === "work" &&
            event.eventDate === formattedDate
          ) {
            visibility.work = true;
          } else if (
            event.eventCategory === "school" &&
            event.eventDate === formattedDate
          ) {
            visibility.school = true;
          } else if (
            event.eventCategory === "appointment" &&
            event.eventDate === formattedDate
          ) {
            visibility.appointment = true;
          } else if (
            event.eventCategory === "social" &&
            event.eventDate === formattedDate
          ) {
            visibility.social = true;
          }
        });

        const cloneDay = day;
        days.push(
          <div
            className={`monthCol cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="number">{formattedDay}</span>
            <div className="dot-container">
              <div
                style={{ visibility: visibility.work ? "visible" : "hidden" }}
                className="work-dot"
              />
              <div
                style={{ visibility: visibility.school ? "visible" : "hidden" }}
                className="school-dot"
              />
              <div
                style={{
                  visibility: visibility.appointment ? "visible" : "hidden"
                }}
                className="app-dot"
              />
              <div
                style={{ visibility: visibility.social ? "visible" : "hidden" }}
                className="social-dot"
              />
            </div>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="monthRow" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };
  render = () => {
    return (
      <div className="monthCalendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  };
}
let mapStateToProps = state => {
  return { usersEvents: state.usersEvents };
};

let CalendarMonth = connect(mapStateToProps)(UnconnectedCalendarMonth);

export default CalendarMonth;
