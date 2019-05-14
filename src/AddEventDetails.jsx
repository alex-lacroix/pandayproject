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
    event.preventDefault();
    let data = new FormData();
    data.append("username", this.props.username);
    data.append("eventDate", this.state.eventDate);
    data.append("eventTime", this.state.eventTime);
    data.append(
      "eventDuration",
      this.state.eventHour + "." + this.state.eventMinute
    );
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
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleEventTitle}
            placeholder="Title"
          />
          <input type="date" onChange={this.handleEventDate} />
          <input type="time" onChange={this.handleEventTime} />
          <input type="number" onChange={this.handleEventDurationHour} />
          <span>Hours</span>
          <input type="number" onChange={this.handleEventDurationMinutes} />
          <span>Minutes</span>
          <textarea rows="3" cols="30" onChange={this.handleEventNotes} />
          <input type="submit" value="Create Event" />
        </form>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { username: "bob", category: state.category };
};

let AddEventDetails = connect(mapStateToProps)(UnconnectedAddEventDetails);

export default AddEventDetails;
