import React, { useEffect } from 'react'

import './home.component.scss'
import CardsComponent from './cards.component'
import Axios from 'axios'
import ServiceCardsComponent from './ServiceCards'

const cardsInfo = [
    {
        type: "MASTERCARD",
        name: "NEIL GAIMAN",
        number: "5241 1734 7629 0435",
        expiry: "04/2028"
    },
    {
        type: "MASTERCARD",
        name: "JON DOE",
        number: "5241 1734 5127 0435",
        expiry: "02/2021"
    },
    {
        type: "VISA",
        name: "BIL GATES",
        number: "5241 0000 7629 8560",
        expiry: "11/2026"
    },
    {
        type: "MASTERCARD",
        name: "YEHUDY CHAVARRIA",
        number: "5241 1547 0082 1993",
        expiry: "11/2026"
    },
    {
        type: "MASTERCARD",
        name: "YEHUDY CHAVARRIA",
        number: "5241 1547 0082 1993",
        expiry: "11/2026"
    },
]

const HomeComponent = ({ jwt }) => {

    console.log(jwt)
    useEffect(() => {
        Axios.get("http://localhost:8080/hello", { headers: { "Authentication": `Bearer ${jwt}` } })
    })

    return (
        <div className="container">
            <h4>Accounts</h4>
            <div className="column">
                <div className="cards-container">

                    {
                        cardsInfo.map((c, i) => (
                            <CardsComponent
                                key={`card${i}`}
                                type={c.type}
                                name={c.name}
                                number={c.number}
                                expiry={c.expiry}
                            />
                        ))
                    }
                </div>

            </div>
            <div className="column">
                <h4>Payments</h4>
                <div className="column">
                    <h6>Mobiles</h6>
                    <div className="row">
                        {
                            [0, 1, 2].map(e => (
                                <ServiceCardsComponent key={e} />
                            ))
                        }
                    </div>
                </div>

                <div className="column">
                    <h6>Electricity</h6>
                    <div className="row">
                        {
                            [0, 1, 2].map(e => (
                                <ServiceCardsComponent key={e} />
                            ))
                        }
                    </div>
                </div>

                <div className="column">
                    <h6>Water</h6>
                    <div className="row">
                        {
                            [0, 1, 2].map(e => (
                                <ServiceCardsComponent key={e} />
                            ))
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default HomeComponent