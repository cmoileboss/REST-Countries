import React, { use } from "react";
import { useState, useEffect } from 'react';
import CountryList from "./CountryList";

function getList() {
    return CountryList();
}

export default function CountryDetails({ country_name, onBack }){

    console.log("country_name:", country_name);
    const [country, setCountry] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        const web_name = country_name.replace(' ', '%20');
        const url = `https://restcountries.com/v3.1/name/${web_name}?fullText=true`;
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Mauvaise réponse serveur');
                }
                return response.json();
            })
            .then((data) => {
                setCountry(data[0]);
                setLoading(false);
                console.log("country data:", country);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
        }, []);
        console.log(country);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>Erreur: {error.message}</div>;
    }
// name,capital,flags,population,region,subregion,borders,area,cca3,timezones

    if (!country) {
        return;
    }
    const name = country.name.common;
    const capital = country.capital;
    const flags = country.flags.png;
    const currencies = Object.entries(country.currencies);
    const [ symbol, currency ] = currencies[0];
    const population = country.population;
    const region = country.region;
    const subregion = country.subregion;
    const borders = country.borders; // liste
    const area = country.area;
    const cca3 = country.cca3;
    const timezones = country.timezones;
    const langs = Object.keys(country.languages);
    const languages = langs.map((key) => country.languages[key]);

    

    return(
        <div className="countryDetails">
            <button onClick={onBack} style={{ marginBottom: '20px', padding: '10px 20px', cursor: 'pointer' }}>
                ← Retour à la liste
            </button>
            <h1>{name}</h1>
            <p>
                Capital : {capital}<br/>
                Population count : {population}<br/>
                Region : {region}<br/>
                Subregion : {subregion}<br/>
                Borders : {borders ? borders.join(', ') : 'None'}<br/>
                Area : {area} km²<br/>
                CCA3 : {cca3}<br/>
                Timezones : {timezones.join(', ')}<br/>
                Currency : {currency.name} ({symbol})<br/>
                Languages : {languages.join(', ')}<br/>
            </p>
            <img src={flags} className="flag"></img>
        </div>
    );
}