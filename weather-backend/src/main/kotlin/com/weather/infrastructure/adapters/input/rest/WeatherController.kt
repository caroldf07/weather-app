package com.weather.infrastructure.adapters.input.rest

import com.weather.application.ports.input.GetCountriesUseCase
import com.weather.application.ports.input.GetWeatherUseCase
import com.weather.infrastructure.adapters.input.rest.dto.CountryResponse
import com.weather.infrastructure.adapters.input.rest.dto.WeatherResponse
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
class WeatherController(
    private val getCountriesUseCase: GetCountriesUseCase,
    private val getWeatherUseCase: GetWeatherUseCase
) {
    @GetMapping("/countries")
    fun getCountries(): ResponseEntity<List<CountryResponse>> {
        val countries = getCountriesUseCase.execute()
        val response = countries.map { CountryResponse(it.code, it.name, it.capital) }
        return ResponseEntity.ok(response)
    }

    @GetMapping("/weather/{countryCode}")
    fun getWeather(@PathVariable countryCode: String): ResponseEntity<WeatherResponse> {
        return try {
            val weather = getWeatherUseCase.execute(countryCode.uppercase())
            ResponseEntity.ok(
                WeatherResponse(
                    city = weather.city,
                    country = weather.country,
                    temperature = weather.temperature,
                    windSpeed = weather.windSpeed,
                    weatherCode = weather.weatherCode,
                    description = weather.description
                )
            )
        } catch (e: IllegalArgumentException) {
            ResponseEntity.notFound().build()
        }
    }
}
