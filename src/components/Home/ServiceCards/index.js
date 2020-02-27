import React from 'react'
import { Link } from 'react-router-dom'

import './service.component.scss'

const ServiceCardsComponent = ({ logo, company, color }) => {
    return (
        <Link className="card text-center" style={{ backgroundColor: color }} to={`/payment/${company}`}>
            <div className="card-body">
                <img src={logo} alt="service card" />

            </div>
        </Link>
    )
}

export default ServiceCardsComponent