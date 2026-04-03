package com.weather.infrastructure.adapters.output.openmeteo

import com.weather.application.ports.output.WeatherPort
import com.weather.domain.model.Weather
import com.weather.infrastructure.adapters.output.openmeteo.dto.OpenMeteoResponse
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.client.WebClient

@Component
class OpenMeteoAdapter(
    private val webClient: WebClient,
    @Value("\${open-meteo.base-url}") private val baseUrl: String
) : WeatherPort {

    override fun fetchWeather(city: String, country: String, latitude: Double, longitude: Double): Weather {
        val response = webClient.get()
            .uri("$baseUrl/v1/forecast?latitude=$latitude&longitude=$longitude&current_weather=true")
            .retrieve()
            .bodyToMono(OpenMeteoResponse::class.java)
            .block()!!

        return Weather(
            city = city,
            country = country,
            temperature = response.currentWeather.temperature,
            windSpeed = response.currentWeather.windspeed,
            weatherCode = response.currentWeather.weathercode,
            description = mapWeatherCode(response.currentWeather.weathercode)
        )
    }

    fun mapWeatherCode(code: Int): String = when (code) {
        0 -> "Céu limpo"
        1 -> "Principalmente limpo"
        2 -> "Parcialmente nublado"
        3 -> "Nublado"
        45, 48 -> "Neblina"
        51, 53, 55 -> "Garoa"
        61, 63, 65 -> "Chuva"
        71, 73, 75 -> "Neve"
        80, 81, 82 -> "Chuva forte"
        95 -> "Trovoada"
        96, 99 -> "Trovoada com granizo"
        else -> "Desconhecido"
    }
}
