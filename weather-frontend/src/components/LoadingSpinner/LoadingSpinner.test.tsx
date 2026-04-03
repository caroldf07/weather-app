import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LoadingSpinner } from './LoadingSpinner'

describe('LoadingSpinner', () => {
  it('deve renderizar com aria-label adequado', () => {
    render(<LoadingSpinner />)
    expect(screen.getByRole('status', { name: 'Carregando...' })).toBeInTheDocument()
    expect(screen.getByText('Buscando previsão do tempo...')).toBeInTheDocument()
  })
})
