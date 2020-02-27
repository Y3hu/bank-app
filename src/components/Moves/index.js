import React, { Component } from 'react';
import LineGraph from "./Graph/myLineGraph"
import CardsListComponent from './CardsList'

import chartIcon from "../../assets/chart-icon.svg";

import './moves.component.scss'

export default class Dashboard extends Component {

    render() {

        let storagedMoves = JSON.parse(localStorage.getItem("movements"))

        return (
            <div className="moves-container">
                <header>
                    <img src={chartIcon} alt="bar chart icon" />
                    <h3>Account Movements</h3>
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