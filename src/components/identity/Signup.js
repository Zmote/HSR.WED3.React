// @flow

import React from "react";
import { Redirect } from "react-router-dom";

import { signup } from "../../api";

class Signup extends React.Component<{}, *> {
  state = {
      login: "",
      firstname: "",
      lastname: "",
      password: "",
      confirmPassword: "",
      error: null,
      redirectToReferrer: false,
      loginError: undefined,
      firstNameError: undefined,
      lastNameError: undefined,
      passwordError: undefined,
      passwordConfirmError: undefined,
      needsLoginReminder: false,
      needsFirstNameReminder: false,
      needsLastNameReminder: false,
      needsPasswordReminder: false,
      needsConfirmPasswordReminder: false
  };

    componentDidMount() {
        // If targetAccountNr and targetAmount initialized empty, show notifications on component load
        this.checkLogin("");
        this.checkFirstName("");
        this.checkLastName("");
        this.checkPassword("");
    }

  checkLogin = (login:String) => {
    if(login.length < 4){
      this.setState({loginError:{message:"Login muss mindestends drei Charakter lang sein"}})
    }else{
      this.setState({loginError:undefined});
    }
  };

  checkFirstName = (firstName:String) => {
    if(firstName.length < 1){
      this.setState({firstNameError:{message:"Firstname darf nicht leer sein"}})
    }else{
      this.setState({firstNameError:undefined});
    }
  };

  checkLastName = (lastname:String) => {
    if(lastname.length < 1){
      this.setState({lastNameError:{message:"Lastname darf nicht leer sein"}})
    }else{
      this.setState({lastNameError:undefined});
    }
  };

  checkPassword = (password:String) => {
    if(password.length < 4){
      this.setState({passwordError:{message:"Password muss mindestends drei Chrakter lang sein"}})
    }else{
      this.setState({passwordError:undefined});
    }
  };

  checkConfirmPassword = (confirmPassword:String) => {
      if(confirmPassword !== this.state.password){
          this.setState({passwordConfirmError:{message:"Eingegebenes Passwort stimmt nicht überein"}})
      }else{
          this.setState({passwordConfirmError:undefined});
      }
  };

  handleLoginChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      const login = event.target.value;
      this.setState({login});
      this.checkLogin(login);

    }
  };

  handleFirstNameChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      const firstname = event.target.value;
      this.setState({firstname});
      this.checkFirstName(firstname);
    }
  };

  handleLastNameChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      const lastname = event.target.value;
        this.setState({lastname});
        this.checkLastName(lastname);
    }
  };

  handlePasswordChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      const password = event.target.value;
      this.setState({password});
      this.checkPassword(password);
      this.checkConfirmPassword(this.state.confirmPassword);
    }
  };

  handleConfirmPasswordChanged = (event: Event) => {
      if (event.target instanceof HTMLInputElement) {
          const confirmPassword = event.target.value;
          this.setState({confirmPassword});
          this.checkConfirmPassword(confirmPassword);
      }
  };

  handleSubmit = (event: Event) => {
    event.preventDefault();
    const { login, firstname, lastname, password } = this.state;

    if (!login.length || !lastname.length || !firstname.length || !password.length){
        if(!login.length) {
            this.setState({needsLoginReminder: true});
        }
        if(!lastname.length){
            this.setState({needsLastNameReminder: true});
        }
        if(!firstname.length){
            this.setState({needsFirstNameReminder: true});
        }
        if(!password.length){
            this.setState({needsPasswordReminder: true});
        }
    }else{
        signup(login, firstname, lastname, password)
            .then(result => {
                // console.log("Signup result ", result);
                this.setState({ redirectToReferrer: true, error: null });
            })
            .catch(error => this.setState({ error }));
    }
  };

  render() {
    const { redirectToReferrer, error, loginError, firstNameError, lastNameError, passwordError, passwordConfirmError, needsFirstNameReminder, needsLastNameReminder, needsLoginReminder, needsPasswordReminder, needsConfirmPasswordReminder } = this.state;

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
                          <label>Firstname</label>
                          <input
                              onChange={this.handleFirstNameChanged}
                              placeholder="Vorname"
                              value={this.state.firstname}
                          />
                          {firstNameError &&
                          <div className={"ui pointing basic label " + (needsFirstNameReminder ? "red" : "")}>
                              {firstNameError.message}
                          </div>
                          }
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
                        {lastNameError &&
                        <div className={"ui pointing basic label " + (needsLastNameReminder ? "red" : "")}>
                            {lastNameError.message}
                        </div>
                        }
                    </div>
                  </div>
                </div>

                <div className="row">
                    <div className="column">
                        <div className="field">
                            <label>Login</label>
                            <input
                                onChange={this.handleLoginChanged}
                                placeholder="Login"
                                value={this.state.login}
                            />
                            {loginError &&
                            <div className={"ui pointing basic label " + (needsLoginReminder ? "red" : "")}>
                                {loginError.message}
                            </div>
                            }
                        </div>
                    </div>
                </div>

                <div className="row">
                  <div className="column">
                    <div className="field">
                      <label>Password</label>
                      <input
                        onChange={this.handlePasswordChanged}
                        placeholder="Password"
                        type="password"
                        value={this.state.password}
                      />
                        {passwordError &&
                        <div className={"ui pointing basic label " + (needsPasswordReminder ? "red" : "")}>
                            {passwordError.message}
                        </div>
                        }
                    </div>
                  </div>
                </div>

                <div className="row">
                    <div className="column">
                        <div className="field">
                            <label>Confirm Password</label>
                            <input
                                onChange={this.handleConfirmPasswordChanged}
                                placeholder="Confirm Password"
                                type="password"
                                value={this.state.confirmPassword}
                            />
                            {passwordConfirmError &&
                            <div className={"ui pointing basic label " + (needsConfirmPasswordReminder ? "red" : "")}>
                                {passwordConfirmError.message}
                            </div>
                            }
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
