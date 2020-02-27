import React, { Component } from 'react'
import Chart from "chart.js";
import { withRouter } from 'react-router-dom'

import './myLineGraph.scss'

let myLineChart;

//--Chart Style Options--//
Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
Chart.defaults.global.legend.display = false;
//--Chart Style Options--//

class LineGraph extends Component {
    chartRef = React.createRef();

    componentDidMount() {
        this.buildChart();
    }

    componentDidUpdate() {
        this.buildChart();
    }

    componentWillUnmount() {
        localStorage.setItem("movements", JSON.stringify([]))
    }

    setData = _ => {
        let debitMoves = [], labels = [], creditMoves = []

        let storagedMoves = JSON.parse(localStorage.getItem("movements"))
        storagedMoves.map(m => {
            
            if (m.type === "credit") creditMoves.push(Number(m.mount))
            if (m.type === "debit") debitMoves.push(Number(m.mount))
            if ((!this.findDate(labels, m.date))) labels.push(m.date)

            return 0
        })
        return {
            creditMoves,
            debitMoves,
            labels
        }
    }

    findDate = (labels, date) => labels.find(l => l === date)

    buildChart = () => {
        let { debitMoves, creditMoves, labels } = this.setData()
        const myChartRef = this.chartRef.current.getContext("2d");

        if (typeof myLineChart !== "undefined") myLineChart.destroy();

        myLineChart = new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: labels.length === debitMoves.length ? labels : new Array(debitMoves.length).fill(""),
                datasets: [
                    {
                        label: "Debits",
                        data: debitMoves,
                        fill: false,
                        borderColor: "#E0E0E0",
                        backgroundColor: "red",
                        pointBorderWidth: 10
                    },
                    {
                        label: "Credits",
                        data: creditMoves,
                        fill: false,
                        borderColor: "#6610f2",
                        backgroundColor: "red",
                        pointBorderWidth: 10
                    }
                ]
            },
            options: {
                //Customize chart options
            }
        });

    }

    render() {

        return (
            <div className="graphContainer">
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}

export default withRouter(LineGraph)