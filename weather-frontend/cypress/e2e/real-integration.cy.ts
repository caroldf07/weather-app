/**
 * Testes de integração real: Frontend (porta 3000) + Backend (porta 8080)
 *
 * Estes testes NÃO usam cy.intercept — testam o fluxo completo:
 *   React → Spring Boot → Open-Meteo API
 *
 * Pré-requisito: backend rodando em http://localhost:8080
 */

describe('Integração Real — Frontend + Backend', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('deve carregar a lista real de países do backend', () => {
    // Aguarda o select ser populado com dados reais vindos do backend
    cy.get('select', { timeout: 10000 }).should('not.be.disabled')
    cy.get('select option').should('have.length.greaterThan', 2)

    // Verifica presença de países esperados
    cy.get('select').should('contain', 'Brasil')
    cy.get('select').should('contain', 'Argentina')
    cy.get('select').should('contain', 'França')
    cy.get('select').should('contain', 'Portugal')
  })

  it('deve buscar clima real do Brasil via backend', () => {
    cy.get('select', { timeout: 10000 }).should('not.be.disabled')
    cy.get('select').select('BR')

    // Aguarda card aparecer (backend chama Open-Meteo de verdade)
    cy.get('[data-testid="weather-card"]', { timeout: 15000 }).should('be.visible')

    // Verifica a cidade e país
    cy.contains('Brasília').should('be.visible')
    cy.contains('Brasil').should('be.visible')

    // Temperatura deve ser um número válido (não sabemos o valor exato)
    cy.get('[data-testid="temperature"]').invoke('text').then(text => {
      const temp = parseFloat(text.replace('°C', ''))
      expect(temp).to.be.a('number')
      expect(temp).to.be.within(-40, 60) // faixa razoável de temperatura
    })

    // Velocidade do vento deve ser um número
    cy.get('[data-testid="wind-speed"]').invoke('text').then(text => {
      const wind = parseFloat(text.replace(/[^\d.]/g, ''))
      expect(wind).to.be.a('number')
      expect(wind).to.be.at.least(0)
    })
  })

  it('deve buscar clima real de Portugal via backend', () => {
    cy.get('select', { timeout: 10000 }).should('not.be.disabled')
    cy.get('select').select('PT')

    cy.get('[data-testid="weather-card"]', { timeout: 15000 }).should('be.visible')
    cy.contains('Lisboa').should('be.visible')
    cy.contains('Portugal').should('be.visible')
  })

  it('deve trocar de país e atualizar clima com dados reais', () => {
    cy.get('select', { timeout: 10000 }).should('not.be.disabled')

    // Seleciona Brasil
    cy.get('select').select('BR')
    cy.get('[data-testid="weather-card"]', { timeout: 15000 }).should('be.visible')
    cy.contains('Brasília').should('be.visible')

    // Troca para França
    cy.get('select').select('FR')
    cy.get('[data-testid="weather-card"]', { timeout: 15000 }).should('be.visible')
    cy.contains('Paris').should('be.visible')
    cy.contains('França').should('be.visible')
  })

  it('deve exibir descrição de clima não vazia', () => {
    cy.get('select', { timeout: 10000 }).should('not.be.disabled')
    cy.get('select').select('JP')

    cy.get('[data-testid="weather-card"]', { timeout: 15000 }).should('be.visible')
    cy.contains('Tóquio').should('be.visible')

    // A descrição deve ser uma das strings mapeadas pelo backend
    const validDescriptions = [
      'Céu limpo', 'Principalmente limpo', 'Parcialmente nublado', 'Nublado',
      'Neblina', 'Garoa', 'Chuva', 'Neve', 'Chuva forte', 'Trovoada',
      'Trovoada com granizo', 'Desconhecido',
    ]
    cy.get('.weather-description').invoke('text').then(text => {
      expect(validDescriptions).to.include(text.trim())
    })
  })
})
