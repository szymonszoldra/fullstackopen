import * as React from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Field, Formik, Form, FormikHelpers } from 'formik';
import { Grid, Button } from 'semantic-ui-react';
import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';

import { apiBaseUrl } from '../constants';
import { EntryWithoutId, Entry } from '../types';

import { useStateValue } from '../state';
import { useParams } from 'react-router-dom';
import { addDiagnosis } from '../state/';
 
const HospitalEntryForm = () => {
  const [{ diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string}>();

  const handleSubmit = async (values: EntryWithoutId, { resetForm }: FormikHelpers<EntryWithoutId>): Promise<void> => {
    try {
      const {data: response} = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, values);
      dispatch(addDiagnosis(id, response));
      resetForm();
    } catch (e) {
      console.error(e);
    }
  };

  const validate = Yup.object({
    description: Yup.string().required('Description is required'),
    date: Yup.date().required('Date is required'),
    specialist: Yup.string().required('Specialist\'s name is required'),
    discharge: Yup.object({
      date: Yup.date().required('Discharge date is required'),
      criteria: Yup.string().required('Discharge criteria is required'),
    })
  });

  return ( 
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        type: 'Hospital',
        diagnosisCodes: [],
        discharge: {
          date: '',
          criteria: ''
        }
      }}
      onSubmit={handleSubmit}
      validationSchema={validate}
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
          <DiagnosisSelection 
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={diagnoses}
          />
          <Field 
            label="Discharge date"
            placeholder="YYYY-MM-DD"
            name="discharge.date"
            component={TextField}
          />
          <Field 
            label="Discharge criteria"
            placeholder="Criteria"
            name="discharge.criteria"
            component={TextField}
          />
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
 
export default HospitalEntryForm;