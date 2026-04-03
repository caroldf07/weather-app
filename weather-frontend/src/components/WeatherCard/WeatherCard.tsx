import type { Weather } from '../../types'

interface WeatherCardProps {
  weather: Weather
}

function getWeatherEmoji(code: number): string {
  if (code === 0) return '☀️'
  if (code <= 3) return '⛅'
  if (code <= 48) return '🌫️'
  if (code <= 55) return '🌦️'
  if (code <= 65) return '🌧️'
  if (code <= 75) return '❄️'
  if (code <= 82) return '🌧️'
  return '⛈️'
}

export function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div className="weather-card" data-testid="weather-card">
      <div className="weather-icon" aria-label="ícone do clima">
        {getWeatherEmoji(weather.weatherCode)}
      </div>
      <h2 className="weather-city">{weather.city}</h2>
      <p className="weather-country">{weather.country}</p>
      <div className="weather-temp" data-testid="temperature">
        {weather.temperature}°C
      </div>
      <p className="weather-description">{weather.description}</p>
      <div className="weather-details">
        <span data-testid="wind-speed">💨 {weather.windSpeed} km/h</span>
      </div>
    </div>
  )
}
