import * as React from 'react';
import axios from 'axios';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { Grid, Button } from 'semantic-ui-react';
import { TextField, SelectField, HealthCheckRatingOption, DiagnosisSelection } from '../AddPatientModal/FormField';

import { apiBaseUrl } from '../constants';
import { EntryWithoutId, HealthCheckRating, Entry } from '../types';

import { useStateValue } from '../state';
import { useParams } from 'react-router-dom';
import { addDiagnosis } from '../state/';

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: 'Healthy'},
  { value: HealthCheckRating.LowRisk, label: 'Low risk'},
  { value: HealthCheckRating.HighRisk, label: 'High risk'},
  { value: HealthCheckRating.CriticalRisk, label: 'Cricital risk'},
];

const HealthCheckForm = () => {
  const [{ diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string}>();

  const handleSubmit = async (values: EntryWithoutId): Promise<void> => {
    try {
      const {data: response} = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, values);
      console.log(response);
      dispatch(addDiagnosis(id, response));
    } catch (e) {
      console.error(e);
    }
  };

  return ( 
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        type: 'HealthCheck',
        healthCheckRating: HealthCheckRating.Healthy,
        diagnosisCodes: []
      }}
      onSubmit={handleSubmit}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => (
        <Form className="form ui">
          <Field 
            label="Description"
            placeholder="Description"
            name="description"
            component={TextField}
          />
          <Field 
            label="Specialist"
            placeholder="Specialist"
            name="specialist"
            component={TextField}
          />
          <Field 
            label="Date"
            placeholder="YYYY-MM-DD"
            name="date"
            component={TextField}
          />
          <SelectField 
            label='Rating'
            name='healthCheckRating'
            options={healthCheckRatingOptions}
          />
          <DiagnosisSelection 
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={diagnoses}
          />
          <ErrorMessage name="date" />
          <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={() => null} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
        </Form>
      )}
    </Formik>
   );
};
 
export default HealthCheckForm;