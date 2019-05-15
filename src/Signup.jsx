import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedSignup extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", email: "" };
  }

  handleUsernameChange = event => {
    console.log("signup username: ", event.target.value);
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = event => {
    console.log("signup password: ", event.target.value);
    this.setState({ password: event.target.value });
  };

  handleEmailChange = event => {
    console.log("signup email: ", event.target.value);
    this.setState({ email: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    data.append("email", this.state.email);
    fetch("http://localhost:4000/signup", { method: "POST", body: data })
      .then(response => {
        return response.text();
      })
      .then(ResponseBody => {
        let body = JSON.parse(ResponseBody);
        if (!body.success) {
          alert("signup fail");
          return;
        }
        this.props.dispatch({ type: "signup-success" });
        return fetch("http://localhost:4000/login", {
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
              alert("login failed..");
              return;
            }
            this.props.dispatch({ type: "login-success" });
            this.props.dispatch({
              type: "set-username",
              username: this.state.username
            });
          });
      });
  };

  render = () => {
    return (
      <div className="signupBody">
        <h1 className="name">Panday.</h1>
        <form className="signupContainer" onSubmit={this.handleSubmit}>
          <h2 className="signupTitle">SIGN UP</h2>
          <h3 className="signupReq">Choose a username</h3>
          <input
            type="text"
            onChange={this.handleUsernameChange}
            placeholder="Username"
            className="signupForm"
            required
          />
          <h3 className="signupReq">Choose a password (min. 8 characters)</h3>
          <input
            type="password"
            onChange={this.handlePasswordChange}
            placeholder="Password"
            className="passFormSignup"
            required
          />
          <h3 className="signupReq">Enter your e-mail address</h3>
          <input
            type="text"
            onChange={this.handleEmailChange}
            placeholder="E-mail Address"
            className="emailForm"
            required
          />
          <input type="submit" value="Signup Now" className="signupSubmit" />
        </form>
      </div>
    );
  };
}

let Signup = connect()(UnconnectedSignup);

export default Signup;
