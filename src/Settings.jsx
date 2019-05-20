import React, { Component } from "react";
import { connect } from "react-redux";
import ChangeEmail from "./ChangeEmail.jsx";
import ChangePassword from "./ChangePassword.jsx";

class UnconnectedSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailChangeHeight: 0,
      passwordChangeHeight: 0
    };
  }

  toggleEmailHeight = () => {
    this.setState({
      emailChangeHeight: this.state.emailChangeHeight === 0 ? "fit-content" : 0
    });
  };

  togglePasswordHeight = () => {
    this.setState({
      passwordChangeHeight:
        this.state.passwordChangeHeight === 0 ? "fit-content" : 0
    });
  };

  render = () => {
    let customCSS = {
      visibility: `${this.props.settingsVisibility}`
    };
    return (
      <div className="settings-modal" style={customCSS}>
        <h2 className="settings-header">User Settings</h2>
        <ul className="settings-display">
          <li>
            <h3 className="settings-h3" onClick={this.toggleEmailHeight}>
              Change my email
            </h3>
            <ChangeEmail
              toggleEmailHeight={this.toggleEmailHeight}
              emailChangeHeight={this.state.emailChangeHeight}
            />
          </li>
          <li>
            <h3 className="settings-h3" onClick={this.togglePasswordHeight}>
              Change my password
            </h3>
            <ChangePassword
              togglePasswordHeight={this.togglePasswordHeight}
              passwordChangeHeight={this.state.passwordChangeHeight}
            />
          </li>
        </ul>
      </div>
    );
  };
}

let Settings = connect()(UnconnectedSettings);

export default Settings;
