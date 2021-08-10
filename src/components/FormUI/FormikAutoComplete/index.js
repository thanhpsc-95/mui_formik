import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useField, useFormikContext } from 'formik';
import React from 'react'

const FormikAutocomplete = ({ name, options, variant = "outlined", ...otherProps }) => {

    const { setFieldValue, setTouched } = useFormikContext()
    const [field, meta] = useField(name);

    const handleChangle = (e, newValue) => {
        setFieldValue(name, newValue !== null ? newValue : null)
    }
    const handleBlur = () => {
        setTouched({ [name]: true })
    }
    const config = {
        ...field,
        ...otherProps,
        variant,
        size: "small",
        fullWidth: true,
        onChange: handleChangle,
        onBlur: handleBlur

    }
    if (meta && meta.touched && meta.error) {
        config.error = true;
        config.helperText = meta.error;
    }
    const { value, onChange, onBlur, ...rest } = config;
    return (
        <Autocomplete
            options={options}
            getOptionLabel={option => option.label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            renderInput={(params) => (
                <TextField {...params} {...rest} />
            )}
        />
    )
}

export default FormikAutocomplete
