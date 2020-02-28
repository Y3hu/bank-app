import React, { Component } from 'react'
import QrReader from 'react-qr-reader'

import './wallet.component.scss'

export default class QrReaderComponent extends Component {
    state = {
        result: 'No result'
    }

    handleScan = data => {
        console.log(data)
        if (data) {
            this.setState({
                result: data
            })
        }
    }
    handleError = err => {
        console.error(err)
    }
    render() {
        return (
            <div>
                <QrReader
                    delay={300}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    className="qr-reader"
                />
                <p>{this.state.result}</p>
            </div>
        )
    }

}