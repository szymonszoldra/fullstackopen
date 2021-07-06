import * as React from 'react';

export interface ContentProps {
  courseParts: Array<{ name: string, exerciseCount: number}>
}
 
const Content = ({ courseParts }: ContentProps) => {
  return ( 
    <>
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
    </>
   );
}
 
export default Content;