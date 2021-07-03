// https://medium.com/@muravitskiy.mail/cannot-redeclare-block-scoped-variable-varname-how-to-fix-b1c3d9cc8206
// parseArguments in other file causes that error
export {};

interface Result  {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
};

const getAverage = (arr: ReadonlyArray<number>): number => {
  return arr.reduce((acc, curr) => acc + curr , 0) / arr.length;
};

const getTrainingDays = (arr: ReadonlyArray<number>): number => {
  return arr.filter(hours => hours).length
};

const getRating = (avg: number, averageTarget: number): number => {
  let rating: number;
  if (avg >= averageTarget) {
    rating = 3;
  } else if (avg >= 0.9 * averageTarget) {
    rating = 2;
  } else if (avg >= 0.5 * averageTarget) {
    rating = 1;
  } else {
    rating = 0;
  }
  return rating;
};

const getRatingDescription = (rating: number): string => {
  const descriptions = ['NOT EVEN HALF', 'Try more next time', 'Not too bad but could be better', 'Target completed!'];
  return descriptions[rating];
};

interface ParsedArgs {
  target: number,
  days: Array<number>
};

const parseArguments = (args: Array<string>): ParsedArgs => {
  if ( args.length < 4 ) {
    throw new Error('Not enough arguments');
  }

  args.shift();
  args.shift();

  const parsedArgs = args.map(Number);

  if ( parsedArgs.filter(isNaN).length ) { 
    throw new Error('At least 1 argument wasn\'t a number!');
  }

  const [target, ...days] = parsedArgs;

  return {
    target, days
  };
};

const exerciseCalculator = (trainingArray: ReadonlyArray<number>, averageTarget: number): Result => {
  const avg: number = getAverage(trainingArray);
  let rating: number = getRating(avg, averageTarget);
  let ratingDescription: string = getRatingDescription(rating);

  return {
    periodLength: trainingArray.length,
    trainingDays: getTrainingDays(trainingArray),
    success: avg > averageTarget,
    rating: rating,
    ratingDescription: ratingDescription,
    target: averageTarget,
    average: avg
  };
};

try {
  const { target, days } = parseArguments(process.argv);
  console.log(console.log(exerciseCalculator(days, target)));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}