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
        <h2 className="settings-header">Account settings</h2>
        <h3 className="settings-title">ACCOUNT PREFERENCES</h3>
        <hr />

        <div className="settings-container">
          <div className="settings-flex">
            <ul className="settings-display">
              <li>
                <h3 className="settings-h3">Email Address</h3>
                <p className="set-info">{this.props.email}</p>
                <ChangeEmail
                  toggleEmailHeight={this.toggleEmailHeight}
                  emailChangeHeight={this.state.emailChangeHeight}
                />
              </li>
              <li>
                <h3 className="settings-h3">Change password</h3>
                <p className="set-info">
                  Password must be at least 8 characters long
                </p>
                <ChangePassword
                  togglePasswordHeight={this.togglePasswordHeight}
                  passwordChangeHeight={this.state.passwordChangeHeight}
                />
              </li>
            </ul>
          </div>
          <div className="buttons-flex">
            <button
              onClick={this.togglePasswordHeight}
              className="change-settings-button"
            >
              CHANGE
            </button>
            <button
              onClick={this.toggleEmailHeight}
              className="change-settings-button"
            >
              CHANGE
            </button>
          </div>
        </div>

        <h3 className="settings-title">CONNECTED ACCOUNTS</h3>
        <hr />
        <div className="settings-container">
          <div className="settings-flex">
            <ul className="settings-display">
              <li>
                <h3 className="settings-h3">Connect to Twitter</h3>
                <p className="set-info">
                  Connect your calendar to your Twitter account.
                  <br />
                  Panday will never post without your permission.
                </p>
              </li>
              <li>
                <h3 className="settings-h3">Connect to Facebook</h3>
                <p className="set-info">
                  Connect your calendar to your Facebook account.
                  <br />
                  Panday will never post without your permission.
                </p>
              </li>
            </ul>
          </div>
          <div className="buttons-flex">
            <button
              onClick={this.togglePasswordHeight}
              className="twitter-connect-button"
            >
              CONNECT TO TWITTER
            </button>
            <button
              onClick={this.toggleEmailHeight}
              className="facebook-connect-button"
            >
              CONNECT TO FACEBOOK
            </button>
          </div>
        </div>

        <h3 className="settings-title">DEACTIVATE ACCOUNT</h3>
        <hr />
        <div className="settings-container">
          <div className="settings-flex">
            <ul className="settings-display">
              <li>
                <h3 className="settings-h3">Delete this account</h3>
                <p className="set-info">
                  Warning! This will permanently delete your account
                  <br />
                  and all events associated with it.
                </p>
              </li>
            </ul>
          </div>
          <button className="delete-account-button" />
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { email: state.email };
};
let Settings = connect(mapStateToProps)(UnconnectedSettings);

export default Settings;
