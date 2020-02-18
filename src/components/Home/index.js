import React from 'react'

import './home.component.scss'
import CardsComponent from './cards.component'

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

const HomeComponent = props => {

    return (
        <div className="container">
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
            <div className="">

            </div>
        </div>
    )
}

export default HomeComponent