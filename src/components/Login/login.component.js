import React, { useState } from 'react'
import axios from 'axios'

import { useAuthorForm } from '../Hooks/forms-values.hook'

const baseUrl = "https://9043246e.ngrok.io"

const LoginComponent = ({ func, fakeAuth }) => {
    const { values, updateValues, reset } = useAuthorForm({
        InputEmail: '',
        InputPassword: ''
    })
    // eslint-disable-next-line
    const [userInfo, setUserInfo] = useState({})

    const onSubmitForm = e => {
        e.preventDefault()
        authenticate(e)
    }

    const validateForm = e => {
        var form = document.querySelector('.needs-validation');

        if (form.checkValidity() === false) {
            e.stopPropagation()
            form.classList.add('was-validated')
            return false
        }
        return true
    }

    const authenticate = e => {
        //return UsersArray.find((element, index) => element.InputName === values.InputName)

        axios.post(`${baseUrl}/authenticate`, { username: "foo", password: "foo" })
            .then(res => {
                localStorage.setItem("jwt", JSON.stringify(res.data.jwt))
            })
            .then(() => {
                findUser(e)
            })
            .catch(err => console.log(err))
    }

    const findUser = e => {
        let jwt = JSON.parse(localStorage.getItem('jwt'))
        console.log(jwt)

        axios.get(`${baseUrl}/api/user/`, {
            params: {
                "email": values.InputEmail,
                "password": values.InputPassword
            },
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        })
            .then(res => {
                sessionStorage.setItem("user", JSON.stringify(res.data))
                let validate = validateForm(e)

                if (validate) {

                } else return 0

                if (JSON.parse(sessionStorage.getItem("user"))) {
                    func()
                    reset()
                }
                else {
                    alert('User not registered')
                    return 0
                }

            })
            .catch(err => console.log(err))
    }

    return (
        <div className="card">
            <h5 className="card-header">
                Log In {userInfo.username}
            </h5>
            <div className="card-body">
                <form className="needs-validation" noValidate>

                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend"> <span className="input-group-text" id="InputName">Email</span> </div>
                            <input
                                type="email"
                                className="form-control"
                                aria-describedby="InputEmail"
                                name="InputEmail"
                                pattern="[a-zA-Z0-9_]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?!([a-zA-Z0-9]*\.[a-zA-Z0-9]*\.[a-zA-Z0-9]*\.))(?:[A-Za-z0-9](?:[a-zA-Z0-9-]*[A-Za-z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?"
                                onChange={e => updateValues(e)}
                                required />
                            <div className="invalid-feedback"> Please provide your user email. </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend"> <span className="input-group-text" id="InputPassword">Password</span> </div>
                            <input
                                type="password"
                                className="form-control"
                                aria-describedby="InputPassword"
                                name="InputPassword"
                                onChange={e => updateValues(e)}
                                required />
                            <div className="invalid-feedback"> Please provide your password. </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="card-footer">
                <button id="login-button" type="button" className="button btn btn-primary" data-dismiss="modal" onClick={e => onSubmitForm(e)}><span>Login</span></button>
            </div>
        </div>
    )
}

export default LoginComponent