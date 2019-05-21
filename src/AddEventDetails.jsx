import React, { Component } from "react";
import { connect } from "react-redux";
import dateFns from "date-fns";

class UnconnectedAddEventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventDate: "",
      eventTime: "00:00",
      eventEndTime: "00:00",
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

  handleEventEndTime = event => {
    console.log("**end time chosen: ", event.target.value);
    this.setState({ eventEndTime: event.target.value });
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
    data.append("eventEndTime", this.state.eventEndTime);
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
    this.setState({
      eventTitle: "",
      eventDate: "",
      eventTime: "00:00",
      eventEndTime: "00:00",
      eventNotes: ""
    });
  };

  render = () => {
    let customCSS = {
      height: `${this.props.eventDetailsHeight}`,
      border: `${
        this.props.eventDetailsHeight === 0 ? "none" : "1px solid #fbbe84"
      }`,
      padding: `${this.props.eventDetailsHeight === 0 ? 0 : "10px"}`
    };
    return (
      <ul className="event-details-dropdown" style={customCSS}>
        <form onSubmit={this.handleSubmit}>
          <li>
            <p className="small-header">Title</p>
            <input
              className="event-title"
              type="text"
              onChange={this.handleEventTitle}
              placeholder="Enter title..."
              value={this.state.eventTitle}
              required
            />
          </li>

          <li>
            <p className="small-header">Date</p>
            <input
              className="event-date"
              type="date"
              onChange={this.handleEventDate}
              value={this.state.eventDate}
              required
            />
          </li>
          <li>
            <p className="small-header">Start Time</p>
            <input
              className="event-time"
              type="time"
              onChange={this.handleEventTime}
              value={this.state.eventTime}
              required
            />
          </li>
          <li>
            <p className="small-header">End Time</p>
          </li>
          <li>
            <input
              className="event-time"
              type="time"
              onChange={this.handleEventEndTime}
              value={this.state.eventEndTime}
              required
            />
          </li>
          <li>
            <p className="small-header">Notes</p>
            <textarea
              className="event-notes"
              rows="6"
              cols="30"
              maxLength="140"
              onChange={this.handleEventNotes}
              value={this.state.eventNotes}
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
