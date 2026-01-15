import React, { useState, useEffect } from 'react';
import { getAllCountries, searchCountryByName, getCountriesByRegion } from '../controller/CountryController';
import CountryCard from './CountryCard';
import './CountryList.css';

const CountryList = () => {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');

    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        try {
            setLoading(true);
            const data = await getAllCountries();
            setCountries(data.slice(0,10));
            setFilteredCountries(data.slice(0,10));
            setError(null);
        } catch (err) {
            setError('Impossible de charger les pays. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        filterCountries(term, selectedRegion);
    };

    const handleRegionChange = (e) => {
        const region = e.target.value;
        setSelectedRegion(region);
        filterCountries(searchTerm, region);
    };

    const filterCountries = (search, region) => {
        let filtered = countries;

        if (search) {
            filtered = filtered.filter(country =>
                country.name.common.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (region) {
            filtered = filtered.filter(country =>
                country.region === region
            );
        }

        setFilteredCountries(filtered);
    };

    if (loading) {
        return <div className="loading">Chargement des pays...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="country-list-container">
            <div className="filters">
                <input
                    type="text"
                    placeholder="Rechercher un pays..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-input"
                />
                <select
                    value={selectedRegion}
                    onChange={handleRegionChange}
                    className="region-select"
                >
                    <option value="">Toutes les régions</option>
                    <option value="Africa">Afrique</option>
                    <option value="Americas">Amériques</option>
                    <option value="Asia">Asie</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Océanie</option>
                </select>
            </div>

            <div className="country-count">
                {filteredCountries.length} pays trouvé{filteredCountries.length > 1 ? 's' : ''}
            </div>

            <div className="country-grid">
                {filteredCountries.map((country) => (
                    <CountryCard key={country.cca3} country={country} />
                ))}
            </div>
        </div>
    );
};

export default CountryList;
