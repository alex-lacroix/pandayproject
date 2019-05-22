import React, { Component } from "react";
import { connect } from "react-redux";
import SearchResultEventDetails from "./SearchResultEventDetails.jsx";

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
    this.props.dispatch({
      type: "modal-is-open",
      modalIsOpen: this.props.modalIsOpen ? false : true
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
      border: `${this.props.searchResultsHeight === 0 ? "none" : "none"}`,
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
        <SearchResultEventDetails
          eventDetailsVisibility={this.state.eventDetailsVisibility}
          toggleEventDetailsVisibility={this.toggleEventDetailsVisibility}
        />
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { searchResults: state.searchResults, modalIsOpen: state.modalIsOpen };
};

let SearchResults = connect(mapStateToProps)(UnconnectedSearchResults);

export default SearchResults;
