import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' }
  ]) 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');

  const userAlreadyExists = () => {
    const user = persons.filter((person) => person.name === newName);
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleNameChange} value={newName}/>
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name} {person.number}</p>
      ))}
    </div>
  )
}

export default App