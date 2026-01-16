import React, { useState, useEffect } from 'react';
import CountryCard from './CountryCard.js'

export default function CountryList() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,capital,flags,population')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Mauvaise réponse serveur');
        }
        return response.json();
      })
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
    }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur: {error.message}</div>;
  }

  console.log(countries);

  if (countries.length === 0) {
    return <div>Aucun pays trouvé.</div>;
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name.common}>{CountryCard(country)}</li>
      ))}
    </ul>
  );
}