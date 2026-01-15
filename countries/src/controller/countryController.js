const url = `https://restcountries.com/v3.1/`;

// Récupérer tous les pays
export const getAllCountries = async () => {
    try {
        const response = await fetch(`${url}all?fields=name,capital,region,flags,population`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des pays');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur:', error);
        throw error;
    }
};

// Rechercher un pays par nom
export const searchCountryByName = async (name) => {
    try {
        const response = await fetch(`${url}name/${name}`);
        if (!response.ok) {
            throw new Error('Pays non trouvé');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur:', error);
        throw error;
    }
};

// Filtrer par région
export const getCountriesByRegion = async (region) => {
    try {
        const response = await fetch(`${url}region/${region}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des pays');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur:', error);
        throw error;
    }
};
