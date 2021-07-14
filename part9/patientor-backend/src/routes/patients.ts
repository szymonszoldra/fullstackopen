import express from 'express';
const router = express.Router();

import * as patientService from '../services/patientService';
import * as utils from '../utils';

router.get('/', (_req, res) => {
  res.send(patientService.getNonSSNPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findPatient(req.params.id);
  
  if (!patient) {
    res.status(404).send({ error: 'not found!'});
  } else {
    res.json(patient);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = utils.toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = utils.toNewDiagnosisEntry(req.body);
    const addedEntry = patientService.addEntry(newEntry, req.params.id);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;