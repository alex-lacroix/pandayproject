import React, { Component } from "react";
import { connect } from "react-redux";
import EventDetails from "./EventDetails.jsx";

class UnconnectedSearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = { eventDetailsVisibility: "hidden" };
  }
  toggleEventDetailsVisibility = () => {
    this.setState({
      eventDetailsVisibility:
        this.state.eventDetailsVisibility === "hidden" ? "visible" : "hidden"
    });
  };
  storeResult = result => {
    console.log("*** I HAVE BEEN CLICKED");
    this.props.dispatch({ type: "store-result", searchResult: result });
    this.toggleEventDetailsVisibility();
  };

  render = () => {
    let customCSS = {
      height: `${this.props.searchResultsHeight}`,
      border: `${
        this.props.searchResultsHeight === 0 ? "none" : "1px solid #fbbe84"
      }`,
      padding: `${this.props.searchResultsHeight === 0 ? 0 : "20px"}`
    };
    return (
      <div>
        <ul className="search-results" style={customCSS}>
          {this.props.searchResults.length === 0 ? (
            <li>no results </li>
          ) : (
            this.props.searchResults.map(result => {
              return (
                <div onMouseDown={() => this.storeResult(result.eventId)}>
                  <ul className="results-details">
                    <li>{result.eventTitle}</li>
                    <li>{result.eventDate}</li>
                    <li>{result.eventTime}</li>
                    <li>{result.eventNotes.slice(0, 25) + "..."}</li>
                  </ul>
                </div>
              );
            })
          )}
        </ul>
        <EventDetails
          eventDetailsVisibility={this.state.eventDetailsVisibility}
          toggleEventDetailsVisibility={this.toggleEventDetailsVisibility}
        />
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { searchResults: state.searchResults };
};

let SearchResults = connect(mapStateToProps)(UnconnectedSearchResults);

export default SearchResults;
