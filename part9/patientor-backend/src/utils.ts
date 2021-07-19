import { NewPatientEntry, Gender, EntryWithoutId, HealthCheckRating } from './types';

const assertNever = (type: string): never => {
  throw new Error(`No such type: ${type}`);
};

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

export const toNewPatientEntry = ({ name, ssn, dateOfBirth, occupation, gender }: Fields): NewPatientEntry => {  
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    ssn: parseSSN(ssn),
    dateOfBirth: parseDate(dateOfBirth),
    occupation: parseOccupation(occupation),
    gender: parseGender(gender),
    entries: []
  };

  return newEntry;
};

const parseType = (type: unknown): string => {
  if ( !type || !isString(type) ) {
    throw new Error('Incorrect or missing type!');
  }
  return type;
};

const parseDescription = (description: unknown): string => {
  if ( !description || !isString(description) ) {
    throw new Error('Incorrect or missing description!');
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if ( !specialist || !isString(specialist) ) {
    throw new Error('Incorrect or missing specialist!');
  }
  return specialist;
};

const isArrayOfStrings = (arr: unknown[]): arr is string[] => {
  return arr.every(isString);
};

const parseDiagnosisCodes = (diagnosisCodes: unknown[]): string[] => {
  if (!diagnosisCodes.length || !Array.isArray(diagnosisCodes) || !isArrayOfStrings(diagnosisCodes)) {
    throw new Error('Incorrect or missing diagnosisCodes!');
  }

  diagnosisCodes.forEach(code => {
    if (code.length < 3 || code.length > 6) {
      throw new Error('Incorrect diagnosisCodes!');
    }
  });

  return diagnosisCodes;
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.keys(HealthCheckRating).includes(String(param));
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if ( !rating || !isHealthCheckRating(rating) ) {
    throw new Error('Incorrect or missing rating: ' + rating);
  }
  return rating;
};

type dischargeType = { date: string, criteria: string};

const isDischargeType = (obj: unknown): obj is dischargeType => {
  const keys = Object.keys(Object.assign({}, obj));
  if (keys.length !== 2) {
    return false;
  }
  return keys.includes('date') && keys.includes('criteria');
};

const parseDischarge = (discharge: unknown): dischargeType => {
  if (!isDischargeType(discharge) || !parseDate(discharge.date) || !isString(discharge.criteria)) {
    throw new Error('Incorrect or missing discharge');
  }
  return discharge;
};

const parseEmployerName = (name: unknown): string => {
  if ( !name || !isString(name) ) {
    throw new Error('Incorrect or missing employerName!');
  }
  return name;
};

type sickLeaveType = { startDate: string, endDate: string };

const isSickLeaveType = (obj: unknown): obj is sickLeaveType => {
  const keys = Object.keys(Object.assign({}, obj));
  if (keys.length !== 2) {
    return false;
  }
  return keys.includes('startDate') && keys.includes('endDate');
};

const parseSickLeave = (sickLeave: unknown): sickLeaveType => {
  if (!isSickLeaveType(sickLeave) || !parseDate(sickLeave.startDate) || !parseDate(sickLeave.endDate)) {
    throw new Error('Incorrect or missing sickLeave');
  }
  return sickLeave;
};

type DiagnosisFields = {
  description: unknown,
  date: unknown,
  specialist: unknown,
  diagnosisCodes?: unknown[],
  type: unknown,
  healthCheckRating?: unknown,
  discharge?: unknown,
  employerName?: unknown,
  sickLeave?: unknown
};

export const toNewDiagnosisEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  type,
  healthCheckRating,
  discharge,
  employerName,
  sickLeave
}: DiagnosisFields): EntryWithoutId => {

  const entryType = parseType(type); 

  let baseEntry = {
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
  };

  if (diagnosisCodes) {
    baseEntry = Object.assign(baseEntry, {
      diagnosisCodes: parseDiagnosisCodes(diagnosisCodes)
    });
  }

  switch(entryType) {
    case 'HealthCheck':
      return {
        ...baseEntry,
        healthCheckRating: parseHealthCheckRating(healthCheckRating),
        type: 'HealthCheck'
      };
    case 'Hospital':
      return {
        ...baseEntry,
        discharge: parseDischarge(discharge),
        type: 'Hospital'
      };
    case 'OccupationalHealthcare':
      if (!sickLeave) {
        return {
          ...baseEntry,
          employerName: parseEmployerName(employerName),
          type: 'OccupationalHealthcare'
        };
      } else {
        return {
          ...baseEntry,
          employerName: parseEmployerName(employerName),
          sickLeave: parseSickLeave(sickLeave),
          type: 'OccupationalHealthcare'
        };
      }
    default:
      return assertNever(entryType);
  }
};