import React, { Component } from "react";
import Search from "./Search.jsx";
import "./main.css";

class NavBar extends Component {
  render = () => {
    return (
      <div className="navbar">
        <h1 className="officialName">Panday.</h1>
        <ul>
          <Search />
        </ul>
      </div>
    );
  };
}

export default NavBar;
