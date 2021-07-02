interface Result  {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
};


const getAverage = (arr: readonly number[]): number => {
  return arr.reduce((acc, curr) => acc + curr , 0) / arr.length;
};

const getSum = (arr: readonly number[]): number => {
  return arr.reduce((acc, curr) => acc + curr , 0);
};

const getTrainingDays = (arr: readonly number[]): number => {
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
  const descriptions = ['NOT EVEN HALF', 'Try more next time', 'Not too bad but could be better',  'Target completed!'];
  return descriptions[rating];
};

const exerciseCalculator = (trainingArray: readonly number[],  averageTarget: number): Result => {
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

console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2));