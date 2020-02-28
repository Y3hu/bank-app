import React from 'react';
import { withRouter } from 'react-router-dom'
import Login from './login.component'
import CarouselCompoent from './carousel.component'
import ModalComponent from '../Shared/Modal';

import './login.component.scss'

const LoginComponent = ({ history, location, fakeAuth, exchangeRate, setJwt }) => {

    let { from } = location.state || { from: { pathname: "/home" } }

    let login = _ => {
        fakeAuth.authenticate(() => {
            history.replace(from);
        })
    }

    return (
        <div className="container">
            <div className="column">
                <div className="row">
                    <i className="fas fa-piggy-bank align-self-center mr-3"></i>
                    <p className="align-self-center mr-3" style={{ fontSize: "35px" }}><strong>BANKIZI</strong></p>
                </div>
                <div className="row">
                    <div className="carousel-container">
                        <p><strong>Simple and Free</strong></p>
                        <CarouselCompoent />
                    </div>
                </div>
                <div className="row">
                    <p className="btn btn-outline-primary btn-lg">{`compra: ₡${exchangeRate.purchase} | venta: ₡${exchangeRate.sale}`}</p>
                </div>
                <div className="row">
                    <ModalComponent buttonName={"Login"} func={login} Children={Login} />
                </div>
            </div>
        </div>
    );
}

export default withRouter(LoginComponent)