import React, { Component } from "react";
import { connect } from "react-redux";
import Search from "./Search.jsx";
import PickCategory from "./PickCategory.jsx";
import AddEventDetails from "./AddEventDetails.jsx";
import "./main.css";

class UnconnectedNavBar extends Component {
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
            <p onClick={this.toggleDropdown} className="categories-toggle">
              +
            </p>
            <PickCategory categoriesHeight={this.state.categoriesHeight} />
          </li>
          {/* <AddEventDetails /> */}
          <li>
            <Search />
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
