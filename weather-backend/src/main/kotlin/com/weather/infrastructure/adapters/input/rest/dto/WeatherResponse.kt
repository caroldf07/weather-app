package com.weather.infrastructure.adapters.input.rest.dto

data class WeatherResponse(
    val city: String,
    val country: String,
    val temperature: Double,
    val windSpeed: Double,
    val weatherCode: Int,
    val description: String
)
