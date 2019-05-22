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
          <h3 className="change-email-title">Update Password</h3>

          <p className="change-small-header">CONFIRM YOUR IDENTITY</p>
          <hr />
          <li>
            <input
              className="username"
              type="text"
              onChange={this.handleUsernameChange}
              placeholder="Username"
            />
          </li>

          <li>
            <input
              className="email"
              type="email"
              onChange={this.handleEmailChange}
              placeholder="Password"
            />
          </li>
          <p className="change-small-header">UPDATE PASSWORD</p>
          <hr />
          <li>
            <input
              className="email"
              type="text"
              onChange={this.handleOldPasswordChange}
              placeholder="Current Password"
            />
          </li>

          <li>
            <input
              className="email"
              type="text"
              onChange={this.handleNewPasswordChange}
              placeholder="New Password"
            />
          </li>
          <li>
            <input className="change-my-email" type="submit" value="SUBMIT" />
          </li>
        </form>
      </ul>
    );
  };
}

let ChangePassword = connect()(UnconnectedChangePassword);

export default ChangePassword;
