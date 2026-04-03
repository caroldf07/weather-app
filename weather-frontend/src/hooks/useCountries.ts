import { useState, useEffect } from 'react'
import type { Country } from '../types'
import { api } from '../services/api'

interface UseCountriesState {
  countries: Country[]
  loading: boolean
  error: string | null
}

export function useCountries() {
  const [state, setState] = useState<UseCountriesState>({
    countries: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    api.getCountries()
      .then(countries => setState({ countries, loading: false, error: null }))
      .catch(() => setState(prev => ({
        ...prev,
        loading: false,
        error: 'Erro ao carregar países.',
      })))
  }, [])

  return state
}
