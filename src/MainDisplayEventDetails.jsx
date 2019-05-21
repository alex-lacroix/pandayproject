import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedMainEventDetails extends Component {
  render = () => {
    let customCSS = {
      visibility: `${this.props.mainEventDetailsVisibility}`
    };

    let eventFilter = this.props.usersEvents.filter(
      event => event.eventId === this.props.eventId
    );
    let event = eventFilter[0];
    if (event === undefined) return <div />;
    // console.log("****the event", event.eventTitle);

    return (
      <div style={customCSS}>
        <ul className="event-details-modal">
          <span
            className="close-event-details"
            onClick={this.props.toggleMainDetailsVisibility}
          >
            &times;
          </span>
          <li className="event-details-header">{event.eventTitle}</li>
          <hr />
          <li className="event-details-subheader">DATE</li>
          <li className="event-details-info">{event.eventDate}</li>
          <li className="event-details-subheader">TIME</li>
          <li className="event-details-info">
            from {event.eventTime} to {event.eventEndTime}
          </li>
          <li className="event-details-subheader">NOTES</li>
          <li className="event-details-info">{event.eventNotes}</li>
        </ul>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { usersEvents: state.usersEvents };
};

let MainDisplayEventDetails = connect(mapStateToProps)(
  UnconnectedMainEventDetails
);

export default MainDisplayEventDetails;
