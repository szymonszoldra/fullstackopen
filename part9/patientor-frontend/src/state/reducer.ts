import { State } from "./state";
import { Diagnosis, Patient, PatientWithEntries, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  |
    {
      type: 'ADD_PATIENT_INFO';
      payload: PatientWithEntries;
    }
  |
    {
      type: 'SET_DIAGNOSES';
      payload: Diagnosis[]
    }
  |
    {
      type: 'ADD_DIAGNOSIS';
      payload: {
        id: string;
        data: Entry;
      }
    };

export const setPatientList = (payload: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload
  };
};

export const addPatient = (payload: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload
  };
};

export const addPatientInfo = (payload: PatientWithEntries): Action => {
  return {
    type: 'ADD_PATIENT_INFO',
    payload
  };
};

export const setInitDiagnoses = (payload: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSES',
    payload
  };
};

export const addDiagnosis = (id: string, data: Entry): Action => {
  return {
    type: 'ADD_DIAGNOSIS',
    payload : {
      id,
      data
    }
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case 'ADD_PATIENT_INFO':
      return {
        ...state,
        patientsInfo: {
          ...state.patientsInfo,
          [action.payload.id]: action.payload
        }
      };
    case 'SET_DIAGNOSES':
      return {
        ...state,
        diagnoses: action.payload
      };
    case 'ADD_DIAGNOSIS':
      return {
        ...state,
        patientsInfo: {
          ...state.patientsInfo,
          [action.payload.id]: {
            ...state.patientsInfo[action.payload.id],
            entries: state.patientsInfo[action.payload.id].entries.concat(action.payload.data)
          }
        }
      };
    default:
      return state;
  }
};
