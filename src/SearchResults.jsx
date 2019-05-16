import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedSearchResults extends Component {
  render = () => {
    let customCSS = {
      height: `${this.props.searchResultsHeight}`,
      border: `${
        this.props.searchResultsHeight === 0 ? "none" : "1px solid #fbbe84"
      }`,
      padding: `${this.props.searchResultsHeight === 0 ? 0 : "20px"}`
    };
    return (
      <ul className="search-results" style={customCSS}>
        {this.props.searchResults.length === 0 ? (
          <li>no results </li>
        ) : (
          this.props.searchResults.map(result => {
            return (
              <ul className="results-details">
                <li>{result.eventTitle}</li>
                <li>{result.eventDate}</li>
                <li>{result.eventTime}</li>
                <li>{result.eventNotes.slice(0, 25) + "..."}</li>
              </ul>
            );
          })
        )}
      </ul>
    );
  };
}

let mapStateToProps = state => {
  return { searchResults: state.searchResults };
};

let SearchResults = connect(mapStateToProps)(UnconnectedSearchResults);

export default SearchResults;
