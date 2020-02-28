import React from 'react'
import { Link } from 'react-router-dom'

const NavComponent = ({ exchangeRate, fakeAuth }) => {

    const logOut = _ => {
        sessionStorage.setItem('user', JSON.stringify({}))
        fakeAuth.signout()
    }

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand fas fa-piggy-bank" to="/home">Bankizi</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/home">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link disabled" to="/favorite" aria-disabled="true">Favorites <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/transfer">Transferences <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/wallet">Wallet <span className="sr-only">(current)</span></Link>
                    </li>
                    {
                        (JSON.parse(sessionStorage.getItem('user')).name) ?
                            <li className="nav-item dropdown">
                                <span className="nav-link dropdown-toggle" style={{ cursor: 'pointer' }} role="button" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {JSON.parse(sessionStorage.getItem('user')).name}
                                </span>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <button type="button" className="dropdown-item" onClick={e => logOut()}>Log out</button>
                                </div>
                            </li> : ''
                    }
                </ul>

                <p className="btn btn-outline-primary btn-lg" role="alert" style={{ textAlign: "center" }}>{`compra: ₡${exchangeRate.purchase} | venta: ₡${exchangeRate.sale}`}</p>

            </div>
        </nav>

    )
}

export default NavComponent