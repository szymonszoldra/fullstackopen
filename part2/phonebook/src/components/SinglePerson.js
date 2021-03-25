import React from 'react';
import noteService from '../services/notes';

export const SinglePerson = ({person, setPersons, persons}) => {

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