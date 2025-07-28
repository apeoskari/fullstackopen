import Weather from './Weather'

const Country = ({ country }) => {
    return (
    <div>
        <h1>{country.name.common}</h1>
        <p>
            Capital {country.capital}<br></br>
            Area {country.area}
        </p>
        <h2>Languages</h2>
        <ul>
            {Object.entries(country.languages).map(([code, language]) => <li key={code + language}>{language}</li>)}
        </ul>
        <img src={country.flags.png}></img>
        <Weather country={country}/>
    </div>
    )
}

export default Country