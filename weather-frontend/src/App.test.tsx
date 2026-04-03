import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from './App'
import { api } from './services/api'

vi.mock('./services/api')
const mockedApi = vi.mocked(api)

const mockCountries = [
  { code: 'BR', name: 'Brasil', capital: 'Brasília' },
  { code: 'AR', name: 'Argentina', capital: 'Buenos Aires' },
]

const mockWeather = {
  city: 'Brasília',
  country: 'Brasil',
  temperature: 28.5,
  windSpeed: 15.2,
  weatherCode: 2,
  description: 'Parcialmente nublado',
}

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockedApi.getCountries = vi.fn().mockResolvedValue(mockCountries)
    mockedApi.getWeather = vi.fn().mockResolvedValue(mockWeather)
  })

  it('deve renderizar título da aplicação', async () => {
    render(<App />)
    expect(screen.getByText(/Previsão do Tempo Mundial/i)).toBeInTheDocument()
  })

  it('deve carregar e exibir países no seletor', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Brasil (Brasília)')).toBeInTheDocument()
    })

    expect(screen.getByText('Argentina (Buenos Aires)')).toBeInTheDocument()
  })

  it('deve buscar e exibir clima ao selecionar país', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByRole('combobox')).not.toBeDisabled()
    })

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'BR' } })

    await waitFor(() => {
      expect(screen.getByTestId('weather-card')).toBeInTheDocument()
    })

    expect(screen.getByText('Brasília')).toBeInTheDocument()
    expect(screen.getByTestId('temperature')).toHaveTextContent('28.5°C')
    expect(mockedApi.getWeather).toHaveBeenCalledWith('BR')
  })

  it('deve exibir erro quando API de países falha', async () => {
    mockedApi.getCountries = vi.fn().mockRejectedValue(new Error('Network error'))

    render(<App />)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    expect(screen.getByTestId('error-message')).toHaveTextContent('Erro ao carregar países.')
  })
})
