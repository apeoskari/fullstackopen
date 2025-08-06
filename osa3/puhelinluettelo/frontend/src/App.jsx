import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForms from './components/Forms'
import Notification from './components/Notification'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchItem, setSearchItem] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('add')

  useEffect(() => {
    console.log('render')
    setFilteredPersons(persons)
  }, [persons])

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')
  
  const addNumber = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = {...existingPerson, number: newNumber}
        personService
          .update(existingPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
          })
          .then(
            setNotificationType("change"),
            setErrorMessage(`The number of ${newName} was updated`),
            setTimeout(() => {setErrorMessage(null)}, 5000)
          )
          .catch(error => {
            setNotificationType("delete"),
            setErrorMessage(`Information of ${newName} has already been removed from server`),
            setTimeout(() => {setErrorMessage(null)}, 5000)
          })
      }
    }
    else  {
      const nameObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
      })
      setNotificationType("add")
      setErrorMessage(`Person ${newName} was added to the phonebook`)
      setTimeout(() => {setErrorMessage(null)}, 5000)
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

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePers(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
    setNotificationType('delete')
    setErrorMessage(`Person ${name} was deleted from the phonebook`)
    setTimeout(() => {setErrorMessage(null)}, 5000)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} state={notificationType} />
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
        handleDelete={handleDelete}
      />
    </div>
  )

}

export default App