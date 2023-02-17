import { useState, useEffect } from 'react'
//import axios from 'axios'

import personService from './services/persons'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filter, setFilter] = useState('')

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
      alert(`${newName} is already added to phonebook`)
    } else {
        console.log(newName)
        console.log(newNumber)
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
    console.log(destroyPerson)
    if (window.confirm(`Delete ${destroyPerson}?`)){
      console.log('hyväksytään deletointi')
      const destroyPersonId = persons.find(person => person.name === destroyPerson).id
      console.log(destroyPersonId)
      personService.deletePerson(destroyPersonId)
      const phonebook = persons.filter(person => person.id !== destroyPersonId)
      setPersons(phonebook)
    } else {
      console.log('deletointia ei hyväksytty')
    }
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h3>Add new contact</h3>
      <PersonForm newName={newName} newNumber={newNumber} addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
