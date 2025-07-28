import { useState, useEffect } from 'react'
import Search from './components/Search'
import Listing from './components/Listing'
import countryService from './services/countries'

function App() {
  const [countries, setCountries] = useState([]) 
  const [searchItem, setSearchItem] = useState("")
  const [filteredCountries, setFilteredCountries] = useState([])
  
  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const handleInputChange = (event) => {
    const value = event.target.value
    setSearchItem(value)
    if (value.trim() === "") {
      setFilteredCountries([])
    } else {
      const filteredCountries = countries.filter((country) =>
        country.name.common.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      )
      setFilteredCountries(filteredCountries)
    }
  }

  return (
    <div>
      <Search 
        searchItem={searchItem}
        handleInputChange={handleInputChange}
      />
      <Listing 
        list={filteredCountries}
      />
    </div>
  )
}

export default App
