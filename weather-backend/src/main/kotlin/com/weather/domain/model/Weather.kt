package com.weather.domain.model

data class Weather(
    val city: String,
    val country: String,
    val temperature: Double,
    val windSpeed: Double,
    val weatherCode: Int,
    val description: String
)
