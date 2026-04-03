import type { Country } from '../../types'

interface CountrySelectorProps {
  countries: Country[]
  selectedCode: string
  onSelect: (code: string) => void
  loading?: boolean
  disabled?: boolean
}

export function CountrySelector({ countries, selectedCode, onSelect, loading, disabled }: CountrySelectorProps) {
  return (
    <div className="country-selector">
      <label htmlFor="country-select">Selecione um país:</label>
      <select
        id="country-select"
        value={selectedCode}
        onChange={e => onSelect(e.target.value)}
        disabled={loading || disabled}
        aria-label="Selecione um país"
      >
        <option value="">-- Escolha um país --</option>
        {countries.map(country => (
          <option key={country.code} value={country.code}>
            {country.name} ({country.capital})
          </option>
        ))}
      </select>
      {loading && <span>Carregando países...</span>}
    </div>
  )
}
