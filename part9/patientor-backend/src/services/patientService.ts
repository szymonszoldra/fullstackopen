import patients  from '../../data/patients';
import { NonSSNPatient } from '../types';


export const getNonSSNPatients = (): Array<NonSSNPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};