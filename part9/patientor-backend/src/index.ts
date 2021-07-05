import express from 'express';
import cors from 'cors';

import diagnoses from './routes/diagnoses';
import patients from './routes/patients';

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

app.use('/api/diagnoses', diagnoses);
app.use('/api/patients', patients);

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});