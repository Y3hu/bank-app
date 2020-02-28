import React, { useEffect, useState } from 'react'

import './home.component.scss'
import CardsComponent from './cards.component'
import ServiceCardsComponent from './ServiceCards'
import AddAccount from './AddAccount'
import ModalComponent from '../Shared/Modal'
import SpinnerComponent from '../Shared/Spinner'

import Claro from '../../assets/claro.svg'
import Kolbi from '../../assets/kolbi.png'
import Movistar2 from '../../assets/movistar.jpeg'

import Ice from '../../assets/ice.png'
import Jasec from '../../assets/jasec.jpeg'
import Coopelesca from '../../assets/coopelesca.png'

import Aya from '../../assets/aya.png'
import AsadaSantaRosa from '../../assets/santa-rosa.png'
import Tobosi from '../../assets/tobosi.jpg'

import axios from 'axios'

// eslint-disable-next-line
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

const mobiles = [
    {
        logo: Kolbi,
        company: "Kolbi",
        color: "#fff"
    },
    {
        logo: Claro,
        company: "Claro",
        color: "red"
    },
    {
        logo: Movistar2,
        company: "Movistar",
        color: "#fff"
    }
]

const electricity = [
    {
        logo: Ice,
        company: "Ice",
        color: "#00539b"
    },
    {
        logo: Jasec,
        company: "Jasec",
        color: "#fff"
    },
    {
        logo: Coopelesca,
        company: "Coopelesca",
        color: "#fff"
    }
]

const water = [
    {
        logo: Aya,
        company: "AyA",
        color: "#00539b"
    },
    {
        logo: AsadaSantaRosa,
        company: "Santa Rosa",
        color: "#fff"
    },
    {
        logo: Tobosi,
        company: "Tobosi",
        color: "rgb(217, 223, 237)"
    }
]

const baseUrl = "https://9043246e.ngrok.io"

const HomeComponent = () => {

    const [accounts, setAccounts] = useState([])
    const [cards, setCards] = useState([])
    const [jwt, setJwt] = useState('')
    const [reset, setReset] = useState(false)
    const [spinner, setSpinner] = useState(true)

    let user = JSON.parse(sessionStorage.getItem("user"))

    useEffect(() => {
        let localJwt = JSON.parse(localStorage.getItem('jwt'))
        setJwt(localJwt)

        axios.get(`${baseUrl}/api/account/`, {
            params: {
                "all": "no",
                "id": user.id
            },
            headers: {
                "Authorization": `Bearer ${localJwt}`
            }
        })
            .then(res => {
                setAccounts(res.data)
                if (res.data) {
                    console.log(res.data)
                    setAccounts(res.data)
                    return res.data
                }
                return []
            })
            .then(accounts => {
                if (accounts.length >= 0) giveCards(accounts, localJwt)
            })
            .catch(err => console.log(err))
    }, [user.id])

    const giveCards = (accountsFound, jwt) => {
        accountsFound.map(c => {
            axios.get(`${baseUrl}/api/card/${c.id}`, {
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            })
                .then(res => {
                    if (res.data.length >= 0) {
                        setCards(c => [...c, ...res.data])
                        setSpinner(false)
                    }
                })
                .catch(err => console.log(err))
            return 0
        })
    }

    const retrieveAccountMovements = id => {
        let accountFound = accounts.find(a => a.id === id)
        if (accountFound && accountFound.movements) {
            localStorage.setItem("movements", JSON.stringify(accountFound.movements))
            localStorage.setItem("currency", JSON.stringify(accountFound.currency))
            localStorage.setItem("balance", JSON.stringify(accountFound.balance))
        }
        else {
            localStorage.setItem("movements", JSON.stringify([]))
            localStorage.setItem("currency", JSON.stringify(""))
            localStorage.setItem("balance", JSON.stringify(""))
        }
    }

    const AddingAccount = ({ currency, entity }) => {
        let accountNumber = Math.floor(1000000000000000 + Math.random() * 9000000000000000)
        let date = new Date()
        let month = ((date.getMonth() + 1) <= 9) ? `0${date.getMonth() + 1}` : date.getMonth() + 1

        let account = {
            accountNumber,
            currency,
            balance: "0",
            user,
            movements: null
        }

        if (currency && entity && user) {
            axios.post(`${baseUrl}/api/account/`, account, {
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            })
                .then(res => {
                    if (res.data) {
                        return res.data
                    }
                })
                .then(res => {
                    console.log(res)
                    let card = {
                        cardNumber: res.accountNumber,
                        userName: res.user.name + " " + res.user.lastname,
                        expiration: `${month}/${date.getFullYear() + 4}`,
                        entity,
                        accountId: res.id
                    }
                    axios.post(`${baseUrl}/api/card/`, card, { headers: { "Authorization": `Bearer ${jwt}` } })
                        .then(res => setReset(!reset))
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className="container">
            <header className="header">
                <h4>Accounts</h4>
                <ModalComponent buttonName="Add Account" func={AddingAccount} Children={AddAccount} />
            </header>

            <div className="column">
                <div className="cards-container">
                    {
                        cards.map((c, i) => (
                            <CardsComponent
                                key={`card${i}`}
                                id={c.id}
                                type={c.entity}
                                name={c.userName}
                                number={c.cardNumber}
                                expiry={c.expiration}
                                func={retrieveAccountMovements}
                            />
                        ))
                    }
                </div>

            </div>
            <div className="column">
                <h4>Payments</h4>
                <div className="column">
                    <h6>Mobiles</h6>
                    <div className="row services-container">
                        {(spinner) ? <SpinnerComponent /> :
                            mobiles.map((e, i) => (
                                <ServiceCardsComponent key={i} logo={e.logo} company={e.company} color={e.color} />
                            ))
                        }
                    </div>
                </div>

                <div className="column">
                    <h6>Electricity</h6>
                    <div className="row services-container">
                        {
                            electricity.map((e, i) => (
                                <ServiceCardsComponent key={i} logo={e.logo} company={e.company} color={e.color} />
                            ))
                        }
                    </div>
                </div>

                <div className="column">
                    <h6>Water</h6>
                    <div className="row services-container">
                        {
                            water.map((e, i) => (
                                <ServiceCardsComponent key={i} logo={e.logo} company={e.company} color={e.color} />
                            ))
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default HomeComponent