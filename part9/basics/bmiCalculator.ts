interface BMICategory {
  lowBoundary: number,
  topBoundary: number,
  description: string
};

const categories: ReadonlyArray<BMICategory> = [
  {
    lowBoundary: 0,
    topBoundary: 15,
    description: 'Very severely underweight'
  },
  {
    lowBoundary: 15,
    topBoundary: 16,
    description: 'Severely underweight'
  },
  {
    lowBoundary: 16,
    topBoundary: 18.5,
    description: 'Underweight'
  },
  {
    lowBoundary: 18.5,
    topBoundary: 25,
    description: 'Normal (healthy weight)'
  },
  {
    lowBoundary: 25,
    topBoundary: 30,
    description: 'Overweight'
  },
  {
    lowBoundary: 30,
    topBoundary: 35,
    description: 'Obese Class I (Moderately obese)'
  },
  {
    lowBoundary: 35,
    topBoundary: 40,
    description: 'Obese Class II (Severely obese)'
  },
  {
    lowBoundary: 40,
    topBoundary: Number.POSITIVE_INFINITY,
    description: 'Obese Class III (Very severely obese)'
  },
];

interface ParsedArgs {
  height: number,
  weight: number
};

const parseArguments = (args: ReadonlyArray<string>): ParsedArgs => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters: number = height / 100;
  const BMI: number = weight / (heightInMeters*heightInMeters);
  
  for ( let i = 0; i < categories.length; i++) {
    if (BMI >= categories[i].lowBoundary && BMI <= categories[i].topBoundary) {
      return categories[i].description;
    }
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}
