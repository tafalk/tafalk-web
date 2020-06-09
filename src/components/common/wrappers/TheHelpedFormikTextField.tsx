import React from 'react'
import MuiTextField from '@material-ui/core/TextField'
import { fieldToTextField, TextFieldProps } from 'formik-material-ui'

const TheHelpedFormikTextField = (props: TextFieldProps) => (
  <MuiTextField
    {...fieldToTextField({
      ...props,
      helperText: props.helperText ? props.helperText : ' '
    })}
  />
)

export default TheHelpedFormikTextField
