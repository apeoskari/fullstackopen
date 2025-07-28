import Country from './Country'
import { useState, useEffect } from 'react'

const Listing = ({ list }) => {
    const [selectedCountry, setSelectedCountry] = useState(null)

    // Reset selectedCountry when the list changes (i.e., new search)
    useEffect(() => {
        setSelectedCountry(null)
    }, [list])

    if (selectedCountry) {
        return <Country country={selectedCountry} />
    }
    if (list.length === 0) {
        return (
            <p>No search words used</p>
    )}
    if (list.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>    
    )}
    if (list.length === 1) {
        return <Country country={list[0]}/>
    }
    if (list.length <= 10) {
        return (
            <>
                {list.map(country => (
                    <span key={country.cca3}>
                        {country.name.common} <button onClick={() => setSelectedCountry(country)}>Show</button><br />
                    </span>
                ))}
            </>
        )
    }
}

export default Listing