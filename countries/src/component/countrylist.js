import fetchCountries from '../../controller/countryController.js';

function CountryList() {
  return (
    <div className="listDisplay">
      <p>
          {createList().slice(0, 10)}
      </p>
    </div>
  );
}

function createList() {
    const countries = fetchCountries('name');
    const listItems = countries.map((country) =>
        <li key={country.name.common}>{country.name.common}</li>
    );
    return <ul>{listItems}</ul>;
}

export default CountryList;