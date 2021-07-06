import * as React from 'react';

export interface TotalProps {
  totalExercises: number
}
 
const Total = ({ totalExercises }: TotalProps) => {
  return ( 
    <p>
      Number of exercises {totalExercises}
    </p>
   );
}
 
export default Total;