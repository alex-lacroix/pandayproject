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
        if (!body.lengthSuccess) {
          alert("Make sure your new password has minimum 8 characters.");
          return;
        }
        if (!body.success) {
          alert(
            "Your current password does not match the current password on hand."
          );
          return;
        }
      });
  };

  render = () => {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleEmailChange}
            placeholder="Email Address"
          />
          <input
            type="text"
            onChange={this.handleUsernameChange}
            placeholder="Username"
          />
          <input
            type="text"
            onChange={this.handleOldPasswordChange}
            placeholder="Current Password"
          />
          <input
            type="text"
            onChange={this.handleNewPasswordChange}
            placeholder="New Password"
          />
          <input type="submit" value="Change my password!" />
        </form>
      </div>
    );
  };
}

let ChangePassword = connect()(UnconnectedChangePassword);

export default ChangePassword;
