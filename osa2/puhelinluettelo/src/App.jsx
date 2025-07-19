import { useState } from 'react'

const Filter = ({ searchItem, handleInputChange }) => {
  return (
    <div>
      filter shown with: <input 
        value={searchItem}
        onChange={handleInputChange}
      />
    </div>
  )
}

const PersonForms = ({ addNumber, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
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
  )
}

const Person = ({ person }) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map(person => <Person key={person.name} person={person} />)}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchItem, setSearchItem] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)
  
  const addNumber = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
    }
    else  {
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

  const handleInputChange = (event) => {
    const value = event.target.value
    setSearchItem(value)
    const filteredUsers = persons.filter((person) =>
      person.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    )
    setFilteredPersons(filteredUsers)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter 
        searchItem={searchItem} 
        handleInputChange={handleInputChange} 
      />
      <h2>Add a new</h2>
      <PersonForms 
        addNumber={addNumber}
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
      />
      <h2>Numbers</h2>
      <Persons 
        persons={filteredPersons} 
      />
    </div>
  )

}

export default App