package com.weather.application.ports.output

import com.weather.domain.model.Country

interface CountryPort {
    fun findAll(): List<Country>
    fun findByCode(code: String): Country?
}
