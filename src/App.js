import './App.css';
import { Box, Button, Container, createTheme, CssBaseline, Grid, TextField, Typography } from '@material-ui/core';
import FormikTextField from './components/FormUI/FormikTextField';
import { Form, Formik } from 'formik';
import * as Yup from 'yup'
import FormikSelect from './components/FormUI/FormikSelect';
import FormikDateTimePicker from './components/FormUI/FormikDateTimePicker';
import FormikCheckbox from './components/FormUI/FormikCheckbox';
import Fade from 'react-reveal/Fade';
import * as locales from '@material-ui/core/locale';
import React from 'react';
import { Autocomplete } from '@material-ui/lab';

const INITIAL_FORM_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  arrivalDate: null,
  departureDate: null,
  message: '',
  termOfService: false
}

const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string()
    .required('Required'),
  lastName: Yup.string()
    .required('Required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  phone: Yup.number()
    .integer()
    .typeError("Please enter a valid phone number")
    .nullable(true),
  addressLine1: Yup.string()
    .required('Required'),
  addressLine2: Yup.string()
    .nullable(true),
  city: Yup.string()
    .required('Required'),
  state: Yup.string()
    .required('Required'),
  arrivalDate: Yup.date()
    .typeError("Invalid date format")
    .nullable(),
  departureDate: Yup.date()
    .typeError("Invalid date format")
    .nullable(),
  termOfService: Yup.boolean()
    .oneOf([true], 'The terms and condition must be accepted')
    .required('The terms and condition must be accepted')
})

const STATE = [
  {
    value: 'VN',
    label: 'Viet Nam'
  },
  {
    value: 'US',
    label: 'United State'
  },
]

const CITY = [
  {
    value: 'HN',
    label: 'Hà Nội'
  },
  {
    value: 'HCM',
    label: 'Hồ Chí Minh'
  },
]
const theme = createTheme({
}, locales.viVN);
const App = () => {
  const [locale, setLocale] = React.useState('enUS');
  return (
    <Fade left>
      <CssBaseline />
      <Box my={3}>
        <Container maxWidth="md">
          <Autocomplete
            options={Object.keys(locales)}
            getOptionLabel={(key) => `${key.substring(0, 2)}-${key.substring(2, 4)}`}
            style={{ width: 300 }}
            value={locale}
            disableClearable
            onChange={(event, newValue) => {
              setLocale(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Locale" fullWidth variant="outlined" size="small" />
            )}
          />
          <Formik
            initialValues={INITIAL_FORM_STATE}
            validationSchema={FORM_VALIDATION}
            onSubmit={values => {
              console.log(values)
            }}
          >
            {
              ({ handleSubmit }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography>Your details</Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormikTextField name="firstName" label="First Name" required></FormikTextField>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormikTextField name="lastName" label="Last Name" required></FormikTextField>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormikTextField name="email" label="Email" type="email" required></FormikTextField>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormikTextField name="phone" label="Phone"></FormikTextField>
                    </Grid>

                    <Grid item xs={12}>
                      <Typography>Address</Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormikTextField name="addressLine1" label="Address Line 1" required></FormikTextField>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormikTextField name="addressLine2" label="Address Line 2"></FormikTextField>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormikSelect name="city" label="City" required options={CITY}></FormikSelect>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormikSelect name="state" label="State" required options={STATE}></FormikSelect>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>Booking information</Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormikDateTimePicker name="arrivalDate" label="Arrival Date"></FormikDateTimePicker>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormikDateTimePicker name="departureDate" label="Departure Date"></FormikDateTimePicker>
                    </Grid>
                    <Grid item xs={12}>
                      <FormikTextField name="message" label="Message" multiline={true} rows={4}></FormikTextField>
                    </Grid>
                    <Grid item xs={12}>
                      <FormikCheckbox name="termOfService" label="I agree" legend="Term Of Service" required></FormikCheckbox>
                    </Grid>
                    <Grid item xs={12}>
                      <Button type="submit">Submit</Button>
                    </Grid>
                  </Grid>
                </Form>
              )
            }
          </Formik>
        </Container>
      </Box>
    </Fade>
  );
}

export default App;
