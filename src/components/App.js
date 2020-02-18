import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"

import NavComponent from './Nav'
import LoginComponent from './Login'
import HomeComponent from './Home';
import MovesComponent from './Moves'

export default function SimpleContainer() {

  const [isAuthenticated, setAuthenticated] = useState(false)

  const fakeAuth = {
    authenticate(cb) {
      setAuthenticated(true)
      setTimeout(cb, 100) // fake async
    },
    signout(cb) {
      setAuthenticated(false)
      setTimeout(cb, 100)
    }
  }

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isAuthenticated ? (
            children
          ) : (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: location }
                }}
              />
            )
        }
      />
    )
  }
  return (
    <Router>
      {
        (isAuthenticated) ? <NavComponent fakeAuth={fakeAuth} />
          : ''
      }
      <div className="container">
        <Switch>
          <PrivateRoute path="/home" >
            <HomeComponent />
          </PrivateRoute>
          <PrivateRoute path="/moves" >
            <MovesComponent />
          </PrivateRoute>

          <Route exact path="/">
            <LoginComponent fakeAuth={fakeAuth} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}