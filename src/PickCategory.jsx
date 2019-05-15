import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedPickCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { category: "" };
  }

  handleApptCategory = () => {
    this.props.toggleCategoriesDropdown();
    this.setState({ category: "appointment" });
    this.props.dispatch({
      type: "set-category",
      category: this.state.category
    });
    this.props.toggleDetailsDropdown();
  };
  handleSchoolCategory = () => {
    this.props.toggleCategoriesDropdown();
    this.setState({ category: "school" });
    this.props.dispatch({
      type: "set-category",
      category: this.state.category
    });
    this.props.toggleDetailsDropdown();
  };
  handleSocialCategory = () => {
    this.props.toggleCategoriesDropdown();
    this.setState({ category: "social" });
    this.props.dispatch({
      type: "set-category",
      category: this.state.category
    });
    this.props.toggleDetailsDropdown();
  };
  handleWorkCategory = () => {
    this.props.toggleCategoriesDropdown();
    this.setState({ category: "work" });
    this.props.dispatch({
      type: "set-category",
      category: this.state.category
    });
    this.props.toggleDetailsDropdown();
  };
  render = () => {
    let customCSS = {
      height: `${this.props.categoriesHeight}px`,
      border: `${
        this.props.categoriesHeight === 0 ? "none" : "1px solid #fbbe84"
      }`,
      padding: `${this.props.categoriesHeight === 0 ? 0 : 10}`
    };
    return (
      <div className="categories-dropdown" style={customCSS}>
        <img
          className="category-pics"
          src="/appointment.png"
          onClick={this.handleApptCategory}
          alt="appointment"
        />
        <img
          className="category-pics"
          src="/school.jpg"
          onClick={this.handleSchoolCategory}
          alt="school"
        />
        <img
          className="category-pics"
          src="/social.jpg"
          onClick={this.handleSocialCategory}
          alt="social"
        />
        <img
          className="category-pics"
          src="/work.png"
          onClick={this.handleWorkCategory}
          alt="work"
        />
      </div>
    );
  };
}

let PickCategory = connect()(UnconnectedPickCategory);

export default PickCategory;
