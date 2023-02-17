const Persons = ({personsToShow, deletePerson}) => {

    return(      
      <div>
        {personsToShow.map(person => 
          <div key={person.name}>{person.name} {person.number} <button onClick={deletePerson} value={person.name}>delete</button></div>
        )}
      </div>)
}

export default Persons
