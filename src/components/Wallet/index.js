import React, { useEffect, useState } from 'react'
import QrReaderComponent from './qr-reader.component'

import QRCode from 'qrcode.react'

const WalletComponent = props => {
    const [localItems, setLocalItems] = useState({ jwt: '', user: {}, accounts: [] })
    const [accountsSelected, setAccountsSelected] = useState('')
    const [mode, setMode] = useState(true)
    const [qr, setQr] = useState({
        mount: 0,
        account: ''
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
    }, [])

    const downloadQR = () => {
        const canvas = document.getElementById("123456");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "123456.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    const handleChange = e => {
        setQr({ ...qr, [e.target.name]: e.target.value, account: accountsSelected })
    }

    return (
        <div className="container">
            <h4>Wallet</h4>

            <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-primary btn-lg" onClick={e => setMode(true)}>Send</button>
                <button type="button" className="btn btn btn-secondary btn-lg" onClick={e => setMode(false)}>Recibir</button>
            </div>

            {
                (mode) ?
                    <div className="column">
                        <form className="needs-validation" noValidate>

                            <div className="form-group">
                                <div className="input-group">

                                    <select className="custom-select my-1 mr-sm-2" name="userAccount" id="inlineFormCustomSelectAccount" onChange={e => setAccountsSelected(e.target.value)} value={accountsSelected}>
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
                                    <div className="input-group-prepend"> <span className="input-group-text" id="mount">Mount to transfer</span> </div>
                                    <input
                                        type="number"
                                        className="form-control"
                                        aria-describedby="mount"
                                        name="mount"
                                        onChange={e => handleChange(e)}
                                        required />
                                    <div className="invalid-feedback"> Please provide the mount to transfer. </div>
                                </div>
                            </div>

                        </form>

                        {
                            (qr.mount > 0 && qr.account) ?
                                <div><QRCode
                                    id="123456"
                                    value={JSON.stringify(qr)}
                                    size={290}
                                    level={"H"}
                                    includeMargin={true}
                                />
                                    <div className="alert alert-info" role="alert">
                                        Now you can scan or <a onClick={downloadQR}> Download QR </a>
                                    </div>
                                </div>
                                : ''
                        }
                    </div>
                    : <div className="row"><QrReaderComponent /></div>
            }



        </div>
    )
}

export default WalletComponent