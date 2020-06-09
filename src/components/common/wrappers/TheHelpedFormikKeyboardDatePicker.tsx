import React from 'react'
import { KeyboardDatePicker as MuiKeyboardDatePicker } from '@material-ui/pickers'

import { fieldToDatePicker, DatePickerProps } from 'formik-material-ui-pickers'

const TheHelpedFormikKeyboardDatePicker = (props: DatePickerProps) => (
  <MuiKeyboardDatePicker
    {...fieldToDatePicker({
      ...props,
      helperText: props.helperText ? props.helperText : ' '
    })}
  />
)

export default TheHelpedFormikKeyboardDatePicker
