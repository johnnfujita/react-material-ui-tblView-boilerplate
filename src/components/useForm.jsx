import React,{ useState } from 'react'
import {makeStyles} from "@material-ui/core";



/**
 * 
 * Higher order component to display forms handling, default values,
 * errors, helperText, reseting the values. 
 * 
 */
export const useForm = (initialValues) => {

    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const handleChangeInput = e => {
        
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value 
        })
    }
    const resetForm = () => {

        setValues(initialValues);
        setErrors({});
    }
 
    return {
        values,
        setValues,
        errors,
        setErrors,
        handleChangeInput,
        resetForm
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        "& .MuiFormControl-root": {
            width: "80%",
            margin: theme.spacing(1)
        }
    }
}))

export const Form = (props) => {
    const classes = useStyles()
    const { children, ...other} = props;
    return (
        <form className={ classes.root} {...other}>
            {props.children}
        </form>
    )
}
