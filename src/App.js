import "./App.css";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@material-ui/core";
import FormikTextField from "./components/FormUI/FormikTextField";
import { Formik } from "formik";
import * as Yup from "yup";
import FormikSelect from "./components/FormUI/FormikSelect";
import FormikDateTimePicker from "./components/FormUI/FormikDateTimePicker";
import FormikCheckbox from "./components/FormUI/FormikCheckbox";
import Fade from "react-reveal/Fade";
import React from "react";
import FormikAutocomplete from "./components/FormUI/FormikAutoComplete";
import FormikCKEditor from "./components/FormUI/FormikCKEditor";

const INITIAL_FORM_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  username: "",
  password: "",
  confirmPassword: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  arrivalDate: null,
  departureDate: null,
  message: "",
  termOfService: false,
  autocomplete: null,
  editor1: "<p>Initial text</p>",
};

const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  username: Yup.string()
    .matches(/^\S*$/, "No spacing")
    .matches(
      /(?=.*[a-z])/,
      "Must contain at least 1 lowercase alphabetical character"
    )
    .matches(
      /(?=.*[A-Z])/,
      "Must contain at least 1 uppercase alphabetical character"
    )
    .matches(/(?=.*[0-9])/, "Must contain at least 1 numeric character")
    .matches(/(?=.*[!@#$%^&*])/, "Must contain at least one special character")
    .matches(/(^.{4,16}$)/, "Must from 4 characters to 16 character")
    .required("Required"),
  password: Yup.string()
    .matches(/^\S*$/, "No spacing")
    .matches(
      /(?=.*[a-z])/,
      "Must contain at least 1 lowercase alphabetical character"
    )
    .matches(
      /(?=.*[A-Z])/,
      "Must contain at least 1 uppercase alphabetical character"
    )
    .matches(/(?=.*[0-9])/, "Must contain at least 1 numeric character")
    .matches(/(?=.*[!@#$%^&*])/, "Must contain at least one special character")
    .matches(/(^.{4,16}$)/, "Must from 4 characters to 16 character")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "Confirm passwords must match the password"
    )
    .required("Required"),
  phone: Yup.number()
    .integer()
    .typeError("Please enter a valid phone number")
    .nullable(true),
  addressLine1: Yup.string().required("Required"),
  addressLine2: Yup.string().nullable(true),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  arrivalDate: Yup.date().typeError("Invalid date format").nullable(),
  departureDate: Yup.date().typeError("Invalid date format").nullable(),
  termOfService: Yup.boolean()
    .oneOf([true], "The terms and condition must be accepted")
    .required("The terms and condition must be accepted"),
  autocomplete: Yup.object().nullable().required("Required"),
});

const STATE = [
  {
    value: "VN",
    label: "Viet Nam",
  },
  {
    value: "US",
    label: "United State",
  },
];

const CITY = [
  {
    value: "HN",
    label: "Hà Nội",
  },
  {
    value: "HCM",
    label: "Hồ Chí Minh",
  },
];

export const cities = [
  {
    state: "Illinois",
    name: "Chicago",
    id: 3,
  },
  {
    state: "Texas",
    name: "Houston",
    id: 2,
  },
  {
    state: "California",
    name: "Los Angeles",
    id: 1,
  },
  {
    state: "New York",
    name: "New York City",
    id: 4,
  },
];
const App = () => {
  const mappedCities =
    (cities &&
      cities.map((city) => ({
        value: city.id,
        label: `${city.name} - ${city.state}`,
      }))) ||
    [];
  return (
    <Fade left>
      <CssBaseline />
      <Box my={3}>
        <Container maxWidth="md">
          <Formik
            initialValues={INITIAL_FORM_STATE}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ handleSubmit, touched, isValid }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2} justifyContent="flex-start">
                  <Grid item xs={12}>
                    <Typography>Your details</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <FormikTextField
                      name="firstName"
                      label="First Name"
                      required
                    ></FormikTextField>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <FormikTextField
                      name="lastName"
                      label="Last Name"
                      required
                    ></FormikTextField>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <FormikTextField
                      name="email"
                      label="Email"
                      type="email"
                      required
                    ></FormikTextField>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <FormikTextField
                      name="phone"
                      label="Phone"
                    ></FormikTextField>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <FormikTextField
                      name="username"
                      label="Username"
                      required
                    ></FormikTextField>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <FormikTextField
                      name="password"
                      label="Password"
                      type="password"
                      required
                    ></FormikTextField>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <FormikTextField
                      name="confirmPassword"
                      label="Confirm password"
                      type="password"
                      required
                    ></FormikTextField>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography>Address</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <FormikTextField
                      name="addressLine1"
                      label="Address Line 1"
                      required
                    ></FormikTextField>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <FormikTextField
                      name="addressLine2"
                      label="Address Line 2"
                    ></FormikTextField>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <FormikSelect
                      name="city"
                      label="City"
                      required
                      options={CITY}
                    ></FormikSelect>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <FormikSelect
                      name="state"
                      label="State"
                      required
                      options={STATE}
                    ></FormikSelect>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Booking information</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <FormikDateTimePicker
                      name="arrivalDate"
                      label="Arrival Date"
                    ></FormikDateTimePicker>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <FormikDateTimePicker
                      name="departureDate"
                      label="Departure Date"
                      type="full"
                      format="dd/MM/yyy HH:mm:ss"
                    ></FormikDateTimePicker>
                  </Grid>
                  <Grid item xs={12}>
                    <FormikTextField
                      name="message"
                      label="Message"
                      multiline={true}
                      rows={4}
                    ></FormikTextField>
                  </Grid>
                  <Grid item xs={12}>
                    <FormikCheckbox
                      name="termOfService"
                      label="I agree"
                      legend="Term Of Service"
                      required
                    ></FormikCheckbox>
                  </Grid>
                  <Grid item xs={12}>
                    <FormikAutocomplete
                      name="autocomplete"
                      label="Test"
                      options={mappedCities}
                      required
                    ></FormikAutocomplete>
                  </Grid>
                  <Grid item xs={12}>
                    <FormikCKEditor name="editor1"></FormikCKEditor>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={
                        !isValid ||
                        (Object.keys(touched).length === 0 &&
                          touched.constructor === Object)
                      }
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Fade>
  );
};

export default App;
