import { useState } from 'react'
import { CountrySelector } from './components/CountrySelector/CountrySelector'
import { WeatherCard } from './components/WeatherCard/WeatherCard'
import { LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner'
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage'
import { useCountries } from './hooks/useCountries'
import { useWeather } from './hooks/useWeather'
import './App.css'

function App() {
  const [selectedCode, setSelectedCode] = useState('')
  const { countries, loading: countriesLoading, error: countriesError } = useCountries()
  const { weather, loading: weatherLoading, error: weatherError, fetchWeather } = useWeather()

  const handleCountrySelect = (code: string) => {
    setSelectedCode(code)
    if (code) {
      fetchWeather(code)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌍 Previsão do Tempo Mundial</h1>
        <p>Consulte o clima na capital do país que desejar</p>
      </header>

      <main className="app-main">
        {countriesError ? (
          <ErrorMessage message={countriesError} />
        ) : (
          <CountrySelector
            countries={countries}
            selectedCode={selectedCode}
            onSelect={handleCountrySelect}
            loading={countriesLoading}
            disabled={weatherLoading}
          />
        )}

        {weatherLoading && <LoadingSpinner />}
        {weatherError && <ErrorMessage message={weatherError} />}
        {weather && !weatherLoading && <WeatherCard weather={weather} />}
      </main>
    </div>
  )
}

export default App
