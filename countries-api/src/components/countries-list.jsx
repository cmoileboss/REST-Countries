import { useState, useEffect } from 'react';
import { getAllCountries } from '../controllers/CountryController.jsx';
import { CountryCard } from './country-card.jsx';
import { CountryDetails } from './country-details.jsx';
import Select from "react-dropdown-select";

import './countries-list.css';

const density = (country) => {
    return country.population / country.area;
}


export function CountriesList() {
    const [ countries, setCountries ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ searchTerm, setSearchTerm ] = useState("");
    const [ filteredCountries, setFilteredCountries ] = useState([]);
    const [ selectedOrder, setSelectedOrder ] = useState('');
    const [ selectedRegion, setSelectedRegion ] = useState('Monde entier');
    const [ selectedCountry, setSelectedCountry ] = useState('');

    useEffect(() => {
        getAllCountries()
            .then(data => { setCountries(data); setFilteredCountries(data); })
            .catch(error => setError(error))
            .finally(() => setLoading(false));
    }, []);

    // Fonction permettant d'afficher seulement les pays contenant la valeur du champ texte
    function handleSearchChange(e) {
        const term = e.target.value;
        setSearchTerm(term);
        filterCountries(term, selectedRegion);
    }

    // Fonction permettant d'afficher les pays filtrés dans un ordre précis
    function handleOrderChange(order) {
        setSelectedOrder(order);
        const orderedCountries = applyOrder(filteredCountries, order);
        setFilteredCountries(orderedCountries);
    }

    // Fonction permettant d'afficher seulement les pays d'une certaine région
    function handleRegionChange(region) {
        setSelectedRegion(region);
        filterCountries(searchTerm, region);
    }


    // On applique le filtre souhaité
    const filterCountries = (term, region) => {
        let countriesToFilter = [...countries];

        if (term) {
            countriesToFilter = countriesToFilter.filter(country => 
                country.name.common.toLowerCase().includes(term.toLowerCase())
            );
        }

        if (region.length > 0 && region !== 'Monde entier') {
            countriesToFilter = countriesToFilter.filter(country => country.region === region);
        }

        const orderedCountries = applyOrder(countriesToFilter, selectedOrder);
        setFilteredCountries(orderedCountries);
    };


    // On applique l'ordre souhaité
    const applyOrder = (countriesToOrder, order) => {
        if (!order || order.length === 0) return countriesToOrder;
        
        let orderedCountries = [...countriesToOrder];
        if (order === 'alphabetical')
            orderedCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));
        else if (order === 'population asc')
            orderedCountries.sort((a, b) => a.population - b.population);
        else if (order === 'population desc')
            orderedCountries.sort((a, b) => b.population - a.population);
        else if (order === 'area asc')
            orderedCountries.sort((a, b) => a.area - b.area);
        else if (order === 'area desc')
            orderedCountries.sort((a, b) => b.area - a.area);
        else if (order === 'density asc') {
            orderedCountries.sort((a, b) => density(a) - density(b));
        }
        else if (order === 'density desc') {
            orderedCountries.sort((a, b) => density(b) - density(a));
        }
        return orderedCountries;
    };

    // Pendant le chargement des pays
    if (loading)
        return (<div id="loading">Chargement des pays en cours...</div>);

    // En cas d'erreur lors du chargement des pays
    if (error)
        return (<div id="error">Erreur lors du chargement des pays.</div>)

    // Événement lorsqu'on appuie sur la carte d'un pays
    if (selectedCountry) {
        console.log(selectedCountry);
        return <CountryDetails country_name={selectedCountry} onBack={() => setSelectedCountry(null)} countries={countries}/>
    }

    // Liste des ordres possibles
    const orderOptions = [
        {
            value: 'alphabetical', label: 'Ordre alphabétique'
        },
        {
            value: 'population asc', label: 'Population (croissante)'
        },
        {
            value: 'population desc', label: 'Population (décroissante)'
        },
        {
            value: 'area asc', label: 'Superficie (croissante)'
        },
        {
            value: 'area desc', label: 'Superficie (décroissante)'
        },
        {
            value: 'density asc', label: 'Densité (croissante)'
        },
        {
            value: 'density desc', label: 'Densité (décroissante)'
        }
    ];

    // Liste des régions possibles
    const regionOptions = [
        {
            value: 'Monde entier', label: 'Monde entier'
        },
        {
            value: 'Africa', label: 'Africa'
        },
        {
            value: 'Antarctic', label: 'Antarctic'
        },
        {
            value: 'Americas', label: 'Americas'
        },
        {
            value: 'Europe', label: 'Europe'
        },
        {
            value: 'Asia', label: 'Asia'
        },
        {
            value: 'Oceania', label: 'Oceania'
        }
    ];

    return (
        <div>
            <Select
                className="order-select"
                placeholder="Ordonné par"
                options={orderOptions}
                onChange={option => { 
                    if (option.length > 0) {
                        handleOrderChange(option[0].value);
                    }
                }}
            />
            <Select
                className="region-select"
                placeholder="Trier par région"
                options={regionOptions}
                onChange={option => { 
                    if (option.length > 0) {
                        handleRegionChange(option[0].value);
                    }
                }}
            />
            <input 
                type="text" 
                className="search-input"
                placeholder="Entrez le nom d'un pays..." 
                value={searchTerm} 
                onChange={handleSearchChange}
            />
            <ul className="countries-list">
                {
                    filteredCountries.map((country) => {
                        return <li key={country.cca3} id={country.cca3} onClick={() => setSelectedCountry(country.name.common)}>{CountryCard(country)}</li>
                    })
                }
            </ul>
        </div>
    )
}