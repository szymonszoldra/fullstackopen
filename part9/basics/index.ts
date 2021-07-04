import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res): void => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if (!isNaN(weight) && !isNaN(height)) {
    const bmi = calculateBmi(height, weight);
    res.json({ weight, height, bmi});
  } else {
    res.json({ error: 'malformatted parameters'});
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, dailyExercises } = req.body;

  // undefined cuz !target doesn't work while target is 0
  if ( target === undefined || !dailyExercises ) {
    return res.json({ error: 'parameters missing' });
  }

  if ( !Array.isArray(dailyExercises) || !dailyExercises.length || isNaN(target) ) {
    return res.json({ error: 'malformatted parameters' });
  }

  const parsedArgs: Array<number> = dailyExercises.map(Number);

  if ( parsedArgs.filter(isNaN).length ) { 
    return res.json({ error: 'malformatted parameters' });
  }

  return res.json(exerciseCalculator(dailyExercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});