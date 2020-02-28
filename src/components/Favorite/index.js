import React, { useEffect, useState } from 'react'
//import axios from 'axios'

//const baseUrl = "https://074ad93b.ngrok.io"
const FavoriteComponent = props => {
    // eslint-disable-next-line
    const [jwt, setJwt] = useState('')

    useEffect(() => {
        let localJwt = JSON.parse(localStorage.getItem("jwt"))
        setJwt(localJwt)
    }, [])

    return (
        <h4>Favorite</h4>
    )
}

export default FavoriteComponent