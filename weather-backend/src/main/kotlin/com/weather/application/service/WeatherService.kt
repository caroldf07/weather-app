package com.weather.application.service

import com.weather.application.ports.input.GetWeatherUseCase
import com.weather.application.ports.output.CountryPort
import com.weather.application.ports.output.WeatherPort
import com.weather.domain.model.Weather
import org.springframework.stereotype.Service

@Service
class WeatherService(
    private val countryPort: CountryPort,
    private val weatherPort: WeatherPort
) : GetWeatherUseCase {
    override fun execute(countryCode: String): Weather {
        val normalizedCode = countryCode.uppercase()
        val country = countryPort.findByCode(normalizedCode)
            ?: throw IllegalArgumentException("País não encontrado: $normalizedCode")
        return weatherPort.fetchWeather(country.capital, country.name, country.latitude, country.longitude)
    }
}
