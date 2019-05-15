import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }
  handleUsernameChange = event => {
    console.log("login username: ", event.target.value);
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = event => {
    console.log("login password: ", event.target.value);
    this.setState({ password: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    fetch("http://localhost:4000/login", {
      method: "POST",
      body: data,
      credentials: "include"
    })
      .then(response => {
        return response.text();
      })
      .then(ResponseBody => {
        let body = JSON.parse(ResponseBody);
        if (!body.success) {
          alert("Incorrect password!");
          return;
        }
        if (!body.doesUserExist) {
          alert("Please create an account!");
          return;
        }
        this.props.dispatch({ type: "login-success" });
        this.props.dispatch({
          type: "set-username",
          username: this.state.username
        });
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
          <input type="submit" value="Log in!" />
        </form>
      </div>
    );
  };
}

let Login = connect()(UnconnectedLogin);

export default Login;
