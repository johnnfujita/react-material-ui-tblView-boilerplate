import React from 'react'
import {KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";




const DatePicker = (props) => {

    const convertToDefault = (name, value) => ({
        target: {
            name, value
        }
    })
    const { name, value, label, onChange } = props;
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker disabledToolbar variant="inline" inputVariant="outlined"
            labe={label}
            format="MM/dd/yyyy"
            name={name}
            value={value}
            onChange={date => onChange(convertToDefault(name, date))}
            />
        </MuiPickersUtilsProvider>
    )
}
export default DatePicker
