import { useState, useEffect } from 'react'

import personService from './services/persons'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import './index.css'


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

  const updatePerson = () => {
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
      const changePerson = persons.find(person => person.name === newName)
      const personObject = {
        ...changePerson,
        number: newNumber
      }
      personService.changeNumber(personObject)
        .then(returnedPerson => {
          const phonebook = persons.map(person => person.id !== personObject.id ? person : returnedPerson)
          setPersons(phonebook)
          setNotificationMessage(`Changed ${personObject.name}'s number.`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch((error) => {
          console.log(error)
          if (error.response.data.error.includes("Validation")) {
            setErrorMessage(error.response.data.error)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          } else {
            const phonebook = persons.filter(person => person.id !== personObject.id)
            console.log(phonebook)
            setPersons(phonebook)
            setErrorMessage(`Information of ${personObject.name} has already been removed from the server.`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          }

        })
      setNewName('')
      setNewNumber('')

    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personNamesLowerCase = persons.map(person => person.name.toLowerCase())
    if (personNamesLowerCase.includes(newName.toLowerCase())) {
      updatePerson()
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }
    personService
      .addNewPerson(personObject)
      .then(returnedPerson => {
        console.log('successful')
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotificationMessage(`Added ${returnedPerson.name}.`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log(error.response.data.error)
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const deletePerson = (event) => {
    const destroy = event.target.value
    if (window.confirm(`Delete ${destroy}?`)){
      const destroyPerson = persons.find(person => person.name === destroy)
      personService
        .deletePerson(destroyPerson.id)
        .then(() => {
          const phonebook = persons.filter(person => person.id !== destroyPerson.id)
          setPersons(phonebook)
          setNotificationMessage(`Deleted ${destroyPerson.name}.`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error)
        })

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

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))


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
