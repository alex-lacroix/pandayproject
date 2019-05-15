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
    let modalIsOpen =
      this.state.categoriesHeight === 250 ||
      this.state.eventDetailsHeight === 250;
    this.setState({
      categoriesHeight: modalIsOpen ? 0 : 250,
      eventDetailsHeight: 0
    });
  };
  toggleDetailsDropdown = () => {
    this.setState({
      eventDetailsHeight: this.state.eventDetailsHeight === 0 ? 250 : 0
    });
  };
  render = () => {
    return (
      <nav className="navbar">
        <ul className="ul">
          <li className="officialName">Panday.</li>
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
            <AddEventDetails
              eventDetailsHeight={this.state.eventDetailsHeight}
              toggleDetailsDropdown={this.toggleDetailsDropdown}
            />
          </li>
          <li>
            <Search />
          </li>
        </ul>
      </nav>
    );
  };
}

export default NavBar;
