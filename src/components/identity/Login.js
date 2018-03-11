// @flow

import React from "react";
import {Redirect, Link} from "react-router-dom";

export type Props = {
    /* Callback to submit an authentication request to the server */
    authenticate: (login: string,
                   password: string,
                   callback: (error: ?Error) => void) => void,
    /* We need to know what page the user tried to access so we can
       redirect after logging in */
    location: {
        state?: {
            from: string
        }
    }
};

class Login extends React.Component<Props, *> {
    state = {
        login: "",
        password: "",
        error: undefined,
        redirectToReferrer: false,
        passwordError: undefined,
        usernameError: undefined,
        loginInProcess: false
    };

    checkPassword = (password: String) => {
        if (password.length < 4) {
            this.setState({passwordError: {message: "Passwort muss mindestends drei Charakter lang sein"}})
        } else {
            this.setState({passwordError: undefined});
        }
    };

    checkLogin = (login: String) => {
        if (login.length < 4) {
            this.setState({usernameError: {message: "Benutzername muss mindestens drei Charakter lang sein"}})
        } else {
            this.setState({usernameError: undefined});
        }
    };

    handleLoginChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            const login = event.target.value;
            this.setState({login});
            this.checkLogin(login);
        }
    };

    handlePasswordChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            const password = event.target.value;
            this.setState({password});
            this.checkPassword(password);
        }
    };

    handleSubmit = (event: Event) => {
        event.preventDefault();
        this.setState({loginInProcess: true});
        const {login, password} = this.state;
        this.props.authenticate(login, password, error => {
            if (error) {
                this.setState({error});
            } else {
                this.setState({redirectToReferrer: true, error: null});
            }
            this.setState({loginInProcess: false});
        });
    };

    render() {
        const {from} = this.props.location.state || {
            from: {pathname: "/dashboard"}
        };
        const {redirectToReferrer, error, passwordError, usernameError, loginInProcess} = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from}/>;
        }

        return (
            <div ref="loginComponent">
                <div className="ui padded grid">
                    <div className="row">
                        <div className="column">
                            <h1 className="ui top attached block header">Bank of Rapperswil</h1>
                            <form className="ui bottom attached segment vertically padded grid form">
                                <div className="row">
                                    <div className="column">
                                        <h2>Login</h2>
                                        <div className="field">
                                            <label>Benutzername</label>
                                            <input
                                                onChange={this.handleLoginChanged}
                                                placeholder="Login"
                                                value={this.state.login}
                                            />
                                            {usernameError &&
                                            <div className="ui pointing red basic label">
                                                {usernameError.message}
                                            </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="column">
                                        <div className="field">
                                            <label>Passwort</label>
                                            <input
                                                onChange={this.handlePasswordChanged}
                                                placeholder="Password"
                                                type="password"
                                                value={this.state.password}
                                            />
                                            {passwordError &&
                                            <div className="ui pointing red basic label">
                                                {passwordError.message}
                                            </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="column">
                                        <button className="ui primary button" onClick={this.handleSubmit}>
                                            <span>Login </span>
                                            {loginInProcess &&
                                            <span className="ui inverted active right floated mini inline loader"/>
                                            }
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div className="ui grid">
                                {error &&
                                <div className="row">
                                    <div className="column">
                                        <p className="ui pointing red basic label">Es ist ein Fehler
                                            aufgetreten! Überprüfen Sie Ihre Logininformationen!</p>
                                    </div>
                                </div>
                                }
                                <div className="row">
                                    <div className="column">
                                        <Link to="/signup">Noch keinen Account?</Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
