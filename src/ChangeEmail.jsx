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
    this.props.toggleEmailHeight();
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
    let customCSS = {
      height: `${this.props.emailChangeHeight}`,
      padding: `${this.props.emailChangeHeight === 0 ? 0 : "10px"}`
    };
    return (
      <ul className="display-email-change" style={customCSS}>
        <form onSubmit={this.handleSubmit}>
          <h3>Update your email</h3>
          <p className="small-header">Please confirm your identity</p>
          <li>
            <p>Username: </p>
            <input
              className="username"
              type="text"
              onChange={this.handleUsernameChange}
            />
          </li>
          <p>Password: </p>
          <li>
            <input
              className="password"
              type="text"
              onChange={this.handlePasswordChange}
            />
          </li>
          <p className="small-header">Now change your email</p>
          <li>
            <p>What is your current email? </p>
            <input
              className="email"
              type="email"
              onChange={this.handleOldEmailChange}
            />
          </li>
          <p>What is your new email? </p>
          <li>
            <input
              className="email"
              type="email"
              onChange={this.handleNewEmailChange}
            />
          </li>
          <li>
            <input className="change-my-email" type="submit" value="Submit" />
          </li>
        </form>
      </ul>
    );
  };
}

let ChangeEmail = connect()(UnconnectedChangeEmail);

export default ChangeEmail;
