import React, { Component } from "react";
import ReactDOM from "react-dom";
import dateFns from "date-fns";

class CalendarMonth extends Component {
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
    const dateFormat = "D";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat); //returns the formatted date in the given format, in this case D (day of the year)
        const cloneDay = day; //prevents onClick event to always take endDate as clicked value
        days.push(
          <div
            className={`monthCol cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
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

export default CalendarMonth;
