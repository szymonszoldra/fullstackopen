import * as React from 'react';
import { Icon } from 'semantic-ui-react';

import { Entry } from '../types';

export interface EntryIconProps {
  entry: Entry
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discrimiminated union member: ${JSON.stringify(value)}`
  );
};
 
const EntryIcon = ({ entry }: EntryIconProps) => {
  switch(entry.type) {
    case 'Hospital':
      return <Icon name='hospital' />;
    case 'HealthCheck':
      return <Icon name='hospital outline' />;
    case 'OccupationalHealthcare':
      return <Icon name='hospital symbol' />;
    default:
      return assertNever(entry);
  }
};
 
export default EntryIcon;