import patients  from '../../data/patients';
import { NonSSNPatient, NewPatientEntry, Patient, EntryWithoutId, Entry } from '../types';

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

export const findPatient = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

export const addEntry = (entry: EntryWithoutId, patientId: string): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry
  };

  const patient = findPatient(patientId);
  patient?.entries.push(newEntry);
  return newEntry;
};