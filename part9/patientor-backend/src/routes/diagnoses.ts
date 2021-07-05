import express from 'express';
const router = express.Router();

import * as diagnoseService from '../services/diagnoseService';

router.get('/', (_req, res) => {
  res.send(diagnoseService.getAllDiagnoses());
});

export default router;