import { useState, useEffect } from 'react'

import personService from './services/persons'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAllPersons()
      .then(initialPhonebook => {
        setPersons(initialPhonebook)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personNamesLowerCase = persons.map(person => person.name.toLowerCase())
    if (personNamesLowerCase.includes(newName.toLowerCase())) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const changePersonId = persons.find(person => person.name === newName).id
        const personObject = {
          name: newName,
          number: newNumber,
          id: changePersonId
        }
        personService.changeNumber(personObject)
          .then(returnedPerson => {
            const phonebook = persons.filter(person => person.id !== returnedPerson.id)
            setPersons(phonebook.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            setNotificationMessage(`Changed ${personObject.name}'s number.`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(`Information of ${personObject.name} has already been removed from the server.`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            const phonebook = persons.filter(person => person.id !== personObject.id)
            setPersons(phonebook)
            setNewName('')
            setNewNumber('')
          })

      }

    } else {
        const personObject = {
          name: newName,
          number: newNumber
        }
        personService
          .addNewPerson(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
          })
        setNotificationMessage(`Added ${personObject.name}.`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
    }
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFilterChange = (event) => {
    if (event.target.value === ''){
      setFilter('')
      setShowAll(true)
    } else{
      setFilter(event.target.value)
      setShowAll(false)
    } 
  }

  const deletePerson = (event) => {
    const destroyPerson = event.target.value
    if (window.confirm(`Delete ${destroyPerson}?`)){
      const destroyPersonId = persons.find(person => person.name === destroyPerson).id
      personService.deletePerson(destroyPersonId)
      const phonebook = persons.filter(person => person.id !== destroyPersonId)
      setPersons(phonebook)
      setNotificationMessage(`Deleted ${destroyPerson}.`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const Notification = ({message}) => {
    if (message === null) {
      return null
    }

    return(
      <div className='message'>
        {message}
      </div>
    )
  }

  const Error = ({message}) => {
    if (message === null) {
      return null
    }

    return(
      <div className='error'>
        {message}
      </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h3>Add new contact</h3>
      <PersonForm newName={newName} newNumber={newNumber} addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
