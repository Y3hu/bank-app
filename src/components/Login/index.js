import React from 'react';
import { withRouter } from 'react-router-dom'

import CarouselCompoent from './carousel.component'

import './login.component.scss'

const LoginComponent = ({ history, location, fakeAuth }) => {

    let { from } = location.state || { from: { pathname: "/home" } }

    let login = () => {
        fakeAuth.authenticate(() => {
            history.replace(from)
        })
    }

    return (
        <div className="container">
            <div className="column">
                <div className="row">
                    <i className="fas fa-piggy-bank align-self-center mr-3"></i>
                    <p className="align-self-center mr-3" style={{ fontSize: "35px" }}><strong>BNB</strong></p>
                </div>
                <div className="row">
                    <div className="carousel-container">
                        <p><strong>Simple and Free</strong></p>
                        <CarouselCompoent />
                    </div>
                </div>
                <div className="row">
                    <button type="button" className="btn btn-outline-primary btn-lg btn-block">Continue with Google</button>
                </div>
                <div className="row">
                    <div className="btn-options" role="group" aria-label="Button Options">
                        <button type="button" className="btn btn-outline-secondary" onClick={e => login()}>Log in</button>
                        |
                        <button type="button" className="btn btn-outline-secondary">Sign up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(LoginComponent)