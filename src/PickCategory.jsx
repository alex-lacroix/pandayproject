import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedPickCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { category: "" };
  }

  handleApptCategory = () => {
    this.props.toggleCategoriesDropdown();
    // this.setState({ category: "appointment" });
    this.props.dispatch({
      type: "set-category",
      category: "appointment"
    });
    this.props.toggleDetailsDropdown();
  };
  handleSchoolCategory = () => {
    this.props.toggleCategoriesDropdown();
    // this.setState({ category: "school" });
    this.props.dispatch({
      type: "set-category",
      category: "school"
    });

    this.props.toggleDetailsDropdown();
  };
  handleSocialCategory = () => {
    this.props.toggleCategoriesDropdown();
    // this.setState({ category: "social" });
    this.props.dispatch({
      type: "set-category",
      category: "social"
    });

    this.props.toggleDetailsDropdown();
  };
  handleWorkCategory = () => {
    this.props.toggleCategoriesDropdown();
    // this.setState({ category: "work" });
    this.props.dispatch({
      type: "set-category",
      category: "work"
    });

    this.props.toggleDetailsDropdown();
  };
  render = () => {
    let customCSS = {
      height: `${this.props.categoriesHeight}px`,
      border: `${this.props.categoriesHeight === 0 ? "none" : "none"}`,
      padding: `${this.props.categoriesHeight === 0 ? 0 : 10}`
    };
    return (
      <div className="categories-dropdown" style={customCSS}>
        <div className="cat-container">
          <div className="name-toprow">
            <p className="catwork">WORK</p>
            <p className="catschool">SCHOOL</p>
          </div>
          <div className="cat-toprow">
            <button
              className="category-work"
              onClick={this.handleWorkCategory}
              alt="work"
            >
              <img className="caticon" src="/workicon.png" />
            </button>
            <button
              className="category-school"
              onClick={this.handleSchoolCategory}
              alt="school"
            >
              <img className="caticon" src="/schoolicon.png" />
            </button>
          </div>
          <div className="name-toprow">
            <p className="catapp">APPOINTMENT</p>
            <p className="catsocial">SOCIAL</p>
          </div>
          <div className="cat-toprow">
            <button
              className="category-appointment"
              onClick={this.handleApptCategory}
              alt="appointment"
            >
              <img className="caticon" src="/appointmenticon.png" />
            </button>
            <button
              className="category-social"
              onClick={this.handleSocialCategory}
              alt="social"
            >
              <img className="caticon" src="/socialicon.png" />
            </button>
          </div>
        </div>
      </div>
    );
  };
}

let PickCategory = connect()(UnconnectedPickCategory);

export default PickCategory;
