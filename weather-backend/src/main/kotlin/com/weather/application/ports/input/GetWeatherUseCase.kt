package com.weather.application.ports.input

import com.weather.domain.model.Weather

interface GetWeatherUseCase {
    fun execute(countryCode: String): Weather
}
