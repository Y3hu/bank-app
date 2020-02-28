import React, { Component } from 'react';
import LineGraph from "./Graph/myLineGraph"
import CardsListComponent from './CardsList'

import './moves.component.scss'

export default class Dashboard extends Component {

    render() {

        let storagedMoves = JSON.parse(localStorage.getItem("movements"))
        let balance = JSON.parse(localStorage.getItem("balance"))
        let currency = JSON.parse(localStorage.getItem("currency"))

        return (
            <div className="moves-container">
                <header className="moves-header">

                    <h5>Account Movements</h5>
                    <p><strong>
                        Balance:
                        {(currency === "dolar") ? "$" : "₡"}
                        {(balance) ? balance : "0"}
                    </strong></p>
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