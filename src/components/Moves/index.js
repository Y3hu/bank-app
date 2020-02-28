import React, { Component } from 'react';
import LineGraph from "./Graph/myLineGraph"
import CardsListComponent from './CardsList'

import './moves.component.scss'

export default class Dashboard extends Component {

    print = _ => console.log("print")

    render() {

        let storagedMoves = JSON.parse(localStorage.getItem("movements"))
        let balance = JSON.parse(localStorage.getItem("balance"))
        let currency = JSON.parse(localStorage.getItem("currency"))

        //console.log(storagedMoves)

        return (
            <div className="moves-container">
                <header className="moves-header">

                    <h5>Movements</h5>
                    <i><strong>
                        {(currency === "dolar") ? "$" : "₡"}
                        {(balance) ? balance : "0"}
                    </strong></i>

                </header>

                <LineGraph />

                <div className="list-container">
                    {
                        (storagedMoves) ?
                            storagedMoves.map((m, i) => (
                                <CardsListComponent key={`card#${i}`} move={m} />
                            )) : ''
                    }
                </div>

            </div>
        )
    }
}