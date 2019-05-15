import React, { Component } from "react";
import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";

class UnconnectedLogout extends Component {
  handleLogout = event => {
    event.stopPropagation();
    fetch("http://localhost:4000/logout", { credentials: "include" })
      .then(response => {
        return response.text();
      })
      .then(ResponseBody => {
        let body = JSON.parse(ResponseBody);
        if (body.success) {
          this.props.dispatch({ type: "logout" });
          //   this.props.history.push("/");
        }
      });
  };
  render = () => {
    return <button onClick={this.handleLogout}>Log Out</button>;
  };
}
let Logout = connect()(UnconnectedLogout);
// export default withRouter(Logout);
export default Logout;
