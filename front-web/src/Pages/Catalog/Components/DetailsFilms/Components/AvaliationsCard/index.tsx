import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

type Props = {
    autorReview?: string;
    textReview?: string;
}

const AvaliationsCard = ({autorReview, textReview}:Props) => {

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <FontAwesomeIcon icon={faStar} className="avaliations-img" />
                <p className="avaliations-name" >{autorReview}</p>
            </div>
            <div style={{ display: 'block' }}>
                <div className="avaliations-form">
                <h3 className="avaliations-text">{textReview}</h3>
                </div>
            </div>
        </div>
    );
};

export default AvaliationsCard;