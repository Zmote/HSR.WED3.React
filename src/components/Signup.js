// @flow

import React from "react";
import { Redirect } from "react-router-dom";
import { Input, Button } from "semantic-ui-react";

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
        <h1>Bank of Rapperswil</h1>
        <form>
          <h2>Registrieren</h2>
          <Input
            onChange={this.handleLoginChanged}
            placeholder="Login"
            value={this.state.login}
          />
          <Input
            onChange={this.handleFirstNameChanged}
            placeholder="Vorname"
            value={this.state.firstname}
          />
          <Input
            onChange={this.handleLastNameChanged}
            placeholder="Nachname"
            value={this.state.lastname}
          />
          <Input
            onChange={this.handlePasswordChanged}
            placeholder="Passwort"
            type="password"
            value={this.state.password}
          />
          <Button onClick={this.handleSubmit}>Account eröffnen</Button>
        </form>
        {error && <p>Es ist ein Fehler aufgetreten!</p>}
      </div>
    );
  }
}

export default Signup;
