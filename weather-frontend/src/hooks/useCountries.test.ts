import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useCountries } from './useCountries'
import { api } from '../services/api'

vi.mock('../services/api')
const mockedApi = vi.mocked(api)

describe('useCountries', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve carregar países ao montar', async () => {
    const countries = [
      { code: 'BR', name: 'Brasil', capital: 'Brasília' },
      { code: 'AR', name: 'Argentina', capital: 'Buenos Aires' },
    ]
    mockedApi.getCountries = vi.fn().mockResolvedValue(countries)

    const { result } = renderHook(() => useCountries())

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.countries).toEqual(countries)
    expect(result.current.error).toBeNull()
  })

  it('deve tratar erro ao carregar países', async () => {
    mockedApi.getCountries = vi.fn().mockRejectedValue(new Error('Network error'))

    const { result } = renderHook(() => useCountries())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe('Erro ao carregar países.')
    expect(result.current.countries).toEqual([])
  })
})
