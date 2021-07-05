import diagnoses  from '../../data/diagnoses';

import { Diagnose } from '../types';

export const getAllDiagnoses = (): Array<Diagnose> => {
  return diagnoses;
};
