const url = 'https://restcountries.com/v3.1/';


export const getAllCountries = async () => {
    try {
        const response = await fetch(url + 'all?fields=name,capital,flags,population,region,cca3,area');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const countries = await response.json();
        return countries;
    } catch (error) {
        console.error('Error fetching countries:', error);
        throw error;
    }
};


export const getCountry = async (country_name) => {
    try {
        const country_url = url + `name/${country_name}?fullText=true`;
        const response = await fetch(country_url);
        console.log('Fetching URL: ' + country_url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const countries = await response.json();
        return countries;
    } catch (error) {
        console.error('Error fetching countries:', error);
        throw error;
    }
};