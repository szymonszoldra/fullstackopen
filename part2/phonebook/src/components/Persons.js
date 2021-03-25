import React from 'react';

import { SinglePerson } from './SinglePerson';

export const Persons = ({ persons, setPersons }) => {
  return (
    <>
      {persons.map((person) => (
        <SinglePerson setPersons={setPersons} key={person.id} person={person} persons={persons}/>
      ))}
    </>
  )
}