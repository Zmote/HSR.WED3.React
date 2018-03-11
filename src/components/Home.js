// @flow

import React from 'react'
import { Link } from 'react-router-dom'

export type Props = {
  isAuthenticated: boolean,
}

const Home = ({isAuthenticated}: Props) => (
  <div>
    { isAuthenticated
      ? <div>
          <div className="ui padded grid">
            <div className="row">
              <div className="sixteen wide column">
                <p>Willkommen zurück!</p>
                <Link className="ui primary button" to={'/dashboard'}>Zum Dashboard</Link>
              </div>
            </div>
          </div>
        </div>
      : <div>
          <div className="ui padded grid">
            <div className="row">
              <div className="eight wide column">
                <h1 className="ui top attached block header">Zum Login</h1>
                <div className="ui bottom attached segment vertically padded grid">
                  <div className="row">
                    <div className="column">
                      <p>Sie sind schon registriert, dann können Sie sich hier einloggen:</p>
                      <Link className="ui primary button" to={'/login'}>Einloggen</Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="eight wide column">
                <h1 className="ui top attached block header">Zur Registrierung</h1>
                <div className="ui bottom attached segment vertically padded grid">
                  <div className="row">
                    <div className="column">
                      <p>Falls Sie noch keinen Account besitzen, können Sie sich hier registrieren:</p>
                      <Link className="ui primary button" to={'/signup'}>Registrieren</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    }
  </div>
);

export default Home
