import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useStateValue, addPatientInfo } from '../state';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { PatientWithEntries, Diagnosis } from "../types";

import { Icon, SemanticICONS } from 'semantic-ui-react';
import EntryIcon from '../components/EntryIcon';

const SinglePatientInfo = () => {
  const [message, setMessage] = useState<string>('loading...');
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);
  const { id } = useParams<{ id: string }>();
  const [{ patientsInfo }, dispatch] = useStateValue();

  const getDiagnosisDescription = (code: string): string | undefined => {
    return diagnoses?.find(diagnosis => diagnosis.code === code)?.name;
  };

  useEffect(() => {
    if (id in patientsInfo) {
      return;
    }

    void (async (): Promise<void> => {
      try {
        const { data: patientInfo } = await axios.get<PatientWithEntries>(`${apiBaseUrl}/patients/${id}`);
        dispatch(addPatientInfo(patientInfo));
        const response = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
        setDiagnoses(response.data);
      } catch(e) {
        setMessage('No such patient in database');
      }
    })();
  }, []);

  if (!(id in patientsInfo)) {
    return <div>{message}</div>;
  }

  const { name, gender, ssn, occupation, entries } = patientsInfo[id];
  
  const icons = { 
    male: 'mars' as SemanticICONS,
    female: 'venus' as SemanticICONS,
    other: 'transgender' as SemanticICONS
  };
  return ( 
    <div>
      <h3>{name} <Icon name={icons[gender]} /></h3>
      <p>ssn: {ssn}</p>
      <p>occupation: {occupation}</p>
      <h4>entries</h4>
      {entries?.map(entry => (
        <div key={entry.id}>
          <h5>{entry.date} {entry.description} <EntryIcon entry={entry} /></h5>
          <ul>
            {entry.diagnosisCodes?.map((code) => <li key={code}>{code} {getDiagnosisDescription(code)}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
};
 
export default SinglePatientInfo;