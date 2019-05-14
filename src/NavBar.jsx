import React, { Component } from "react";
import Search from "./Search.jsx";
import PickCategory from "./PickCategory.jsx";
import AddEventDetails from "./AddEventDetails.jsx";
import "./main.css";

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      categoriesHeight: 0
    };
  }
  toggleDropdown = () => {
    this.setState({
      categoriesHeight: this.state.categoriesHeight === 0 ? 200 : 0
    });
  };
  render = () => {
    return (
      <div className="navbar">
        <h1>Panday</h1>
        <nav>
          <ul>
            <Search />
            <li className="categories">
              <p onClick={this.toggleDropdown} className="categories-toggle">
                +
              </p>
              <PickCategory categoriesHeight={this.state.categoriesHeight} />
            </li>
            <AddEventDetails />
          </ul>
        </nav>
        <h1 className="officialName">Panday.</h1>
        <ul>
          <Search />
        </ul>
      </div>
    );
  };
}

export default NavBar;
