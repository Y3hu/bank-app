import React from 'react'
import { withRouter } from 'react-router-dom'

const PaymentComponent = ({ location }) => {

    let company = location.pathname.replace("/payment/", "")

    return (
        <div>
            <h4>{company} Payment</h4>
        </div>
    )
}

export default withRouter(PaymentComponent)