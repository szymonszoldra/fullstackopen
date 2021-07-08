import * as React from 'react';

import Part from './Part';
import { CoursePart } from '../types';

export interface ContentProps {
  courseParts: CoursePart[]
}
 
const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map(part => (
        <Part key={part.name} coursePart={part} />
      ))}
    </div>
  );
}
 
export default Content;