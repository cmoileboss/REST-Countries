import React from "react";
import { useState, useEffect } from 'react';

export default function CountryDetails(country_name){

    console.log("country_name:", country_name.country_name);
    const [country, setCountry] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        const web_name = country_name.country_name.replace(' ', '%20');
        const url = `https://restcountries.com/v3.1/name/${web_name}?fullText=true`;
        console.log("Fetching URL:", url);
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


    return(
        <div className="countryDetails">
            <h1>{name}</h1>

            <p>
                Capital : {capital}<br/>
                Population count : {population}<br/>
            </p>
            <img src={flags} className="flag"></img>
        </div>
    );
}