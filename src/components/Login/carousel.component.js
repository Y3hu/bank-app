import React from 'react'

import Promo1 from '../../assets/promo1.png'
import Promo2 from '../../assets/promo2.png'
import Promo3 from '../../assets/promo3.png'

const CarouselComponent = props => {
    return (

        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={Promo1} className="d-block" alt="Promo1" style={{ maxWidth: "100%" }} />
                </div>
                <div className="carousel-item">
                    <img src={Promo2} className="d-block" alt="Promo2" style={{ maxWidth: "100%" }} />
                </div>
                <div className="carousel-item">
                    <img src={Promo3} className="d-block" alt="Promo3" style={{ maxWidth: "100%" }} />
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>

    )
}

export default CarouselComponent