import React, { useState, useEffect } from 'react';
import noteService from './services/notes';

import { Form } from './components/Form';
import { Filter } from './components/Filter';
import { Persons } from './components/Persons';
import { Notification } from './components/Notification';

const App = () => {
  const [ persons, setPersons ] = useState([]); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterName, setFilterName ] = useState('');
  const [ message, setMessage ] = useState(null);

  useEffect(() => {
    noteService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[]);

  const reloadPersons = () => {
    noteService
      .getAll()
      .then(reloadedPersons => {
        setPersons(reloadedPersons)
      })
  }

  const sendMessage = (content, positive) => {
    setMessage({
      content,
      positive
    })

    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const userAlreadyExists = (user) => user.length;

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = persons.filter((person) => person.name.toLowerCase() === newName.toLowerCase());

    if (userAlreadyExists(user)) {
      if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) return;
      
      const newUser = user[0]; 
      const newUserObject = {...newUser, number: newNumber}; 

      noteService
        .update(newUser.id, newUserObject)
        .then(response => {
          sendMessage(`Updated ${newUser.name}'s number`, true);
          reloadPersons();
          setNewName('');
          setNewNumber('');
        });

      return;
    }

    const newId = persons.reduce((m, person) => m = Math.max(m, person.id), 0) + 1;

    noteService
      .create({name : newName, number: newNumber, id: newId,})
      .then(newPerson => {
        sendMessage(`Added ${newName}`, true);
        setPersons(persons.concat(newPerson));
      })

    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleFilter = (event) => setFilterName(event.target.value);

  const personsToShow = filterName
    ? persons.filter((person) => person.name.toLowerCase().includes(filterName.toLowerCase()))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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