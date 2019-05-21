import React, { Component } from "react";
import { connect } from "react-redux";
import dateFns from "date-fns";
import NavBar from "./NavBar.jsx";
import MainDisplayEventDetails from "./MainDisplayEventDetails.jsx";

class UnconnectedCalendarWeek extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWeek: new Date(),
      selectedDate: new Date(),
      currentDay: new Date(),
      mainEventDetailsVisibility: "hidden"
    };
  }

  componentDidMount = () => {
    // event.preventDefault();
    let data = new FormData();
    data.append("username", this.props.username);
    let update = () => {
      fetch("http://localhost:4000/getUserEvents", {
        method: "POST",
        body: data,
        credentials: "include"
      })
        .then(response => {
          return response.text();
        })
        .then(ResponseBody => {
          let body = JSON.parse(ResponseBody);
          this.props.dispatch({
            type: "user-events",
            usersEvents: body.usersEvents
          });
          console.log(body);
        });
    };

    setInterval(update, 2000);
  };

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
        <div className="col col-end">
          <span onClick={this.nextWeek} className="changedate">
            NEXT WEEK
          </span>
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

  timecellOnclick = (date, hour) => {
    let eventFilter = this.props.usersEvents.filter(event => {
      let eventTime = event.eventTime;
      let eventEndTime = event.eventEndTime;
      let clickedTime = hour;
      let eventDate = event.eventDate;
      let clickedDate = date;

      let numerizedEventTime = Number(eventTime.substr(0, 2));
      let numerizedEventEndTime = Number(eventEndTime.substr(0, 2));
      let numerizedClickedTime = Number(clickedTime.substr(0, 2));

      return (
        !(numerizedClickedTime < numerizedEventTime) &&
        !(numerizedClickedTime > numerizedEventEndTime) &&
        eventDate === clickedDate
      );
    });
    this.props.dispatch({
      type: "store-eventId",
      eventId: eventFilter[0].eventId
    });
    this.toggleMainDetailsVisibility();
    // console.log("*event filter***", eventFilter);
  };

  toggleMainDetailsVisibility = () => {
    this.setState({
      mainEventDetailsVisibility:
        this.state.mainEventDetailsVisibility === "hidden"
          ? "visible"
          : "hidden"
    });
    this.props.dispatch({
      type: "modal-is-open",
      modalIsOpen: this.props.modalIsOpen ? false : true
    });
  };

  renderCells = () => {
    const { currentWeek, currentDay } = this.state;
    const startDay = dateFns.startOfDay(currentDay);
    const weekStart = dateFns.startOfWeek(currentWeek);
    const weekEnd = dateFns.endOfWeek(weekStart);
    const startDate = dateFns.startOfWeek(this.state.currentWeek);
    const endDate = dateFns.endOfWeek(weekEnd);
    const hourFormat = "HH:mm";
    const dayFormat = "YYYY-MM-D";
    const hours = [];
    const days = [];
    const endFormat = "m";

    let formattedDate = "";
    let time = startDay;
    let day = startDate;

    let timecell = "timecell";

    let resetCellColor = () => {
      timecell = "timecell";
      return;
    };

    let changeCellColor = (date, time) => {
      timecell = "timecell";
      this.props.usersEvents.map(event => {
        if (
          event.eventCategory === "work" &&
          event.eventDate === date &&
          event.eventTime === time
        ) {
          timecell = timecell + " red";
          return;
        } else if (
          event.eventCategory === "school" &&
          event.eventDate === date &&
          event.eventTime === time
        ) {
          timecell = timecell + " blue";
          return;
        } else if (
          event.eventCategory === "appointment" &&
          event.eventDate === date &&
          event.eventTime === time
        ) {
          timecell = timecell + " green";
          return;
        } else if (
          event.eventCategory === "social" &&
          event.eventDate === date &&
          event.eventTime === time
        ) {
          timecell = timecell + " yellow";
          return;
        }
      });
    };

    for (let i = 0; i < 7; i++) {
      let formattedDate = dateFns.format(day, dayFormat);
      day = dateFns.addDays(day, 1);

      for (let j = 0; j < 24; j++) {
        let formattedHour = dateFns.format(time, hourFormat);

        this.props.usersEvents.forEach(event => {
          if (
            event.eventDate === formattedDate &&
            event.eventTime === formattedHour
          ) {
            console.log("does it change the color?");
            changeCellColor(event.eventDate, event.eventTime);
            return;
          } else if (
            event.eventDate === formattedDate &&
            event.eventEndTime === formattedHour
          ) {
            console.log("its resetting the color");
            resetCellColor();
            return;
          }
        });
        hours.push(
          <div
            className={timecell}
            onClick={event => {
              event.stopPropagation();
              console.log("the date", formattedDate);
              this.timecellOnclick(formattedDate, formattedHour);
            }}
          >
            <div className="timetext">
              {formattedDate}
              {formattedHour}
            </div>
          </div>
        );
        time = dateFns.addHours(time, 1);
      }

      days.push(
        <div className="daycol col-center">
          <div className="h6">
            {dateFns.format(dateFns.addDays(startDate, i), dayFormat)}
          </div>
        </div>
      );
    }
    return <div className="column">{hours}</div>;
  };

  renderTime = () => {
    const { currentDay } = this.state;
    const hourFormat = "h:mm A";
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
        <MainDisplayEventDetails
          eventId={this.props.eventId}
          mainEventDetailsVisibility={this.state.mainEventDetailsVisibility}
          toggleMainDetailsVisibility={this.toggleMainDetailsVisibility}
        />
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

let mapStateToProps = state => {
  return {
    username: state.username,
    usersEvents: state.usersEvents,
    eventId: state.eventId,
    modalIsOpen: state.modalIsOpen
  };
};

let CalendarWeek = connect(mapStateToProps)(UnconnectedCalendarWeek);

export default CalendarWeek;
