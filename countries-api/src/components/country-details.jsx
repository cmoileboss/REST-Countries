import { useState, useEffect } from 'react';
import { getCountry } from '../controllers/CountryController.jsx';

import './country-details.css';


export function CountryDetails({ country_name, onBack, countries }) {

    const [ selectedCountry, setSelectedCountry ] = useState({});
    const [ error, setError ] = useState(null);
    const [loading, setLoading ] = useState(true);


    useEffect(() => {
        getCountry(country_name.toLowerCase().replace(' ', '%20'))
            .then(data => setSelectedCountry(data[0]))
            .catch(error => setError(error))
            .finally(() => setLoading(false));
    }, []);

    // Pendant le chargement des données du pays
    if (loading)
        return (<div id="loading">Chargement des pays en cours...</div>);

    // En cas d'erreur lors du chargement des données du pays
    if (error)
        return (<div id="error">Erreur lors du chargement des pays.</div>)
    
    // Si aucun pays n'est retourné
    if (!selectedCountry) {
        return;
    }

    const name = selectedCountry.name.common;
    const capital = selectedCountry.capital;
    const flags = selectedCountry.flags.png;
    const currencies = Object.entries(selectedCountry.currencies);
    const [ symbol, currency ] = currencies[0];
    const population = selectedCountry.population;
    const region = selectedCountry.region;
    const subregion = selectedCountry.subregion;
    const borders = selectedCountry.borders;
    const bordering_countries = borders ? borders.map((border) => {
        console.log(border);
        for (const country in countries){
            console.log(country.cca3);
            if (country.cca3 === border)
                return country.name.common;
        }
    }) : 'Aucun';
    const area = selectedCountry.area;
    const cca3 = selectedCountry.cca3;
    const timezones = selectedCountry.timezones;
    const langs = Object.keys(selectedCountry.languages);
    const languages = langs.map((key) => selectedCountry.languages[key]);


    return(
        <div>
            <button onClick={onBack} style={{ marginBottom: '20px', padding: '10px 20px', cursor: 'pointer' }}>
                    ← Retour à la liste
            </button>
            <div className="countryDetails">
                
                <h1>{name}</h1>
                <p>
                    Capitale : {capital}<br/>
                    Population : {population}<br/>
                    Région : {region}<br/>
                    Sousrégion : {subregion}<br/>
                    Pays frontaliers : {borders ? bordering_countries.join(', ') : 'Aucun'}<br/>
                    Superficie : {area} km²<br/>
                    CCA3 : {cca3}<br/>
                    Timezones : {timezones.join(', ')}<br/>
                    Monnaie : {currency.name} ({symbol})<br/>
                    Langues : {languages.join(', ')}<br/>
                </p>
                <img src={flags} className="flag"></img>
            </div>
        </div>
    );
}