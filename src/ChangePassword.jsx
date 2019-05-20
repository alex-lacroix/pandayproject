import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      oldPassword: "",
      newPassword: ""
    };
  }

  handleEmailChange = event => {
    console.log("email: ", event.target.value);
    this.setState({ email: event.target.value });
  };

  handleUsernameChange = event => {
    console.log("username: ", event.target.value);
    this.setState({ username: event.target.value });
  };

  handleOldPasswordChange = event => {
    console.log("oldPassword: ", event.target.value);
    this.setState({ oldPassword: event.target.value });
  };
  handleNewPasswordChange = event => {
    console.log("newPassword: ", event.target.value);
    this.setState({ newPassword: event.target.value });
  };

  handleSubmit = event => {
    this.props.togglePasswordHeight();
    event.preventDefault();
    let data = new FormData();
    data.append("email", this.state.email);
    data.append("username", this.state.username);
    data.append("oldPassword", this.state.oldPassword);
    data.append("newPassword", this.state.newPassword);
    fetch("http://localhost:4000/changePassword", {
      method: "POST",
      body: data
    })
      .then(response => {
        return response.text();
      })
      .then(ResponseBody => {
        let body = JSON.parse(ResponseBody);
        if (body.lengthSuccess === false) {
          alert("Make sure your new password has minimum 8 characters.");
          return;
        }
        if (body.success === false) {
          alert(
            "Your current password does not match the current password on hand."
          );
          return;
        }
      });
  };

  render = () => {
    let customCSS = {
      height: `${this.props.passwordChangeHeight}`,
      padding: `${this.props.passwordChangeHeight === 0 ? 0 : "10px"}`
    };
    return (
      <ul className="display-password-change" style={customCSS}>
        <form onSubmit={this.handleSubmit}>
          <p className="small-header">Please confirm your identity</p>
          <li>
            <p>Username: </p>
            <input
              className="username"
              type="text"
              onChange={this.handleUsernameChange}
            />
          </li>
          <p>Email Address: </p>
          <li>
            <input
              className="email"
              type="email"
              onChange={this.handleEmailChange}
            />
          </li>
          <p className="small-header">Now change your password</p>
          <li>
            <p>What is your current password? </p>
            <input
              className="password"
              type="text"
              onChange={this.handleOldPasswordChange}
            />
          </li>
          <p>What will your new password be? </p>
          <li>
            <input
              className="password"
              type="text"
              onChange={this.handleNewPasswordChange}
            />
          </li>
          <li>
            <input className="change-my-pass" type="submit" value="Submit" />
          </li>
        </form>
      </ul>
    );
  };
}

let ChangePassword = connect()(UnconnectedChangePassword);

export default ChangePassword;
