import { useState, useCallback } from 'react'
import type { Weather } from '../types'
import { api } from '../services/api'

interface UseWeatherState {
  weather: Weather | null
  loading: boolean
  error: string | null
}

export function useWeather() {
  const [state, setState] = useState<UseWeatherState>({
    weather: null,
    loading: false,
    error: null,
  })

  const fetchWeather = useCallback(async (countryCode: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    try {
      const weather = await api.getWeather(countryCode)
      setState({ weather, loading: false, error: null })
    } catch (err) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Erro ao buscar previsão do tempo. Tente novamente.',
      }))
    }
  }, [])

  return { ...state, fetchWeather }
}
