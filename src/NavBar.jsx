import React, { Component } from "react";
import { connect } from "react-redux";
import Search from "./Search.jsx";
import PickCategory from "./PickCategory.jsx";
import AddEventDetails from "./AddEventDetails.jsx";
import Settings from "./Settings.jsx";
import Logout from "./Logout.jsx";
import "./main.css";

class UnconnectedNavBar extends Component {
  constructor() {
    super();
    this.state = {
      categoriesHeight: 0,
      eventDetailsHeight: 0,
      settingsBackground: "transparent",
      settingsVisibility: "hidden",
      buttonDisplay: false
    };
  }
  toggleCategoriesDropdown = () => {
    let modalIsOpen =
      this.state.categoriesHeight === 325 ||
      this.state.eventDetailsHeight === "fit-content";
    this.setState({
      categoriesHeight: modalIsOpen ? 0 : 325,
      eventDetailsHeight: 0
    });
  };
  toggleDetailsDropdown = () => {
    this.setState({
      eventDetailsHeight:
        this.state.eventDetailsHeight === 0 ? "fit-content" : 0
    });
  };
  toggleSettingsVisibility = () => {
    this.setState({
      settingsVisibility:
        this.state.settingsVisibility === "hidden" ? "visible" : "hidden",
      settingsBackground:
        this.state.settingsBackground === "transparent" ? "#777" : "transparent"
    });
  };

  renderDisplayButton = () => {
    let displayToggle = () => {
      this.setState({ buttonDisplay: !this.state.buttonDisplay });
      console.log(this.state.buttonDisplay);
      if (!this.state.buttonDisplay) {
        this.props.dispatch({ type: "toggle-calendar", payload: true });
        return;
      }
      this.props.dispatch({ type: "toggle-calendar", payload: false });
    };

    return (
      <div>
        <div className="justify-center">
          <button onClick={displayToggle} className="toggleButton">
            {this.state.buttonDisplay ? "See Week" : "See Month"}
          </button>
        </div>
      </div>
    );
  };

  render = () => {
    return (
      <nav className="navbar">
        <div className="pandayName">
          <img className="headerLogo" src="logopanda.png" />
          <div className="officialName">Panday.</div>
        </div>
        <ul className="ul">
          <li>{this.renderDisplayButton()}</li>
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

          <li>
            <img
              src="settings.png"
              className="settings-gear"
              onClick={this.toggleSettingsVisibility}
            />
            <Settings
              settingsVisibility={this.state.settingsVisibility}
              settingsBackground={this.state.settingsBackground}
              toggleSettingsVisibility={this.toggleSettingsVisibility}
            />
          </li>
          <li>
            <Logout />
          </li>
        </ul>
      </nav>
    );
  };
}
let mapStateToProps = state => {
  return { display: state.display };
};
let NavBar = connect(mapStateToProps)(UnconnectedNavBar);
export default NavBar;
