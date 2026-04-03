export interface Country {
  code: string
  name: string
  capital: string
}

export interface Weather {
  city: string
  country: string
  temperature: number
  windSpeed: number
  weatherCode: number
  description: string
}
