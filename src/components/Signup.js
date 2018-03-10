// @flow

import React from "react";
import { Redirect } from "react-router-dom";

import { signup } from "../api";

class Signup extends React.Component<{}, *> {
  state = {
    login: "",
    firstname: "",
    lastname: "",
    password: "",
    error: null,
    redirectToReferrer: false
  };

  handleLoginChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ login: event.target.value });
    }
  };

  handleFirstNameChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ firstname: event.target.value });
    }
  };

  handleLastNameChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ lastname: event.target.value });
    }
  };

  handlePasswordChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ password: event.target.value });
    }
  };

  handleSubmit = (event: Event) => {
    event.preventDefault();
    const { login, firstname, lastname, password } = this.state;
    signup(login, firstname, lastname, password)
      .then(result => {
        console.log("Signup result ", result);
        this.setState({ redirectToReferrer: true, error: null });
      })
      .catch(error => this.setState({ error }));
  };

  render() {
    const { redirectToReferrer, error } = this.state;

    if (redirectToReferrer) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        <div className="ui padded grid">
          <div className="row">
            <div className="column">
              <h1 className="ui top attached block header">Bank of Rapperswil</h1>
              <form className="ui bottom attached segment vertically padded grid form">

                <div className="row">
                  <div className="column">
                    <h2>Registrieren</h2>
                    <div className="field">
                      <label>Login</label>
                      <input
                        onChange={this.handleLoginChanged}
                        placeholder="Login"
                        value={this.state.login}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="column">
                    <div className="field">
                      <label>Firstname</label>
                      <input
                        onChange={this.handleFirstNameChanged}
                        placeholder="Vorname"
                        value={this.state.firstname}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="column">
                    <div className="field">
                      <label>Lastname</label>
                      <input
                        onChange={this.handleLastNameChanged}
                        placeholder="Nachname"
                        value={this.state.lastname}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="column">
                    <div className="field">
                      <label>Password</label>
                      <input
                        onChange={this.handlePasswordChanged}
                        placeholder="Passwort"
                        type="password"
                        value={this.state.password}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="column">
                    <button className="ui primary button" onClick={this.handleSubmit}>Account eröffnen</button>
                  </div>
                </div>

              </form>

              <div className="ui grid">
                {error &&
                <div className="row">
                  <div className="column">
                    <p className="ui pointing red basic label">Es ist ein Fehler aufgetreten!</p>
                  </div>
                </div>}
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
