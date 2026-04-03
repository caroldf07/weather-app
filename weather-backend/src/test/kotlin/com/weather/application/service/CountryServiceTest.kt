package com.weather.application.service

import com.weather.application.ports.output.CountryPort
import com.weather.domain.model.Country
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

class CountryServiceTest {

    private val countryPort: CountryPort = mockk()
    private val countryService = CountryService(countryPort)

    @Test
    fun `deve retornar lista de paises`() {
        val countries = listOf(
            Country("BR", "Brasil", "Brasília", -15.78, -47.93),
            Country("AR", "Argentina", "Buenos Aires", -34.60, -58.38)
        )
        every { countryPort.findAll() } returns countries

        val result = countryService.execute()

        assertEquals(2, result.size)
        assertEquals("Brasil", result[0].name)
        verify(exactly = 1) { countryPort.findAll() }
    }

    @Test
    fun `deve retornar lista vazia quando nao ha paises`() {
        every { countryPort.findAll() } returns emptyList()

        val result = countryService.execute()

        assertTrue(result.isEmpty())
    }
}
