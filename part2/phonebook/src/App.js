import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const userAlreadyExists = () => {
    const user = persons.filter((person) => person.name === newName);
    return user.length;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userAlreadyExists()) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    
    setPersons(persons.concat({name : newName}));
    setNewName('');
  };

  const handleChange = (event) => {
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleChange} value={newName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  )
}

export default App