import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useField, useFormikContext } from 'formik';
import React from 'react'
import DateFnsUtils from "@date-io/date-fns";
import us from 'date-fns/locale/en-US';
import vi from 'date-fns/locale/vi'
const FormikDateTimePicker = ({
    name,
    format = "dd/MM/yyyy",
    locale = "vi",
    inputVariant = 'outlined',
    ...otherProps
}) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);

    const handleChange = value => {
        setFieldValue(name, value || null)
    }
    const config = {
        ...field,
        ...otherProps,
        size: "small",
        inputVariant,
        disableToolbar: true,
        variant: "inline",
        format,
        fullWidth: true,
        onChange: handleChange,
        InputLabelProps: {
            shrink: true
        }

    }
    if (meta && meta.touched && meta.error) {
        config.error = true;
        config.helperText = meta.error;
    }
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale === "vi" ? vi : us}>
            <KeyboardDatePicker
                {...config}
            />
        </MuiPickersUtilsProvider>
    )
}

export default FormikDateTimePicker
