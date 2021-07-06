import express from 'express';


const router = express.Router();

import * as patientService from '../services/patientService';

router.get('/', (_req, res) => {
  res.send(patientService.getNonSSNPatients());
});

router.post('/', (req, res) => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { name, ssn, dateOfBirth, occupation, gender } = req.body;
  const newPatientEntry = patientService.addPatient({ name, ssn, dateOfBirth, occupation, gender });

  res.json(newPatientEntry);
});

export default router;