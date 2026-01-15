import './App.css';
import CountryList from './components/CountryList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🌍 REST Countries</h1>
        <p>Découvrez tous les pays du monde</p>
      </header>
      <main>
        <CountryList />
      </main>
    </div>
  );
}

export default App;
