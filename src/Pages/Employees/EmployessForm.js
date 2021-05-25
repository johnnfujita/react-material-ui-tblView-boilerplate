import {Grid } from '@material-ui/core';
import React, {useEffect} from 'react'
import Input from '../../components/controls/Input';
import {useForm, Form} from "../../components/useForm";
import RadioGroup from "../../components/controls/RadioGroup"
import Select from '../../components/controls/Select';

import * as employeeSevice from "../../services/employeeService";
import Checkbox from '../../components/controls/Checkbox';
import DatePicker from '../../components/controls/DatePicker';
import Button from '../../components/controls/Button';


const initialValues = {
    id: 0,
    fullName: "",
    email: "",
    mobile: "",
    city: "",
    gender: "male",
    departmentId: "",
    hireDate: new Date(),
    isPermanent: false
}

const genderItems = [
    {id: "male", title: "Male"},
    {id: "female", title: "Female"},
    {id: "other", title: "Other"}
]
const EmployessForm = (props) => {
   
    const { addOrEdit, recordForEdit } = props;

    const validate = () => {
        let temp = {}
        temp.fullName = values.fullName ? "" : "This Field Cannot Be empty"
        temp.email = (/$^|.+@.+..+/).test(values.email)? "": "Not a valid Email"
        temp.mobile = values.mobile.length>9 ? "":"This must be a phone number"
        temp.departmentId = values.departmentId.length !== 0 ? "":"this field is required"
        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "")
    }
   
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleChangeInput,
        resetForm,
    } = useForm(initialValues);
   
    const handleSubmit = e => {
       e.preventDefault()
       if(validate()) {
            addOrEdit(values, resetForm)
       }
    }

    useEffect(()=>{
        if(recordForEdit != null) {
            setValues({
                ...recordForEdit
            })
        }
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Input 
                        name="fullName"
                        label="Full Name"
                        value={values.fullName}
                        onChange={handleChangeInput}
                        error={errors.fullName}
                    />
                    <Input
                        label="Email"
                        name="email"
                        onChange={handleChangeInput}
                        value={values.email}
                        error={errors.email}
                    />
                    <Input
                        label="Mobile"
                        name="mobile"
                        onChange={handleChangeInput}
                        value={values.mobile}
                        error={errors.mobile}
                    />
                    <Input
                        label="City"
                        name="city"
                        onChange={handleChangeInput}
                        value={values.city}
                    />
                </Grid>
                <Grid item xs={6}>
                    <RadioGroup
                        name="gender"
                        value={values.gender}
                        onChange={handleChangeInput}
                        items={genderItems}
                        label="Gender"
                    />
                    <Select
                        name="departmentId"
                        label="Department"
                        value={values.departmentId}
                        onChange={handleChangeInput}
                        options={employeeSevice.getDepartmentCollection()}
                        error={errors.departmentId}
                        />
                    
                    <DatePicker 
                        name="hireDate"
                        value={values.hireDate}
                        label="Hire Date"
                        onChange={handleChangeInput}
                    />
                    
                    <Checkbox 
                        name="isPermanent"
                        value={values.isPermanent}
                        label="Permanent Employee"
                        onChange={handleChangeInput}
                    />
                    <div>
                        <Button 
                            type="submit"
                            text="Submit"

                        />
                        <Button 
                            text="Reset"
                            color="default"
                            onClick={resetForm}
                        />
                    </div>

                </Grid>
            </Grid>
        </Form>
    )
}

export default EmployessForm
