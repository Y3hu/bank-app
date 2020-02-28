import React, { useEffect, useState } from 'react'

import { useAuthorForm } from '../Hooks/forms-values.hook'

import axios from 'axios'

const baseUrl = "https://71748ac2.ngrok.io"

const NewMovementComponent = ({ func }) => {
    // eslint-disable-next-line
    const [localItems, setLocalItems] = useState({ jwt: '', user: {}, accounts: [] })
    const [favorites, setFavorites] = useState([])
    const [accountsSelected, setAccountsSelected] = useState({
        userAccount: 0,
        favoriteAccount: 0
    })
    const { values, updateValues } = useAuthorForm({
        detail: '',
        receptor: '',
        date: '',
        type: '',
        mount: 0,
        account: {}
    })

    useEffect(() => {
        let localJwt = JSON.parse(localStorage.getItem("jwt"))
        let localUser = JSON.parse(sessionStorage.getItem("user"))
        let localAccounts = JSON.parse(localStorage.getItem("accounts"))
        setLocalItems({
            jwt: localJwt,
            user: localUser,
            accounts: localAccounts
        })

        axios.get(`${baseUrl}/api/favorite?id=${localUser.id}`, { headers: { "Authorization": `Bearer ${localJwt}` } })
            .then(res => {
                setFavorites(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleChange = e => setAccountsSelected({ ...accountsSelected, [e.target.name]: e.target.value })

    const retrieveFavoriteInfo = e => {
        e.preventDefault()
        // eslint-disable-next-line
        let findUser = favorites.find(f => f.accountId == accountsSelected.favoriteAccount)
        return axios.get(`${baseUrl}/api/account/`, {
            params: {
                "all": "no",
                "id": findUser.accountOwnerId
            },
            headers: {
                "Authorization": `Bearer ${localItems.jwt}`
            }
        })
            .then(res => {
                // eslint-disable-next-line
                let userInfo = res.data.find(a => a.id == accountsSelected.favoriteAccount)
                return userInfo
            })
            .then(res => {
                console.log(res)
                validate(res)
            })
            .catch(err => console.log(err))
    }

    //esta multiplicando * 600 el monto
    const changeCurrency = (accountToUpdate) => {
        let newMount = 0
        // eslint-disable-next-line
        if (accountToUpdate.currency == "dolar") {
            newMount = values.mount / 500
        }
        // eslint-disable-next-line
        if (accountToUpdate.currency == "colon") {
            newMount = values.mount / 600
        }

        return newMount
    }

    const validate = favoriteUserAccount => {

        setTimeout(() => {
            // eslint-disable-next-line
            let accountToUpdate = localItems.accounts.find(a => a.id == accountsSelected.userAccount)
            let newMount = 0

            if (accountToUpdate.currency !== favoriteUserAccount.currency) {
                newMount = changeCurrency(accountToUpdate)
            }
            transfer(accountToUpdate, favoriteUserAccount, newMount)
        }, 2000)
    }

    const transfer = (accountToUpdate, favoriteUserAccount, newMount) => {
        console.log(accountToUpdate)
        console.log(favoriteUserAccount)
        if (accountToUpdate && favoriteUserAccount) {
            accountToUpdate.balance -= values.mount
            axios.put(`${baseUrl}/api/account`, accountToUpdate, {
                headers: {
                    "Authorization": `Bearer ${localItems.jwt}`
                }
            })
                .then(() => {
                    let date = new Date()
                    let month = ((date.getMonth() + 1) <= 9) ? `0${date.getMonth() + 1}` : date.getMonth() + 1
                    let debit = {
                        "detail": `${values.detail}`,
                        "receptor": `${favoriteUserAccount.user.name} ${favoriteUserAccount.user.lastname}`,
                        "date": `${date.getDate()}/${month}/${date.getFullYear()}`,
                        "type": "debit",
                        "mount": (newMount > 0) ? newMount : `${values.mount}`,
                        "account": {
                            "id": accountToUpdate.id,
                            "accountNumber": accountToUpdate.accountNumber,
                            "currency": accountToUpdate.currency,
                            "user": localItems.user,
                            "movements": null
                        }
                    }

                    let credit = {
                        "detail": `${values.detail}`,
                        "receptor": `${favoriteUserAccount.user.name} ${favoriteUserAccount.user.lastname}`,
                        "date": `${date.getDate()}/${month}/${date.getFullYear()}`,
                        "type": "credit",
                        "mount": `${values.mount}`,
                        "account": {
                            "id": favoriteUserAccount.id,
                            "accountNumber": favoriteUserAccount.accountNumber,
                            "currency": favoriteUserAccount.currency,
                            "user": favoriteUserAccount.user,
                            "movements": null
                        }
                    }

                    axios.post(`${baseUrl}/api/movement`, debit, { headers: { "Authorization": `Bearer ${localItems.jwt}` } })
                        .then(res => {
                            axios.post(`${baseUrl}/api/movement`, credit, { headers: { "Authorization": `Bearer ${localItems.jwt}` } })
                                .then(res => console.log(res))
                                .catch(err => console.log(err))
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className="column">
            <h5 className="card-header">
                New Movement
            </h5>
            <div className="card-body">

                <form className="needs-validation" noValidate>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend"> <span className="input-group-text" id="mount">Mount to transfer</span> </div>
                            <input
                                type="number"
                                className="form-control"
                                aria-describedby="mount"
                                name="mount"
                                onChange={e => updateValues(e)}
                                required />
                            <div className="invalid-feedback"> Please provide the mount to transfer. </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-group">

                            <select className="custom-select my-1 mr-sm-2" name="userAccount" id="inlineFormCustomSelectAccount" onChange={e => handleChange(e)} value={accountsSelected.userAccount}>
                                <option key="default" value="default">Select the account to transfer</option>
                                {
                                    localItems.accounts.map((a, i) => (
                                        <option key={`a${i}`} value={a.id}>{a.accountNumber}</option>
                                    ))
                                }
                            </select>

                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend"> <span className="input-group-text" id="detail">Detail</span> </div>
                            <input
                                type="text"
                                className="form-control"
                                aria-describedby="detail"
                                name="detail"
                                onChange={e => updateValues(e)}
                                required />
                            <div className="invalid-feedback"> Please provide the detail of the transfer. </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-group">

                            <select className="custom-select my-1 mr-sm-2" name="favoriteAccount" id="inlineFormCustomSelectFavorite" onChange={e => handleChange(e)} value={accountsSelected.favoriteAccount}>
                                <option key="default" value="default">Select the favorite account</option>
                                {
                                    favorites.map((a, i) => (
                                        <option key={`a${i}`} value={a.accountId}>{a.accountId}</option>
                                    ))
                                }
                            </select>

                        </div>
                    </div>
                </form>

            </div>
            <div className="card-footer">
                <button id="login-button" type="button" className="button btn btn-primary" data-dismiss="modal" onClick={e => retrieveFavoriteInfo(e)}><span>Done</span></button>
            </div>
        </div>
    )
}

export default NewMovementComponent