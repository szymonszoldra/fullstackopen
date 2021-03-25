import React, { useState, useEffect } from 'react';
import noteService from './services/notes';

const Filter = ({handler, value}) => <div>filter shown with <input onChange={handler} value={value}/></div>

const SinglePerson = ({person, setPersons, persons}) => {

  const handleDelete = () => {
    if(!window.confirm(`Delete ${person.name}?`)) return;

    noteService
      .deletePerson(person.id)
      .then(() => {
        const arrayWithoutDeletedPerson = persons.filter((p) => p.id !== person.id);
        setPersons(arrayWithoutDeletedPerson);
      });
  }

  return <p key={person.name}>{person.name} {person.number} <button onClick={handleDelete}>delete</button></p>
}

const Persons = ({ persons, setPersons }) => {
  return (
    <>
      {persons.map((person) => (
        <SinglePerson setPersons={setPersons} key={person.id} person={person} persons={persons}/>
      ))}
    </>
  )
}

const Form = ({formHandler, nameHandler, nameValue, numberHandler, numberValue}) => (
  <form onSubmit={formHandler}>
    <div>
      name: <input onChange={nameHandler} value={nameValue}/>
    </div>
    <div>
      number: <input onChange={numberHandler} value={numberValue}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const App = () => {
  const [ persons, setPersons ] = useState([]); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterName, setFilterName ] = useState('');

  useEffect(() => {
    noteService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[]);


  const userAlreadyExists = () => {
    const user = persons.filter((person) => person.name.toLowerCase() === newName.toLowerCase());
    return user.length;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userAlreadyExists()) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newId = persons.reduce((m, person) => m = Math.max(m, person.id), 0) + 1;

    noteService
      .create({name : newName, number: newNumber, id: newId,})
      .then(newPerson => setPersons(persons.concat(newPerson)))

    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilter = (event) => {
    setFilterName(event.target.value);
  }

  const personsToShow = filterName
    ? persons.filter((person) => person.name.toLowerCase().includes(filterName.toLowerCase()))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handler={handleFilter} value={filterName}/>
      
      <h2>Add a new</h2>

      <Form 
        formHandler={handleSubmit}
        nameHandler={handleNameChange}
        nameValue={newName}
        numberHandler={handleNumberChange}
        numberValue={newNumber}
      />

      <h2>Numbers</h2>
      <Persons setPersons={setPersons} persons={personsToShow} />
      
    </div>
  )
}

export default App