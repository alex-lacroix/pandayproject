import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedEventDetails extends Component {
  render = () => {
    let customCSS = {
      visibility: `${this.props.eventDetailsVisibility}`
    };

    return (
      <div className="event-details" style={customCSS}>
        ID: {this.props.searchResult}
        {this.props.usersEvents.map(event => {
          return (
            <div>
              {event.eventId === this.props.searchResult ? (
                <ul>
                  <li>{event.eventTitle}</li>
                  <li>{event.eventDate}</li>
                  <li>{event.eventTime}</li>
                  <li>{event.eventEndTime}</li>
                  <li>{event.eventNotes}</li>
                </ul>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { searchResult: state.searchResult, usersEvents: state.usersEvents };
};

let EventDetails = connect(mapStateToProps)(UnconnectedEventDetails);

export default EventDetails;
