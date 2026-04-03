import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ErrorMessage } from './ErrorMessage'

describe('ErrorMessage', () => {
  it('deve renderizar mensagem de erro', () => {
    render(<ErrorMessage message="Algo deu errado" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Algo deu errado')
  })
})
