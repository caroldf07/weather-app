package com.weather.infrastructure.adapters.input.rest

import com.ninjasquad.springmockk.MockkBean
import com.weather.application.ports.input.GetCountriesUseCase
import com.weather.application.ports.input.GetWeatherUseCase
import com.weather.domain.model.Country
import com.weather.domain.model.Weather
import io.mockk.every
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get

@WebMvcTest(WeatherController::class)
@AutoConfigureMockMvc(addFilters = false)
class WeatherControllerTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @MockkBean
    private lateinit var getCountriesUseCase: GetCountriesUseCase

    @MockkBean
    private lateinit var getWeatherUseCase: GetWeatherUseCase

    @Test
    fun `GET api-countries retorna lista de paises`() {
        every { getCountriesUseCase.execute() } returns listOf(
            Country("BR", "Brasil", "Brasília", -15.78, -47.93),
            Country("AR", "Argentina", "Buenos Aires", -34.60, -58.38)
        )

        mockMvc.get("/api/countries")
            .andExpect {
                status { isOk() }
                jsonPath("$[0].code") { value("BR") }
                jsonPath("$[0].name") { value("Brasil") }
                jsonPath("$[0].capital") { value("Brasília") }
                jsonPath("$[1].code") { value("AR") }
            }
    }

    @Test
    fun `GET api-weather-BR retorna clima de Brasilia`() {
        every { getWeatherUseCase.execute("BR") } returns
            Weather("Brasília", "Brasil", 28.5, 15.2, 2, "Parcialmente nublado")

        mockMvc.get("/api/weather/BR")
            .andExpect {
                status { isOk() }
                jsonPath("$.city") { value("Brasília") }
                jsonPath("$.country") { value("Brasil") }
                jsonPath("$.temperature") { value(28.5) }
                jsonPath("$.description") { value("Parcialmente nublado") }
            }
    }

    @Test
    fun `GET api-weather-XX retorna 404 para pais invalido`() {
        every { getWeatherUseCase.execute("XX") } throws IllegalArgumentException("País não encontrado: XX")

        mockMvc.get("/api/weather/XX")
            .andExpect {
                status { isNotFound() }
            }
    }
}
