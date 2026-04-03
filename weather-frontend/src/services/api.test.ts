import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { api } from './api'

vi.mock('axios')
const mockedAxios = vi.mocked(axios)

describe('api service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getCountries', () => {
    it('deve buscar lista de países', async () => {
      const countries = [
        { code: 'BR', name: 'Brasil', capital: 'Brasília' },
        { code: 'AR', name: 'Argentina', capital: 'Buenos Aires' },
      ]
      mockedAxios.get = vi.fn().mockResolvedValue({ data: countries })

      const result = await api.getCountries()

      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:8080/api/countries')
      expect(result).toEqual(countries)
    })

    it('deve propagar erro da API', async () => {
      mockedAxios.get = vi.fn().mockRejectedValue(new Error('Network error'))

      await expect(api.getCountries()).rejects.toThrow('Network error')
    })
  })

  describe('getWeather', () => {
    it('deve buscar clima para código de país', async () => {
      const weather = {
        city: 'Brasília',
        country: 'Brasil',
        temperature: 28.5,
        windSpeed: 15.2,
        weatherCode: 2,
        description: 'Parcialmente nublado',
      }
      mockedAxios.get = vi.fn().mockResolvedValue({ data: weather })

      const result = await api.getWeather('BR')

      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:8080/api/weather/BR')
      expect(result).toEqual(weather)
    })
  })
})
