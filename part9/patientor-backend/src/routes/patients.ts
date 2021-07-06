import express from 'express';
const router = express.Router();

import * as patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

router.get('/', (_req, res) => {
  res.send(patientService.getNonSSNPatients());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;