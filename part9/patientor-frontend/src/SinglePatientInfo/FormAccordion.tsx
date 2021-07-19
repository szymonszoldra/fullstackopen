import React, { useState} from 'react';
import { Accordion, AccordionTitleProps, Icon } from 'semantic-ui-react';

import { HealthCheckForm, HospitalEntryForm } from './EntryForms';

const FormAccordion = () => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const handleClick = (
    _e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    { index }: AccordionTitleProps
    ): void => {
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(Number(newIndex));
  };
  
  return (
    <Accordion fluid styled>
      <Accordion.Title
        active={activeIndex === 0}
        index={0}
        onClick={handleClick}
      >
        <Icon name='dropdown' />
        Add healthcheck entry
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 0}>
        <HealthCheckForm />
      </Accordion.Content>
      <Accordion.Title
        active={activeIndex === 1}
        index={1}
        onClick={handleClick}
      >
        <Icon name='dropdown' />
        Add hospital entry
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 1}>
        <HospitalEntryForm />
      </Accordion.Content>
      {/* <Accordion.Title
        active={activeIndex === 2}
        index={2}
        onClick={handleClick}
      >
        <Icon name='dropdown' />
        Add occupationalhealthcare entry
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 2}>
      <AddPatientForm onCancel={() => null} onSubmit={() => null}/>
      </Accordion.Content> */}
    </Accordion>
  );
};

export default FormAccordion;