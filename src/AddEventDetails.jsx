import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedAddEventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventDate: "",
      eventTime: "",
      eventHour: "",
      eventMinute: "",
      eventTitle: "",
      eventNotes: ""
    };
  }

  handleEventTitle = event => {
    console.log("**title", event.target.value);
    this.setState({ eventTitle: event.target.value });
  };
  handleEventDate = event => {
    console.log("**date chosen", event.target.value);
    this.setState({ eventDate: event.target.value });
  };

  handleEventTime = event => {
    console.log("**time chosen", event.target.value);
    this.setState({ eventTime: event.target.value });
  };

  handleEventDurationHour = event => {
    console.log("**hour chosen", event.target.value);
    this.setState({ eventHour: event.target.value });
  };

  handleEventDurationMinutes = event => {
    console.log("**minutes chosen", event.target.value);
    this.setState({ eventMinute: event.target.value });
  };

  handleEventNotes = event => {
    console.log("**event notes", event.target.value);
    this.setState({ eventNotes: event.target.value });
  };

  handleSubmit = event => {
    this.props.toggleDetailsDropdown();
    event.preventDefault();
    let data = new FormData();
    data.append("username", this.props.username);
    data.append("eventDate", this.state.eventDate);
    data.append("eventTime", this.state.eventTime);
    data.append("eventEnd", this.state.eventHour * 60 + this.state.eventMinute);
    data.append("eventCategory", this.props.category);
    data.append("eventTitle", this.state.eventTitle);
    data.append("eventNotes", this.state.eventNotes);
    fetch("http://localhost:4000/newEvent", { method: "POST", body: data })
      .then(response => {
        return response.text();
      })
      .then(ResponseBody => {
        let body = JSON.parse(ResponseBody);
        console.log("**body: ", body);
      });
  };

  render = () => {
    let customCSS = {
      height: `${this.props.eventDetailsHeight}px`,
      border: `${
        this.props.eventDetailsHeight === 0 ? "none" : "1px solid #fbbe84"
      }`,
      padding: `${this.props.eventDetailsHeight === 0 ? 0 : "10px"}`
    };
    return (
      <ul className="event-details-dropdown" style={customCSS}>
        <form onSubmit={this.handleSubmit}>
          <li>
            <span>Title: </span>
            <input
              className="event-title"
              type="text"
              onChange={this.handleEventTitle}
              placeholder="Enter title..."
              required
            />
          </li>

          <li>
            <span>Date: </span>
            <input
              className="event-date"
              type="date"
              onChange={this.handleEventDate}
              required
            />
          </li>
          <li>
            <span>Start Time: </span>
            <input
              className="event-time"
              type="time"
              onChange={this.handleEventTime}
              required
            />
          </li>
          <li>
            <span>How long? </span>
          </li>
          <li>
            <input
              className="event-hours"
              type="number"
              min="0"
              max="24"
              placeholder="0"
              onChange={this.handleEventDurationHour}
              required
            />
            <span>Hours</span>
          </li>
          <li>
            <input
              className="event-minutes"
              type="number"
              min="0"
              max="59"
              placeholder="0"
              step="5"
              onChange={this.handleEventDurationMinutes}
            />
            <span>Minutes</span>
          </li>
          <li>
            <span>Notes: </span>
            <textarea
              className="event-notes"
              rows="6"
              cols="30"
              maxLength="140"
              onChange={this.handleEventNotes}
              placeholder="ex. Don't forget.... !"
            />
          </li>
          <li>
            <input
              className="add-to-calendar"
              type="submit"
              value="Add to Calendar"
            />
          </li>
        </form>
      </ul>
    );
  };
}

let mapStateToProps = state => {
  return { username: state.username, category: state.category };
};

let AddEventDetails = connect(mapStateToProps)(UnconnectedAddEventDetails);

export default AddEventDetails;
