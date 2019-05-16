import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ""
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
  };

  render = () => {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleSearch}
            className="searchBox searchBar"
            placeholder="Search..."
          />
        </form>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { username: state.username };
};

let Search = connect(mapStateToProps)(UnconnectedSearch);

export default Search;
