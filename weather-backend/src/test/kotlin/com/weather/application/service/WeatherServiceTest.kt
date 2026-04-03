package com.weather.application.service

import com.weather.application.ports.output.CountryPort
import com.weather.application.ports.output.WeatherPort
import com.weather.domain.model.Country
import com.weather.domain.model.Weather
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows

class WeatherServiceTest {

    private val countryPort: CountryPort = mockk()
    private val weatherPort: WeatherPort = mockk()
    private val weatherService = WeatherService(countryPort, weatherPort)

    @Test
    fun `deve retornar clima para codigo de pais valido`() {
        val country = Country("BR", "Brasil", "Brasília", -15.78, -47.93)
        val weather = Weather("Brasília", "Brasil", 28.5, 15.2, 2, "Parcialmente nublado")

        every { countryPort.findByCode("BR") } returns country
        every { weatherPort.fetchWeather("Brasília", "Brasil", -15.78, -47.93) } returns weather

        val result = weatherService.execute("BR")

        assertEquals("Brasília", result.city)
        assertEquals(28.5, result.temperature)
        verify { countryPort.findByCode("BR") }
        verify { weatherPort.fetchWeather("Brasília", "Brasil", -15.78, -47.93) }
    }

    @Test
    fun `deve lancar excecao para codigo de pais invalido`() {
        every { countryPort.findByCode("XX") } returns null

        assertThrows<IllegalArgumentException> {
            weatherService.execute("XX")
        }
    }

    @Test
    fun `deve normalizar codigo do pais para maiusculo`() {
        val country = Country("BR", "Brasil", "Brasília", -15.78, -47.93)
        val weather = Weather("Brasília", "Brasil", 28.5, 15.2, 2, "Parcialmente nublado")
        every { countryPort.findByCode("BR") } returns country
        every { weatherPort.fetchWeather(any(), any(), any(), any()) } returns weather

        weatherService.execute("br")

        verify { countryPort.findByCode("BR") }
    }
}
