import React from 'react';
import { CoursePart } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discrimiminated union member: ${JSON.stringify(value)}`
  );
};

interface PartProps {
  coursePart: CoursePart
}

const Part = ({ coursePart }: PartProps) => {
  const showProperAttributes = () => {
    switch (coursePart.type) {
      case 'normal' || 'advanced':
        return <p><i>{coursePart.description}</i></p>;
      case 'groupProject':
        return <p>project exercises: {coursePart.groupProjectCount}</p>;
      case 'submission':
        return (
          <>
            <i>{coursePart.description}</i>
            <p>
              submit to <a href={coursePart.exerciseSubmissionLink}>{coursePart.exerciseSubmissionLink}</a>
            </p>
          </>
        );
      case 'special':
          return (
            <> 
              <i>{coursePart.description}</i>
              <p>required skills: {coursePart.requirements.join(', ')}</p>
            </>
          )
      default:
        return assertNever(coursePart);
    }
  };

  return (
    <div>
      <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
      {showProperAttributes()}
    </div>
  );
};

export default Part;