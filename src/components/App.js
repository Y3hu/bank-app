import React, { useState, useEffect } from 'react';
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
import PaymentComponent from './Payment'
import ChatBot from './Shared/ChatBot'

import './App.scss'
import Axios from 'axios';

export default function SimpleContainer() {

  const [isAuthenticated, setAuthenticated] = useState(false)
  const [jwt, setJwt] = useState("")
  const [exchangeRate, setExchangeRate] = useState({
    purchase: "",
    sale: ""
  })

  useEffect(() => {
    Axios.post("http://localhost:8080/authenticate", { username: "foo", password: "foo" })
      .then(res => setJwt(res.data.jwt))
      .catch(err => console.log(err))

    Axios.get("https://tipodecambio.paginasweb.cr/api")
      .then(res => setExchangeRate({ purchase: res.data.compra, sale: res.data.venta }))
      .catch(err => console.log(err))
  }, [])

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
        (isAuthenticated) ? <NavComponent exchangeRate={exchangeRate} fakeAuth={fakeAuth} />
          : ''
      }
      <div className="container">
        <Switch>
          <PrivateRoute path="/home" >
            <HomeComponent jwt={jwt} />
          </PrivateRoute>
          <PrivateRoute path="/moves/:id" >
            <MovesComponent />
          </PrivateRoute>
          <PrivateRoute path="/payment/:entity" >
            <PaymentComponent />
          </PrivateRoute>
          <Route exact path="/">
            <LoginComponent exchangeRate={exchangeRate} fakeAuth={fakeAuth} />
          </Route>
        </Switch>
      </div>
      {
        (isAuthenticated) ? <div className="chat-bot"><ChatBot /></div>
          : ''
      }
    </Router>
  )
}