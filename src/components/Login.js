// @flow

import React from "react";
import {Redirect, Link} from "react-router-dom";
import Nav from "./Nav"

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
        redirectToReferrer: false
    };

    handleLoginChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({login: event.target.value});
        }
    };

    handlePasswordChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({password: event.target.value});
        }
    };

    handleSubmit = (event: Event) => {
        event.preventDefault();
        const {login, password} = this.state;
        this.props.authenticate(login, password, error => {
            if (error) {
                this.setState({error});
            } else {
                this.setState({redirectToReferrer: true, error: null});
            }
        });
    };

    render() {
        const {from} = this.props.location.state || {
            from: {pathname: "/dashboard"}
        };
        const {redirectToReferrer, error} = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from}/>;
        }

        return (
            <div>
                <div className="ui padded grid">
                    <div className="row">
                        <div className="column">
                            <h1 className="ui top attached block header">Bank of Rapperswil</h1>
                            <form className="ui bottom attached segment vertically padded grid">
                                <div className="row">
                                    <div className="column">
                                        <h2>Login</h2>
                                        <div className="ui fluid input">
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
                                        <div className="ui fluid input">
                                            <input
                                                onChange={this.handlePasswordChanged}
                                                placeholder="Password"
                                                type="password"
                                                value={this.state.password}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="column">
                                        <button className="ui primary button" onClick={this.handleSubmit}>Login
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div className="ui grid">
                                <div className="row">
                                    <div className="column">
                                        {error && <p>Es ist ein Fehler aufgetreten!</p>}
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
