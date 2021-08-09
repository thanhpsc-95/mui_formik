import { TextField } from '@material-ui/core'
import { useField } from 'formik'
import React from 'react'
const FormikTextField = ({ name, variant = "outlined", ...otherProps }) => {

    const [field, meta] = useField(name);
    const config = {
        ...field,
        ...otherProps,
        size: "small",
        fullWidth: true,
        variant: variant
    }

    if (meta && meta.touched && meta.error) {
        config.error = true;
        config.helperText = meta.error;
    }
    return (
        <TextField {...config} />
    )
}

export default FormikTextField
