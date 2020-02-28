import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import SpinnerComponent from '../Shared/Spinner'
import axios from 'axios'

import { useAuthorForm } from '../Hooks/forms-values.hook'

let serviceNumbers = [
    {
        id: "84783438", mount: 31200, period: '01/2020', entity: 'Kolbi', status: false
    },
    {
        id: "485767", mount: 15300, period: '01/2020', entity: 'Ice', status: false
    },
    {
        id: "68525652", mount: 8500, period: '01/2020', entity: 'Movistar', status: false
    },
    {
        id: "78526489", mount: 15300, period: '01/2020', entity: 'Claro', status: false
    },
    {
        id: "tb156", mount: 7345, period: '01/2020', entity: 'Tobosi', status: false
    },
    {
        id: "jc5767", mount: 86524, period: '01/2020', entity: 'Jasec', status: false
    }
]

const baseUrl = "https://71748ac2.ngrok.io"

const PaymentComponent = ({ history, location }) => {
    const { values, updateValues } = useAuthorForm({
        serviceNumber: '',
    })
    const [showBill, setShowBill] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [showSpinner, setShowSpinner] = useState(false)
    const [bill, setBill] = useState({
        mount: 0,
        period: '',
        account: 0
    })

    let company = location.pathname.replace("/payment/", "")

    const [jwt, setJwt] = useState('')
    const [user, setUser] = useState({})
    const [userAccounts, setUserAccounts] = useState([])

    useEffect(() => {
        let localJwt = JSON.parse(localStorage.getItem("jwt"))
        let user = JSON.parse(sessionStorage.getItem('user'))

        setJwt(localJwt)
        setUser(user)
        axios.get(`${baseUrl}/api/account/?all=no&id=${user.id}`, {
            headers: {
                "Authorization": `Bearer ${localJwt}`
            }
        })
            .then(res => setUserAccounts(res.data))
            .catch(err => console.log(err))
    }, [])

    const consultBill = e => {
        e.preventDefault()
        let serviceFound = serviceNumbers.find(s => s.id === values.serviceNumber && s.entity === company)
        if (serviceFound && !serviceFound.status) {
            setBill({ mount: serviceFound.mount, period: serviceFound.period })
            setShowBill(true)
        }
        else {
            alert("Not pending bills!")
            setShowBill(false)
        }
    }

    const handleChange = e => {
        setBill({ ...bill, [e.target.name]: e.target.value })
    }

    const changeCurrency = (accountToUpdate) => {
        let newMount = 0
        // eslint-disable-next-line
        if (accountToUpdate.currency == "dolar") {
            newMount = values.mount / 500
            return newMount
        }
        return null
    }

    const payBill = e => {
        e.preventDefault()
        setShowBill(false)
        setShowAlert(false)
        setShowSpinner(true)
        // eslint-disable-next-line
        let accountToUpdate = userAccounts.find(a => a.id == bill.account)
        let newMount = changeCurrency(accountToUpdate)

        if (accountToUpdate) {
            accountToUpdate.balance -= bill.mount
            axios.put(`${baseUrl}/api/account`, accountToUpdate, {
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            })
                .then(() => {
                    let date = new Date()
                    let month = ((date.getMonth() + 1) <= 9) ? `0${date.getMonth() + 1}` : date.getMonth() + 1
                    let movement = {
                        "detail": `${company} Payment`,
                        "receptor": company,
                        "date": `${date.getDate()}/${month}/${date.getFullYear()}`,
                        "type": "debit",
                        "mount": (newMount) ? newMount : `${bill.mount}`,
                        "account": {
                            "id": accountToUpdate.id,
                            "accountNumber": accountToUpdate.accountNumber,
                            "currency": accountToUpdate.currency,
                            user,
                            "movements": null
                        }
                    }
                    serviceNumbers.forEach((s, i) => {
                        if (s.id === values.serviceNumber) {
                            serviceNumbers[i].status = true
                        }
                    })
                    axios.post(`${baseUrl}/api/movement`, movement, {
                        headers: {
                            "Authorization": `Bearer ${jwt}`
                        }
                    })
                        .then(res => {
                            setShowSpinner(false)
                            setShowAlert(true)
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className="row">
            <div className="col-md-4 order-md-1 mb-4">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Bill Consult</span>
                </h4>

                <form className="card p-2">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            aria-describedby="serviceNumber"
                            name="serviceNumber"
                            placeholder="service number"
                            onChange={e => updateValues(e)}
                            required />
                        <div className="input-group-append">
                            <button type="button" className="btn btn-secondary" onClick={e => consultBill(e)}>Consult</button>
                        </div>
                    </div>
                </form>
            </div>
            {
                (showBill) ?
                    <div className="col-md-8 order-md-2 hidden-col">
                        <h4 className="mb-3">{company} Payment</h4>
                        <form className="needs-validation was-validated" noValidate>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="firstName">Period</label>
                                    <input type="text" className="form-control" id="firstName" value={bill.period} readOnly />
                                </div>
                            </div>

                            <hr className="mb-3" />

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="lastName">Amount</label>
                                    <input type="text" className="form-control" id="lastName" value={`₡${bill.mount}`} readOnly />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-3 mb-3">
                                    <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectAccount">Select account to debit</label>
                                    <select className="custom-select my-1 mr-sm-2" name="account" id="inlineFormCustomSelectAccount" onChange={e => handleChange(e)} value={bill.account}>
                                        <option key="default" value="default">Select the account to pay</option>
                                        {
                                            userAccounts.map((a, i) => (
                                                (a.balance >= bill.mount) ? <option key={`option${i}`} value={a.id}>{a.accountNumber} | {a.currency}</option> : ''
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <hr className="mb-4" />
                            <button className="btn btn-outline-primary btn-lg" type="button" onClick={e => payBill(e)}>Pay Now</button>
                        </form>
                    </div>
                    : (showSpinner) ? <div className="spinner-container"><SpinnerComponent /></div>
                        : (showAlert) ? <div className="alert alert-success" role="alert">Bill payed successfully!</div> : ''
            }

        </div>
    )
}

export default withRouter(PaymentComponent)