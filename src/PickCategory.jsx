import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedPickCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { category: "" };
  }

  handleApptCategory = () => {
    this.setState({ category: "appointment" });
    this.props.dispatch({
      type: "set-category",
      category: this.state.category
    });
  };
  handleSchoolCategory = () => {
    this.setState({ category: "school" });
    this.props.dispatch({
      type: "set-category",
      category: this.state.category
    });
  };
  handleSocialCategory = () => {
    this.setState({ category: "social" });
    this.props.dispatch({
      type: "set-category",
      category: this.state.category
    });
  };
  handleWorkCategory = () => {
    this.setState({ category: "work" });
    this.props.dispatch({
      type: "set-category",
      category: this.state.category
    });
  };
  render = () => {
    let customCSS = {
      height: `${this.props.categoriesHeight}px`,
      borderColor: `${
        this.props.categoriesHeight === 0 ? "transparent" : "gold"
      }`
    };
    return (
      <div className="categories-dropdown" style={customCSS}>
        <img
          src="/appointment.png"
          height="100"
          onClick={this.handleApptCategory}
        />
        <img
          src="/school.jpg"
          height="100"
          onClick={this.handleSchoolCategory}
          alt="school"
        />
        <img
          src="/social.jpg"
          height="100"
          onClick={this.handleSocialCategory}
        />
        <img src="/work.png" height="100" onClick={this.handleWorkCategory} />
      </div>
    );
  };
}

let PickCategory = connect()(UnconnectedPickCategory);

export default PickCategory;
