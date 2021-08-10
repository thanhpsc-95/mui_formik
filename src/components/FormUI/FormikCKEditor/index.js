import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useField, useFormikContext } from 'formik';

const FormikCKEditor = ({ name, ...otherProps }) => {

    const [field, meta] = useField(name);
    const { setFieldValue, setTouched } = useFormikContext()
    const config = {
        ...field,
        ...otherProps,
    }
    if (meta && meta.touched && meta.error) {
        config.error = true;
        config.helperText = meta.error;
    }
    return (
        <CKEditor
            {...config}
            editor={ClassicEditor}
            data={field.value}
            onChange={(_, editor) => {
                const data = editor.getData();
                setFieldValue(name, data)
            }}
            onBlur={() => {
                setTouched({ [name]: true })
            }}

        />
    )
}

export default FormikCKEditor
