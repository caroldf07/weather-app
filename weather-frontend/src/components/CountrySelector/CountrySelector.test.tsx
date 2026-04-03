import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CountrySelector } from './CountrySelector'

const mockCountries = [
  { code: 'BR', name: 'Brasil', capital: 'Brasília' },
  { code: 'AR', name: 'Argentina', capital: 'Buenos Aires' },
]

describe('CountrySelector', () => {
  it('deve renderizar label e select', () => {
    render(
      <CountrySelector
        countries={mockCountries}
        selectedCode=""
        onSelect={vi.fn()}
      />
    )

    expect(screen.getByLabelText('Selecione um país:')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('deve listar todos os países', () => {
    render(
      <CountrySelector
        countries={mockCountries}
        selectedCode=""
        onSelect={vi.fn()}
      />
    )

    expect(screen.getByText('Brasil (Brasília)')).toBeInTheDocument()
    expect(screen.getByText('Argentina (Buenos Aires)')).toBeInTheDocument()
  })

  it('deve chamar onSelect ao escolher um país', () => {
    const onSelect = vi.fn()
    render(
      <CountrySelector
        countries={mockCountries}
        selectedCode=""
        onSelect={onSelect}
      />
    )

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'BR' } })

    expect(onSelect).toHaveBeenCalledWith('BR')
  })

  it('deve desabilitar select quando loading', () => {
    render(
      <CountrySelector
        countries={mockCountries}
        selectedCode=""
        onSelect={vi.fn()}
        loading
      />
    )

    expect(screen.getByRole('combobox')).toBeDisabled()
    expect(screen.getByText('Carregando países...')).toBeInTheDocument()
  })

  it('deve mostrar opção padrão vazia', () => {
    render(
      <CountrySelector
        countries={mockCountries}
        selectedCode=""
        onSelect={vi.fn()}
      />
    )

    expect(screen.getByText('-- Escolha um país --')).toBeInTheDocument()
  })
})
