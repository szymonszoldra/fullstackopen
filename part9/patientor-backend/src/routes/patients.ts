import express from 'express';
const router = express.Router();

import * as patientService from '../services/patientService';

router.get('/', (_req, res) => {
  res.send(patientService.getNonSSNPatients());
});

export default router;