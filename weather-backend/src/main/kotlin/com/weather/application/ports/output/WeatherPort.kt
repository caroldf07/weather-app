package com.weather.application.ports.output

import com.weather.domain.model.Weather

interface WeatherPort {
    fun fetchWeather(city: String, country: String, latitude: Double, longitude: Double): Weather
}
