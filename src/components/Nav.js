import React from "react";
import {NavLink, Link, withRouter} from 'react-router-dom'

class Nav extends React.Component {
    render() {
        if (this.props.user) {
            const user = this.props.user;
            const AuthNav = withRouter(({history}) => {
                return (
                    <div className="ui inverted stackable menu attached">
                        <div className="header item">
                            <h2>WED3 Testat / Dogan - Brunner</h2>
                        </div>
                        <NavLink className="item"
                                 exact
                                 activeClassName="active"
                                 to={"/dashboard"}>Dashboard</NavLink>
                        <NavLink className="item"
                                 exact
                                 activeClassName="active"
                                 to={"/transactions"}>Transaktionen</NavLink>
                        <div className="right menu">
                            <div className="item">
                                <Link
                                    className="ui primary button"
                                    to={"/logout"}
                                    onClick={event => {
                                        event.preventDefault();
                                        this.props.callback(() => {
                                            history.push("/")
                                        });
                                    }}>Logout {user.firstname} {user.lastname}</Link>
                            </div>
                        </div>
                    </div>
                );
            });
            return (
                <AuthNav/>
            )
        } else {
            return (
                <div className="ui inverted stackable menu attached">
                    <div className="header item">
                        <h2>WED3 Testat / Dogan - Brunner</h2>
                    </div>
                    <NavLink className="item"
                             exact
                             activeClassName="active"
                             to={'/'}>Home</NavLink>
                    <div className="right menu">
                        <div className="item">
                            <Link className="ui primary button" to={'/signup'}>Registrieren</Link>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Nav;