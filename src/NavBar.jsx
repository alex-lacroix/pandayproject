import React, { Component } from "react";
import { connect } from "react-redux";
import Search from "./Search.jsx";
import PickCategory from "./PickCategory.jsx";
import AddEventDetails from "./AddEventDetails.jsx";
import Logout from "./Logout.jsx";
import "./main.css";

class UnconnectedNavBar extends Component {
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
      this.state.eventDetailsHeight === 375;
    this.setState({
      categoriesHeight: modalIsOpen ? 0 : 250,
      eventDetailsHeight: 0
    });
  };
  toggleDetailsDropdown = () => {
    this.setState({
      eventDetailsHeight: this.state.eventDetailsHeight === 0 ? 375 : 0
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
          <button onClick={displayToggle} className="see-more-button">
            {this.state.buttonDisplay ? "SEE WEEK" : "SEE MONTH"}
          </button>
        </div>
      </div>
    );
  };

  render = () => {
    return (
      <nav className="navbar">
        <ul className="ul">
          <li className="officialName">Panday.</li>
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
