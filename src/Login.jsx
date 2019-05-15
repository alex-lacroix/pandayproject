import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, withRouter, Link } from "react-router-dom";

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

  renderSignup = () => {
    event.preventDefault();
  };

  render = () => {
    return (
      <div className="loginBody">
        <h1 className="name">Panday.</h1>
        <form className="loginContainer" onSubmit={this.handleSubmit}>
          <h3 className="loginTitle">MEMBER LOGIN</h3>
          <input
            type="text"
            onChange={this.handleUsernameChange}
            placeholder="Username"
            className="loginForm"
          />
          <input
            type="password"
            onChange={this.handlePasswordChange}
            placeholder="Password"
            className="passForm"
          />
          <input type="submit" value="Login Now" className="loginSubmit" />
        </form>
        <div className="toSignup">
          <h2 className="notMember">Not a member?</h2>
          <div>
            <Link to="/signup">
              <button type="button" className="createButton">
                Create account
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  };
}

let Login = connect()(UnconnectedLogin);

export default withRouter(Login);
