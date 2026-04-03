import axios from 'axios'
import type { Country, Weather } from '../types'

const API_BASE_URL = 'http://localhost:8080/api'

export const api = {
  async getCountries(): Promise<Country[]> {
    const response = await axios.get<Country[]>(`${API_BASE_URL}/countries`)
    return response.data
  },

  async getWeather(countryCode: string): Promise<Weather> {
    const response = await axios.get<Weather>(`${API_BASE_URL}/weather/${countryCode}`)
    return response.data
  },
}
