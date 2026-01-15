
/**
 * Endpoint to fetch countries data
 * @param {*} fields - fields to fetch, separated by comma
 * @returns {Json} - JSON Object with countries data
 */
async function fetchCountries(fields) {
  const response = await fetch(`https://restcountries.com/v3.1/all?fields=${fields}`)
                            .catch(error => {
                              console.error('Error fetching country data:', error);
                            });
  
  const data = await response.json();
  return data;
}

export default { fetchCountries };