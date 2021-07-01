interface BMICategory {
  lowBoundary: number,
  topBoundary: number,
  category: string
};

const categories: Array<BMICategory> = [
  {
    lowBoundary: 0,
    topBoundary: 15,
    category: 'Very severely underweight'
  },
  {
    lowBoundary: 15,
    topBoundary: 16,
    category: 'Severely underweight'
  },
  {
    lowBoundary: 16,
    topBoundary: 18.5,
    category: 'Underweight'
  },
  {
    lowBoundary: 18.5,
    topBoundary: 25,
    category: 'Normal (healthy weight)'
  },
  {
    lowBoundary: 25,
    topBoundary: 30,
    category: 'Overweight'
  },
  {
    lowBoundary: 30,
    topBoundary: 35,
    category: 'Obese Class I (Moderately obese)'
  },
  {
    lowBoundary: 35,
    topBoundary: 40,
    category: 'Obese Class II (Severely obese)'
  },
  {
    lowBoundary: 40,
    topBoundary: Number.POSITIVE_INFINITY,
    category: 'Obese Class III (Very severely obese)'
  },
]

const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters: number = height / 100;
  const BMI: number = weight / (heightInMeters*heightInMeters);
  
  let category: string;

  for ( let i = 0; i < categories.length; i++) {
    if (BMI >= categories[i].lowBoundary && BMI <= categories[i].topBoundary) {
      category = categories[i].category;
      break;
    }
  }

  return category;
}

console.log(calculateBmi(180, 74));