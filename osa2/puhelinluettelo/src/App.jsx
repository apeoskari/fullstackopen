import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [showAll, setShowAll] = useState(true)
  
  const addNumber = (event) => {
    event.preventDefault()
    console.log("list", persons)

    if (persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
    }
    else  {
      console.log("list", persons)
      const nameObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(nameObject))
    }
    
    setNewName("")
    setNewNumber("")
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name === true)

  return (
    <div>
      <h1>Phonebook</h1>
      <form>
        <div>
          filter shown with: <input 
          value={newSearch}
          onChange={handleSearchChange}
          />
        </div>
      </form>
      <h2>Add a new</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )

}

export default App