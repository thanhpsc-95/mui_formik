import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel } from '@material-ui/core'
import { useField, useFormikContext } from 'formik';
import React from 'react'
import Fade from 'react-reveal/Fade';

const FormikCheckbox = ({
    name,
    label,
    legend,
    ...otherProps
}) => {
    const [field, meta] = useField(name);
    const { setFieldValue } = useFormikContext();
    const handleChange = evt => {
        const { checked } = evt.target;
        setFieldValue(name, checked)
    }
    const config = {
        ...field,
        ...otherProps,
        onChange: handleChange
    }
    const formControlConfig = {}
    if (meta && meta.touched && meta.error) {
        formControlConfig.error = true;
        formControlConfig.helperText = meta.error;
    }
    return (
        <FormControl error={formControlConfig.error}>
            {legend && <FormLabel component="legend">{legend}</FormLabel>}
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox {...config} />}
                    label={label}
                ></FormControlLabel>
            </FormGroup>
            <Fade bottom collapse when={formControlConfig.error === true}>
                <FormHelperText>{formControlConfig.helperText}</FormHelperText>
            </Fade>
        </FormControl>
    )
}

export default FormikCheckbox
