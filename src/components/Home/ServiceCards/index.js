import React from 'react'
import Claro from '../../../assets/movistar.svg'

const ServiceCardsComponent = _ => {
    return (
        <div className="card text-center" style={{ width: "7rem", height: "7rem" }}>
            <div className="card-body">
                <img src={Claro} alt="service card" style={{ backgroundColor: "white" }} />
                <p className="card-text">movistar</p>

            </div>
        </div>
    )
}

export default ServiceCardsComponent