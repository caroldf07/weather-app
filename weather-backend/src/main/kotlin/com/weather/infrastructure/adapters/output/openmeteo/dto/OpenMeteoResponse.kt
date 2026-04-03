package com.weather.infrastructure.adapters.output.openmeteo.dto

import com.fasterxml.jackson.annotation.JsonProperty

data class OpenMeteoResponse(
    @JsonProperty("current_weather")
    val currentWeather: CurrentWeather
) {
    data class CurrentWeather(
        val temperature: Double,
        val windspeed: Double,
        val weathercode: Int
    )
}
