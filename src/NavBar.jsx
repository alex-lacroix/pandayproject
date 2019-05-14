import React, { Component } from "react";
import Search from "./Search.jsx";
import PickCategory from "./PickCategory.jsx";
import AddEventDetails from "./AddEventDetails.jsx";
import "./main.css";

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      categoriesHeight: 0,
      eventDetailsHeight: 0
    };
  }
  toggleCategoriesDropdown = () => {
    if (this.state.eventDetailsHeight > 0) return;
    this.setState({
      categoriesHeight: this.state.categoriesHeight === 0 ? 200 : 0
    });
  };
  toggleDetailsDropdown = () => {
    this.setState({
      eventDetailsHeight: this.state.eventDetailsHeight === 0 ? 200 : 0
    });
  };
  render = () => {
    return (
      <nav className="navbar">
        <h1 className="officialName">Panday.</h1>
        <ul>
          <Search />
          <li className="categories">
            <p
              onClick={this.toggleCategoriesDropdown}
              className="categories-toggle"
            >
              +
            </p>
            <PickCategory
              categoriesHeight={this.state.categoriesHeight}
              toggleCategoriesDropdown={this.toggleCategoriesDropdown}
              toggleDetailsDropdown={this.toggleDetailsDropdown}
            />
          </li>
          <li className="event-details">
            <AddEventDetails
              eventDetailsHeight={this.state.eventDetailsHeight}
            />
          </li>
        </ul>
      </nav>
    );
  };
}

export default NavBar;
