import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WeatherCard } from './WeatherCard'

const mockWeather = {
  city: 'Brasília',
  country: 'Brasil',
  temperature: 28.5,
  windSpeed: 15.2,
  weatherCode: 2,
  description: 'Parcialmente nublado',
}

describe('WeatherCard', () => {
  it('deve renderizar cidade e país', () => {
    render(<WeatherCard weather={mockWeather} />)

    expect(screen.getByText('Brasília')).toBeInTheDocument()
    expect(screen.getByText('Brasil')).toBeInTheDocument()
  })

  it('deve renderizar temperatura', () => {
    render(<WeatherCard weather={mockWeather} />)

    expect(screen.getByTestId('temperature')).toHaveTextContent('28.5°C')
  })

  it('deve renderizar descrição do clima', () => {
    render(<WeatherCard weather={mockWeather} />)

    expect(screen.getByText('Parcialmente nublado')).toBeInTheDocument()
  })

  it('deve renderizar velocidade do vento', () => {
    render(<WeatherCard weather={mockWeather} />)

    expect(screen.getByTestId('wind-speed')).toHaveTextContent('15.2 km/h')
  })

  it('deve exibir emoji para céu limpo (code 0)', () => {
    render(<WeatherCard weather={{ ...mockWeather, weatherCode: 0 }} />)
    expect(screen.getByLabelText('ícone do clima')).toHaveTextContent('☀️')
  })

  it('deve exibir emoji para chuva (code 61-65)', () => {
    render(<WeatherCard weather={{ ...mockWeather, weatherCode: 61 }} />)
    expect(screen.getByLabelText('ícone do clima')).toHaveTextContent('🌧️')
  })
})
