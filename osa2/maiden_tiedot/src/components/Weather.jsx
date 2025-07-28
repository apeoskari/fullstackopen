import { useState, useEffect } from 'react'
import weatherService from './../services/weather'

const Weather = ({ country }) => {
    const [weatherData, setWeatherData] = useState(null)

    useEffect(() => {
    weatherService
        .getWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
        .then(initialCountries => {
            setWeatherData(initialCountries)
        })
    }, [])

    if (!weatherData) {
        return <div>Loading weather...</div>;
    }
    return (
        <div>
            <h2>Weather in {country.capital}</h2>
            <p>Temperature {weatherData.main.temp} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather Icon" />
            <p>Wind {weatherData.wind.speed} m/s</p>
        </div>
    )
}

export default Weather