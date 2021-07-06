import patients  from '../../data/patients';
import { NonSSNPatient, NewPatientEntry, Patient } from '../types';

import {v1 as uuid} from 'uuid';


export const getNonSSNPatients = (): Array<NonSSNPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export const addPatient = (entry: NewPatientEntry): Patient => {
  const newEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newEntry);
  return newEntry;
};