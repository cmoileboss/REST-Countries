import './country-card.css';



export function CountryCard({ country, onClick }) {
    return (
        <li 
            key={country.cca3} 
            id={country.cca3}  
            className="country-card"
            onClick={() => onClick(country)}
        >
            <img className="country-flag" src={country.flags.png} alt={country.name.common} />
            
            <div className="country-info">
                <h3>{country.name.common}</h3>
                <p><strong>Population : </strong> {country.population.toLocaleString()}</p>
                <p><strong>Superficie : </strong> {country.area ? country.area.toLocaleString() + ' km²' : 'N/A'}</p>
                <p><strong>Région : </strong> {country.region}</p>
                <p><strong>Capitale : </strong> {country.capital ? country.capital[0] : 'N/A'}</p>
                <p><strong>Densité : </strong>{country.area !== 0 ? (country.population/country.area).toLocaleString() + ' hab./km²' : 'N/A'}</p>
            </div>
        </li>
    );
}