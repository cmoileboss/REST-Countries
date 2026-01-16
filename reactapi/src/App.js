import logo from './logo.svg';
import './App.css';
import CountryList from './components/CountryList';
import CustomDropdown from './components/CustomDropdown';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <section className="country-list-section">
         <CustomDropdown 
          options={['All', 'Europe', 'Americas', 'Asia', 'Oceania', 'Antarctic', 'Africa']} 
          label="Select an option"
          orders={['Default', 'Alphabetical', 'Population']}/>
      </section>
    </div>
  );
}

/*         
        />
*/

export default App;
