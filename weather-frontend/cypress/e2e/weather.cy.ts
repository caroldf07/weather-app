describe('Weather App - E2E', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:8080/api/countries', {
      statusCode: 200,
      body: [
        { code: 'BR', name: 'Brasil', capital: 'Brasília' },
        { code: 'AR', name: 'Argentina', capital: 'Buenos Aires' },
        { code: 'FR', name: 'França', capital: 'Paris' },
      ],
    }).as('getCountries')

    cy.intercept('GET', 'http://localhost:8080/api/weather/BR', {
      statusCode: 200,
      body: {
        city: 'Brasília',
        country: 'Brasil',
        temperature: 28.5,
        windSpeed: 15.2,
        weatherCode: 2,
        description: 'Parcialmente nublado',
      },
    }).as('getWeatherBR')

    cy.intercept('GET', 'http://localhost:8080/api/weather/AR', {
      statusCode: 200,
      body: {
        city: 'Buenos Aires',
        country: 'Argentina',
        temperature: 18.3,
        windSpeed: 22.0,
        weatherCode: 61,
        description: 'Chuva',
      },
    }).as('getWeatherAR')

    cy.visit('/')
  })

  it('deve exibir título da aplicação', () => {
    cy.contains('Previsão do Tempo Mundial').should('be.visible')
  })

  it('deve carregar e exibir lista de países', () => {
    cy.wait('@getCountries')
    cy.get('select').should('contain', 'Brasil (Brasília)')
    cy.get('select').should('contain', 'Argentina (Buenos Aires)')
    cy.get('select').should('contain', 'França (Paris)')
  })

  it('deve exibir clima ao selecionar Brasil', () => {
    cy.wait('@getCountries')
    cy.get('select').select('BR')
    cy.wait('@getWeatherBR')

    cy.get('[data-testid="weather-card"]').should('be.visible')
    cy.contains('Brasília').should('be.visible')
    cy.get('[data-testid="temperature"]').should('contain', '28.5°C')
    cy.contains('Parcialmente nublado').should('be.visible')
    cy.get('[data-testid="wind-speed"]').should('contain', '15.2 km/h')
  })

  it('deve exibir clima ao selecionar Argentina', () => {
    cy.wait('@getCountries')
    cy.get('select').select('AR')
    cy.wait('@getWeatherAR')

    cy.get('[data-testid="weather-card"]').should('be.visible')
    cy.contains('Buenos Aires').should('be.visible')
    cy.get('[data-testid="temperature"]').should('contain', '18.3°C')
  })

  it('deve trocar o país e atualizar o clima', () => {
    cy.wait('@getCountries')

    cy.get('select').select('BR')
    cy.wait('@getWeatherBR')
    cy.contains('Brasília').should('be.visible')

    cy.get('select').select('AR')
    cy.wait('@getWeatherAR')
    cy.contains('Buenos Aires').should('be.visible')
  })
})
