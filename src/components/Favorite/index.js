import React, { useEffect } from 'react'
import axios from 'axios'

const FavoriteComponent = props => {

    useEffect(() => {
        //?all=no&id=2
        axios.get("http://localhost:8080/api/account/?all=yes&id=0")
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    })

    return (
        <div>Favorite</div>
    )
}

export default FavoriteComponent