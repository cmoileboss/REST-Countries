/**
 * Endpoint to fetch countries data
 * @param {*} fields - fields to fetch, separated by comma
 * @returns {Json} - JSON Object with countries data
 */
export async function fetchCountries(fields) {
  const response = await fetch(`https://restcountries.com/v3.1/all?fields=${fields}`);
  
//  let data = response.json();
  //data = data.slice(0, 10); // Limit to first 10 countries for performance
//  console.log(data);
  const data = await response.json();
  return data;
}