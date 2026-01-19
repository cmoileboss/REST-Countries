import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CountriesList } from './components/countries-list'

function App() {

  return (
    <div>
      <h1>Les pays du monde</h1>
      <CountriesList/>
    </div>
  )
}

export default App
