import React, { useState, useEffect } from 'react';

export default function CountryList() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name')
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

  return (
    <ul>
      {countries.map((country) => (
        <li key={country}>{country.name.common}</li>
      ))}
    </ul>
  );
}