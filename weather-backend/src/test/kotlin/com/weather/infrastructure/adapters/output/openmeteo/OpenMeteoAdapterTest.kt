package com.weather.infrastructure.adapters.output.openmeteo

import com.github.tomakehurst.wiremock.WireMockServer
import com.github.tomakehurst.wiremock.client.WireMock.*
import com.github.tomakehurst.wiremock.core.WireMockConfiguration.wireMockConfig
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.web.reactive.function.client.WebClient

class OpenMeteoAdapterTest {

    private lateinit var wireMockServer: WireMockServer
    private lateinit var adapter: OpenMeteoAdapter

    @BeforeEach
    fun setUp() {
        wireMockServer = WireMockServer(wireMockConfig().dynamicPort())
        wireMockServer.start()
        adapter = OpenMeteoAdapter(WebClient.builder().build(), "http://localhost:${wireMockServer.port()}")
    }

    @AfterEach
    fun tearDown() {
        wireMockServer.stop()
    }

    @Test
    fun `deve buscar clima da API Open-Meteo`() {
        wireMockServer.stubFor(
            get(urlPathMatching("/v1/forecast"))
                .willReturn(
                    aResponse()
                        .withStatus(200)
                        .withHeader("Content-Type", "application/json")
                        .withBody("""
                            {
                                "current_weather": {
                                    "temperature": 28.5,
                                    "windspeed": 15.2,
                                    "weathercode": 2
                                }
                            }
                        """.trimIndent())
                )
        )

        val weather = adapter.fetchWeather("Brasília", "Brasil", -15.78, -47.93)

        assertEquals("Brasília", weather.city)
        assertEquals("Brasil", weather.country)
        assertEquals(28.5, weather.temperature)
        assertEquals(15.2, weather.windSpeed)
        assertEquals(2, weather.weatherCode)
        assertEquals("Parcialmente nublado", weather.description)
    }

    @Test
    fun `deve mapear weathercode 0 como Ceu limpo`() {
        wireMockServer.stubFor(
            get(urlPathMatching("/v1/forecast"))
                .willReturn(
                    aResponse()
                        .withStatus(200)
                        .withHeader("Content-Type", "application/json")
                        .withBody("""{"current_weather":{"temperature":30.0,"windspeed":5.0,"weathercode":0}}""")
                )
        )
        val weather = adapter.fetchWeather("Brasília", "Brasil", -15.78, -47.93)
        assertEquals("Céu limpo", weather.description)
    }

    @Test
    fun `deve mapear weathercodes de chuva`() {
        assertEquals("Chuva", adapter.mapWeatherCode(61))
        assertEquals("Chuva", adapter.mapWeatherCode(63))
        assertEquals("Chuva", adapter.mapWeatherCode(65))
    }

    @Test
    fun `deve mapear weathercodes de trovoada`() {
        assertEquals("Trovoada", adapter.mapWeatherCode(95))
        assertEquals("Trovoada com granizo", adapter.mapWeatherCode(96))
    }
}
