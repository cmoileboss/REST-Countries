import React from "react"

const Modal = ({})

export default function CountryCard(country){
    const name = country.name.common;
    const capital = country.capital;
    const flags = country.flags.png;
    //const currency = country.currencies;
    const population = country.population;

    return(
        <div className="countryCard">
            <h1>{name}</h1>

            <p>
                Capital : {capital}<br/>
                Population count : {population}<br/>
            </p>
            <img src={flags} className="flag"></img>
        </div>
    );
}