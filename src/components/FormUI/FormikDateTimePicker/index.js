import {
  KeyboardDatePicker,
  KeyboardDateTimePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import { useField, useFormikContext } from "formik";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import us from "date-fns/locale/en-US";
import vi from "date-fns/locale/vi";
const FormikDateTimePicker = ({
  name,
  format = "dd/MM/yyyy",
  type = "date",
  locale = "vi",
  inputVariant = "outlined",
  ...otherProps
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (value) => {
    setFieldValue(name, value || null);
  };
  const config = {
    ...field,
    ...otherProps,
    size: "small",
    inputVariant,
    variant: "inline",
    fullWidth: true,
    format,
    placeholder: format,
    onChange: handleChange,
    InputLabelProps: {
      shrink: true,
    },
  };
  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }

  const renderPicker = () => {
    switch (type) {
      case "time": {
        return <KeyboardTimePicker {...config} />;
      }

      case "full": {
        return <KeyboardDateTimePicker {...config} />;
      }

      default:
        return <KeyboardDatePicker {...config} />;
    }
  };
  return (
    <MuiPickersUtilsProvider
      utils={DateFnsUtils}
      locale={locale === "vi" ? vi : us}
    >
      {renderPicker()}
    </MuiPickersUtilsProvider>
  );
};
export default FormikDateTimePicker;
