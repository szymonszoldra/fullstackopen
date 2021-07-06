import { NewPatientEntry, Gender } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if ( !name || !isString(name) ) {
    throw new Error('Incorrect or missing name!');
  }

  return name;
};

const parseSSN = (ssn: unknown): string => {
  if ( !ssn || !isString(ssn) ) {
    throw new Error('Incorrect or missing ssn!');
  }

  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if ( !occupation || !isString(occupation) ) {
    throw new Error('Incorrect or missing occupation!');
  }

  return occupation;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if ( !date || !isString(date) || !isDate(date) ) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if ( !gender || !isGender(gender) ) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

type Fields = { name: unknown, ssn: unknown, dateOfBirth: unknown, occupation: unknown, gender: unknown };

const toNewPatientEntry = ({ name, ssn, dateOfBirth, occupation, gender }: Fields): NewPatientEntry => {  
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    ssn: parseSSN(ssn),
    dateOfBirth: parseDate(dateOfBirth),
    occupation: parseOccupation(occupation),
    gender: parseGender(gender)
  };

  return newEntry;
};

export default toNewPatientEntry;