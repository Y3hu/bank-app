import React from 'react'

const CardsListComponent = ({ move }) => {
    let currency = JSON.parse(localStorage.getItem("currency"))
    return (
        <div
            className={(move.type === "credit") ? "card border-primary mb-3" : "card border-secondary mb-3"}>
            <div className="card-header">{move.type}</div>
            <div className={(move.type === "credit") ? "card-body text-primary" : "card-body text-secondary"}>
                <h5 className="card-title">{move.detail}</h5>
                <p className="card-text">{move.receptor}</p>
                <p className="card-text">
                    {
                        (currency === "dolar") ? `$` : "₡"
                    }
                    {move.mount}
                </p>
            </div>
        </div>
    )
}

export default CardsListComponent