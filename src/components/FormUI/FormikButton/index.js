import { Button } from '@material-ui/core'
import { useFormikContext } from 'formik'
import React from 'react'

const FormikButton = ({
    children = null,
    variant = "contained",
    ...otherProps
}) => {
    const { submitForm } = useFormikContext();
    const handleSubmit = () => {
        submitForm()
    }
    const config = {
        ...otherProps,
        autoComplete: "new-password",
        size: "small",
        fullWidth: true,
        variant,
        onClick: handleSubmit
    }
    return (
        <Button {...config}>
            {children}
        </Button>
    )
}

export default FormikButton
