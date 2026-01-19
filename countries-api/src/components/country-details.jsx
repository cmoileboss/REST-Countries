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
    const currencies = selectedCountry.currencies ? Object.entries(selectedCountry.currencies) : null;
    const [ symbol, currency ] = currencies ? currencies[0] : [null, null];
    const population = selectedCountry.population;
    const region = selectedCountry.region;
    const subregion = selectedCountry.subregion ? selectedCountry.subregion : 'Aucune';
    const borders = selectedCountry.borders;
    const bordering_countries = borders ? borders.map((border) => countries.get(border)) : null;
    const area = selectedCountry.area;
    const cca3 = selectedCountry.cca3;
    const timezones = selectedCountry.timezones;
    const langs = selectedCountry.languages ? Object.keys(selectedCountry.languages) : null;
    const languages = langs ? langs.map((key) => selectedCountry.languages[key]) : null;


    return(
        <div>
            <button onClick={onBack} style={{ marginBottom: '20px', padding: '10px 20px', cursor: 'pointer' }}>
                    ← Retour à la liste
            </button>
            <div className="countryDetails">
                
                <h1>{name}</h1>
                <p>
                    Capitale : {capital ? capital : 'Aucune'}<br/>
                    Population : {population}<br/>
                    Région : {region}<br/>
                    Sous-région : {subregion}<br/>
                    Pays frontaliers : {borders ? bordering_countries.join(', ') : 'Aucun'}<br/>
                    Superficie : {area} km²<br/>
                    CCA3 : {cca3}<br/>
                    Timezones : {timezones.join(', ')}<br/>
                    Monnaie : {currency ? currency.name : 'Aucune'} { symbol ? symbol : ''}<br/>
                    Langues : {languages ? languages.join(', ') : 'Aucune'}<br/>
                </p>
                <img src={flags} className="flag"></img>
            </div>
        </div>
    );
}