import { MenuItem, TextField } from '@material-ui/core'
import { useField, useFormikContext } from 'formik'
import React from 'react'

const FormikSelect = ({
    name,
    options,
    variant = "outlined",
    noOptionsText = "No options",
    ...otherProps
}) => {
    const [field, meta] = useField(name);
    const { setFieldValue } = useFormikContext();
    const handleChange = (evt) => {
        const { value } = evt.target;
        setFieldValue(name, value)
    }
    const config = {
        ...field,
        ...otherProps,
        select: true,
        variant,
        size: "small",
        fullWidth: true,
        onChange: handleChange
    }
    if (meta && meta.touched && meta.error) {
        config.error = true;
        config.helperText = meta.error;
    }
    return (
        <TextField {...config}>
            <MenuItem key={-1} value=""><em>{noOptionsText}</em></MenuItem>
            {options && options.map((item, pos) => {
                const { value, label } = item;
                return (
                    <MenuItem key={pos} value={value}>
                        {label}
                    </MenuItem>
                )
            })}
        </TextField>
    )
}

export default FormikSelect
