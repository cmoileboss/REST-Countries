import React from 'react';
import './CountryCard.css';

const CountryCard = ({ country }) => {
    return (
        <div className="country-card">
            <img 
                src={country.flags.png} 
                alt={`Drapeau de ${country.name.common}`}
                className="country-flag"
            />
            <div className="country-info">
                <h3>{country.name.common}</h3>
                <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                <p><strong>Région:</strong> {country.region}</p>
                <p><strong>Capitale:</strong> {country.capital ? country.capital[0] : 'N/A'}</p>
            </div>
        </div>
    );
};

export default CountryCard;
