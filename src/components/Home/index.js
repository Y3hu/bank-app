import React, { useEffect, useState } from 'react'

import './home.component.scss'
import CardsComponent from './cards.component'
import ServiceCardsComponent from './ServiceCards'

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

const baseUrl = "http://localhost:8080/api"

const HomeComponent = ({ jwt }) => {

    const [accounts, setAccounts] = useState([])
    const [cards, setCards] = useState([])

    let user = JSON.parse(sessionStorage.getItem("user"))

    //console.log(jwt)
    useEffect(() => {
        axios.get(`${baseUrl}/account/${user.id}`)
            .then(res => {
                setAccounts(res.data)
                if (res.data) {
                    setAccounts(res.data)
                    return res.data
                }
                return []
            })
            .then(accounts => {
                if (accounts.length >= 0) giveCards(accounts)

            })
            .catch(err => console.log(err))
    }, [user.id])

    const giveCards = (accountsFound) => {
        accountsFound.map(c => {
            axios.get(`${baseUrl}/card/${c.id}`)
                .then(res => {
                    if (res.data.length >= 0) setCards(c => [...c, ...res.data])
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
        }
        else {
            localStorage.setItem("movements", JSON.stringify([]))
            localStorage.setItem("currency", JSON.stringify(""))
        }
    }

    return (
        <div className="container">
            <h4>Accounts</h4>
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
                        {
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