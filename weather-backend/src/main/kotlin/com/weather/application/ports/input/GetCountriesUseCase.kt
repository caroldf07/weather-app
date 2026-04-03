package com.weather.application.ports.input

import com.weather.domain.model.Country

interface GetCountriesUseCase {
    fun execute(): List<Country>
}
