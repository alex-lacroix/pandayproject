import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedChangeEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      oldEmail: "",
      newEmail: ""
    };
  }

  handleUsernameChange = event => {
    console.log("username: ", event.target.value);
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = event => {
    console.log("password: ", event.target.value);
    this.setState({ password: event.target.value });
  };

  handleOldEmailChange = event => {
    console.log("old email: ", event.target.value);
    this.setState({ oldEmail: event.target.value });
  };

  handleNewEmailChange = event => {
    console.log("new email: ", event.target.value);
    this.setState({ newEmail: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    data.append("oldEmail", this.state.oldEmail);
    data.append("newEmail", this.state.newEmail);
    fetch("http://localhost:4000/changeEmail", {
      method: "POST",
      body: data
    })
      .then(response => {
        return response.text();
      })
      .then(ResponseBody => {
        let body = JSON.parse(ResponseBody);
        if (!body.success) {
          alert(
            "Your password or current email address do not match the information on hand."
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
            onChange={this.handleUsernameChange}
            placeholder="Username"
          />
          <input
            type="text"
            onChange={this.handlePasswordChange}
            placeholder="Password"
          />
          <input
            type="text"
            onChange={this.handleOldEmailChange}
            placeholder="Current Email Address"
          />
          <input
            type="text"
            onChange={this.handleNewEmailChange}
            placeholder="New Email Address"
          />
          <input type="submit" value="Change my email!" />
        </form>
      </div>
    );
  };
}

let ChangeEmail = connect()(UnconnectedChangeEmail);

export default ChangeEmail;
