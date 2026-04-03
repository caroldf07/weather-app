package com.weather.integration

import com.github.tomakehurst.wiremock.WireMockServer
import com.github.tomakehurst.wiremock.client.WireMock.*
import com.github.tomakehurst.wiremock.core.WireMockConfiguration.wireMockConfig
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.TestPropertySource
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(properties = ["open-meteo.base-url=http://localhost:8089"])
class WeatherIntegrationTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    private lateinit var wireMockServer: WireMockServer

    @BeforeEach
    fun setUp() {
        wireMockServer = WireMockServer(wireMockConfig().port(8089))
        wireMockServer.start()
    }

    @AfterEach
    fun tearDown() {
        wireMockServer.stop()
    }

    @Test
    fun `deve retornar lista de paises disponíveis`() {
        mockMvc.get("/api/countries")
            .andExpect {
                status { isOk() }
                jsonPath("$") { isArray() }
                jsonPath("$.length()") { value(27) }
            }
    }

    @Test
    fun `deve retornar clima do Brasil com dados reais da Open-Meteo simulada`() {
        wireMockServer.stubFor(
            get(urlPathMatching("/v1/forecast"))
                .willReturn(
                    aResponse()
                        .withStatus(200)
                        .withHeader("Content-Type", "application/json")
                        .withBody("""{"current_weather":{"temperature":27.3,"windspeed":12.5,"weathercode":1}}""")
                )
        )

        mockMvc.get("/api/weather/BR")
            .andExpect {
                status { isOk() }
                jsonPath("$.city") { value("Brasília") }
                jsonPath("$.country") { value("Brasil") }
                jsonPath("$.temperature") { value(27.3) }
                jsonPath("$.description") { value("Principalmente limpo") }
            }
    }

    @Test
    fun `deve retornar 404 para pais inexistente`() {
        mockMvc.get("/api/weather/ZZ")
            .andExpect {
                status { isNotFound() }
            }
    }
}
