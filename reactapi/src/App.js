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
        <CountryList/>
      </section>
    </div>
  );
}

/*         <CustomDropdown 
          options={['Name', 'Capital', 'Currencies']} 
          label="Select an option" 
        />
*/

export default App;
