import React from 'react'

const SpinnerComponent = props => {
    return (
        <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export default SpinnerComponent