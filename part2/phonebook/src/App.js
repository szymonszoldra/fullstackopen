import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({handler, value}) => <div>filter shown with <input onChange={handler} value={value}/></div>

const Persons = ({ persons }) => {
  return (
    <>
      {persons.map((person) => (
        <p key={person.name}>{person.name} {person.number}</p>
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
    axios.get('http://localhost:3001/persons')
      .then((response) => setPersons(response.data));
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

    setPersons(persons.concat({name : newName, number: newNumber}));
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
      <Persons persons={personsToShow} />
      
    </div>
  )
}

export default App