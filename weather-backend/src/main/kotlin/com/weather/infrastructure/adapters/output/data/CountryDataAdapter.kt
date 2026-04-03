package com.weather.infrastructure.adapters.output.data

import com.weather.application.ports.output.CountryPort
import com.weather.domain.model.Country
import org.springframework.stereotype.Component

@Component
class CountryDataAdapter : CountryPort {

    private val countries = listOf(
        Country("BR", "Brasil", "Brasília", -15.7801, -47.9292),
        Country("US", "Estados Unidos", "Washington D.C.", 38.9072, -77.0369),
        Country("AR", "Argentina", "Buenos Aires", -34.6037, -58.3816),
        Country("FR", "França", "Paris", 48.8566, 2.3522),
        Country("DE", "Alemanha", "Berlim", 52.5200, 13.4050),
        Country("GB", "Reino Unido", "Londres", 51.5074, -0.1278),
        Country("JP", "Japão", "Tóquio", 35.6762, 139.6503),
        Country("CN", "China", "Pequim", 39.9042, 116.4074),
        Country("IN", "Índia", "Nova Délhi", 28.6139, 77.2090),
        Country("AU", "Austrália", "Camberra", -35.2809, 149.1300),
        Country("CA", "Canadá", "Ottawa", 45.4215, -75.6972),
        Country("MX", "México", "Cidade do México", 19.4326, -99.1332),
        Country("IT", "Itália", "Roma", 41.9028, 12.4964),
        Country("ES", "Espanha", "Madri", 40.4168, -3.7038),
        Country("PT", "Portugal", "Lisboa", 38.7223, -9.1393),
        Country("RU", "Rússia", "Moscou", 55.7558, 37.6176),
        Country("ZA", "África do Sul", "Pretória", -25.7461, 28.1881),
        Country("NG", "Nigéria", "Abuja", 9.0765, 7.3986),
        Country("EG", "Egito", "Cairo", 30.0444, 31.2357),
        Country("SA", "Arábia Saudita", "Riade", 24.7136, 46.6753),
        Country("TR", "Turquia", "Ancara", 39.9334, 32.8597),
        Country("KR", "Coreia do Sul", "Seul", 37.5665, 126.9780),
        Country("CO", "Colômbia", "Bogotá", 4.7110, -74.0721),
        Country("CL", "Chile", "Santiago", -33.4489, -70.6693),
        Country("PE", "Peru", "Lima", -12.0464, -77.0428),
        Country("UY", "Uruguai", "Montevidéu", -34.9011, -56.1645),
        Country("PY", "Paraguai", "Assunção", -25.2867, -57.6470)
    )

    override fun findAll(): List<Country> = countries.sortedBy { it.name }
    override fun findByCode(code: String): Country? = countries.find { it.code == code }
}
