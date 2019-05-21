import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedEventDetails extends Component {
  render = () => {
    let customCSS = {
      visibility: `${this.props.eventDetailsVisibility}`
    };

    let eventFilter = this.props.usersEvents.filter(
      event => event.eventId === this.props.searchResult
    );
    let event = eventFilter[0];
    if (event === undefined) return <div />;

    return (
      <div style={customCSS}>
        <ul className="event-details-modal">
          <li
            className="close-event-details"
            onClick={this.props.toggleEventDetailsVisibility}
          >
            X
          </li>
          <li className="event-details-header">{event.eventTitle}</li>
          <li className="event-details-subheader">Date</li>
          <li className="event-details-info">{event.eventDate}</li>
          <li className="event-details-subheader">Time</li>
          <li className="event-details-info">
            from {event.eventTime} to {event.eventEndTime}
          </li>
          <li className="event-details-subheader">Notes</li>
          <li className="event-details-info">{event.eventNotes}</li>
        </ul>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { searchResult: state.searchResult, usersEvents: state.usersEvents };
};

let SearchResultEventDetails = connect(mapStateToProps)(
  UnconnectedEventDetails
);

export default SearchResultEventDetails;
