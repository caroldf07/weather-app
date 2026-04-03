import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useWeather } from './useWeather'
import { api } from '../services/api'

vi.mock('../services/api')
const mockedApi = vi.mocked(api)

describe('useWeather', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve iniciar com estado vazio', () => {
    const { result } = renderHook(() => useWeather())

    expect(result.current.weather).toBeNull()
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('deve buscar clima com sucesso', async () => {
    const mockWeather = {
      city: 'Brasília',
      country: 'Brasil',
      temperature: 28.5,
      windSpeed: 15.2,
      weatherCode: 2,
      description: 'Parcialmente nublado',
    }
    mockedApi.getWeather = vi.fn().mockResolvedValue(mockWeather)

    const { result } = renderHook(() => useWeather())

    await act(async () => {
      await result.current.fetchWeather('BR')
    })

    expect(result.current.weather).toEqual(mockWeather)
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('deve definir loading durante a busca', async () => {
    let resolvePromise!: (value: any) => void
    const promise = new Promise(resolve => {
      resolvePromise = resolve
    })
    mockedApi.getWeather = vi.fn().mockReturnValue(promise)

    const { result } = renderHook(() => useWeather())

    act(() => {
      result.current.fetchWeather('BR')
    })

    expect(result.current.loading).toBe(true)

    await act(async () => {
      resolvePromise({
        city: 'Brasília', country: 'Brasil', temperature: 28, windSpeed: 10, weatherCode: 1, description: 'Limpo'
      })
      await promise
    })

    expect(result.current.loading).toBe(false)
  })

  it('deve tratar erro na busca', async () => {
    mockedApi.getWeather = vi.fn().mockRejectedValue(new Error('API error'))

    const { result } = renderHook(() => useWeather())

    await act(async () => {
      await result.current.fetchWeather('BR')
    })

    expect(result.current.error).toBe('Erro ao buscar previsão do tempo. Tente novamente.')
    expect(result.current.weather).toBeNull()
  })
})
