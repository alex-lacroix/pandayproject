import React, { Component } from "react";
import { connect } from "react-redux";
import SearchResults from "./SearchResults.jsx";

class UnconnectedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      searchResultsHeight: 0
    };
  }

  handleSearch = event => {
    console.log("search: ", event.target.value);
    this.setState({ searchQuery: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    let data = new FormData();
    data.append("searchQuery", this.state.searchQuery);
    data.append("username", this.props.username);
    if (this.state.searchQuery.length > 0) {
      fetch("http://localhost:4000/searchForEvent", {
        method: "POST",
        body: data
      })
        .then(response => {
          return response.text();
        })
        .then(ResponseBody => {
          let body = JSON.parse(ResponseBody);
          this.props.dispatch({
            type: "store-search-results",
            searchResults: body.searchResults
          });
          console.log(body);
        });
      this.setState({
        searchResultsHeight: "fit-content"
      });
    } else {
      this.handleClearSearchResults();
    }
  };
  handleClearSearchResults = () => {
    console.log("on blurtriggered");
    this.setState({ searchResultsHeight: 0, searchQuery: "" });
    this.props.dispatch({ type: "store-search-results", searchResults: [] });
  };

  render = () => {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleSearch}
            onBlur={this.handleClearSearchResults}
            value={this.state.searchQuery}
            className="searchBox searchBar"
            placeholder="Search..."
          />
        </form>
        <SearchResults searchResultsHeight={this.state.searchResultsHeight} />
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { username: state.username };
};

let Search = connect(mapStateToProps)(UnconnectedSearch);

export default Search;
