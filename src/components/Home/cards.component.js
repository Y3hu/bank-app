import React from 'react';

import './home.component.scss';
import visaLogo from '../../assets/visa_logo.png';
import masterCardLogo from '../../assets/mc_logo.png';

const cardTypeToLogo = {
    'MASTERCARD': masterCardLogo,
    'VISA': visaLogo
};

export default (props) => {
    return (
        <div className='credit-card'>
            <div className='credit-card__logo'>
                <img className='logo' src={cardTypeToLogo[props.type]} alt="credit card logo" width="60" />
            </div>

            <div className='credit-card__number'>{props.number}</div>

            <div className='credit-card__info'>
                <div className='credit-card__info_name'>
                    <div className='credit-card__info_label'>CARDHOLDER'S NAME</div>
                    <div>{props.name}</div>
                </div>

                <div className='credit-card__info_expiry'>
                    <div className='credit-card__info_label'>VALID UP TO</div>
                    <div>{props.expiry}</div>
                </div>
            </div>

        </div>
    );
}