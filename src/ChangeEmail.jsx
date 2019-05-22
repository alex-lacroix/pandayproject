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
          <h3 className="change-email-title">Update Email</h3>

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
              className="password"
              type="text"
              onChange={this.handlePasswordChange}
              placeholder="Password"
            />
          </li>
          <p className="change-small-header">UPDATE EMAIL</p>
          <hr />
          <li>
            <input
              className="email"
              type="email"
              onChange={this.handleOldEmailChange}
              placeholder="Current Email"
            />
          </li>
          <li>
            <input
              className="email"
              type="email"
              onChange={this.handleNewEmailChange}
              placeholder="New Email"
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

let ChangeEmail = connect()(UnconnectedChangeEmail);

export default ChangeEmail;
