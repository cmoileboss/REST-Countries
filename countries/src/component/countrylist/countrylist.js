import { fetchCountries } from '../../controller/countryController.js';

export function CountryList() {
  return (
    <div className="listDisplay">
      <p>
          {createList()}
      </p>
    </div>
  );
}

function createList() {
    const countries = fetchCountries('name').then(data => data);
    console.log(countries);

    const listItems = countries.map((country) =>
        <li key={country.name.common}>{country.name.common}</li>
    );
    return <ul>{listItems}</ul>;
}