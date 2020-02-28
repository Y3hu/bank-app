import React from 'react'

const CardsListComponent = ({ move }) => {
    let currency = JSON.parse(localStorage.getItem("currency"))
    return (
        <div className={(move.type === "credit") ? "card border-primary mb-3" : "card border-secondary mb-3"}>
            <div className="card-header">
                {move.type}
                <p className="card-text">
                    <strong>
                        {
                            (currency === "dolar") ? `$` : "₡"
                        }
                        {move.mount}
                    </strong>
                </p>
            </div>
            <div className={(move.type === "credit") ? "card-body text-primary" : "card-body text-secondary"}>
                <h6 className="card-title"><strong>Detail:</strong> {move.detail}</h6>
                <p className="card-text"><strong>Receptor:</strong> {move.receptor}</p>
            </div>
        </div>
    )
}

export default CardsListComponent