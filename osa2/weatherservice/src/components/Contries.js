import { useEffect, useState } from 'react'
import weatherservice from '../services/weathers'

const CountryInfo = ({ country }) => {
    const [weather, setWeather] = useState({
        temperature: null,
        wind: null,
        icon: null
    })


    useEffect(() => {
        weatherservice
            .getWeather(country.latlng)
            .then(response => {
                setWeather({
                    temperature: response.main.temp,
                    wind: response.wind.speed,
                    icon: weatherservice.getIcon(response.weather[0].icon)
                })
            })
    }, [])

    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>
                capital: {country.capital} <br />
                area: {country.area}
            </div>
            <div>
                <strong>languages:</strong>
                <ul>
                    {Object.entries(country.languages).map(([key, value]) => (
                        <li>{value}</li>
                    ))}
                </ul>
            </div>
            <img src={country.flags.png} alt={country.flags.alt} />
            <div>
                <h2>Weather in {country.capital}</h2>
                temperature {weather.temperature} ℃<br />
                <br />
                wind {weather.wind} m/s
                <br />
                <img src={weather.icon} alt='weather icon' />
            </div>
        </div>
    )
}

const Countries = ({ countries }) => {

    if (countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (countries.length === 1) {
        const country = countries[0]
        return (
            <div>
                <CountryInfo country={country} />
            </div>
        )
    } else {
        return (
            <div>
                {countries.map(country =>
                    <div>{country.name.common}</div>)}
            </div>
        )
    }

}

export default Countries

