import React from 'react'
import { Link } from 'react-router-dom'

const NavComponent = ({ exchangeRate }) => {

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <i className="navbar-brand">Bankizi</i>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/home">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/wallet">Wallet <span className="sr-only">(current)</span></Link>
                    </li>
                </ul>

                <p className="btn btn-outline-primary btn-lg" role="alert" style={{ textAlign: "center" }}>{`compra: ₡${exchangeRate.purchase} | venta: ₡${exchangeRate.sale}`}</p>

            </div>
        </nav>

    )
}

export default NavComponent