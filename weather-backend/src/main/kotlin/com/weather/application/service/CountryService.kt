package com.weather.application.service

import com.weather.application.ports.input.GetCountriesUseCase
import com.weather.application.ports.output.CountryPort
import com.weather.domain.model.Country
import org.springframework.stereotype.Service

@Service
class CountryService(private val countryPort: CountryPort) : GetCountriesUseCase {
    override fun execute(): List<Country> = countryPort.findAll()
}
