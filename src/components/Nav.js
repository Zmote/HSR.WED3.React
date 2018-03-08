import React from "react";
import { Link } from 'react-router-dom'

class Nav extends React.Component{
    goToRegistration(){

    }
    render() {
        return (
            <div className="ui inverted menu attached">
                <div className="header item">
                    <h2>WED3 Testat / Dogan - Brunner</h2>
                </div>
                <Link className="item" to={'/'}>Home</Link>
                <div className="right menu">
                    <div className="item">
                        <Link className="ui primary button" to={'/signup'}>Registrieren</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Nav;