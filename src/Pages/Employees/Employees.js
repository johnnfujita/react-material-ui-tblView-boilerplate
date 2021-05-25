import React, { useState } from 'react'
import EmployeeForm from "./EmployessForm";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import PageHeader from '../../components/PageHeader';
import { InputAdornment, makeStyles, Paper,  TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core';


import useTable from "../../components/useTable";
import Popup from "../../components/Popup";
import ConfirmDialog from "../../components/ConfirmDialog";

import * as employeeServices from "../../services/employeeService";



import Button from "../../components/controls/Button";
import Input from "../../components/controls/Input"


import { Add, Close, EditOutlined, Search } from '@material-ui/icons';
import ActionButton from '../../components/controls/ActionButton';
import Notification from '../../components/Notification';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: "75%"
    },
    newButton: {
        position: "absolute",
        right: "10px"
    }
}))

const headCells = [
    {id: "fullName", label: "Employee Name"},
    {id: "email", label: "Email"},
    {id: "mobile", label: "Mobile Number"},
    {id: "department", label: "Department"},
    {id: "actions", label: "Actions", disableSorting: true}
]

const Employees = () => {
    
    const classes = useStyles();
    

    /**
     *  Set the state: recordForEdit(flags the items to edit), records(loadAlltheEmployeessaved in the localStorage as employees), 
     *  fiterFunction(set the items to return after search), openPopPup(sets popupopen), notify(prepare notifications)
     * */

    const [recordForEdit, setRecordForEdit] = useState(null);
    const [records, setRecords ] = useState(employeeServices.getAllEmployees());
    const [filterFunc, setFilterFunc] = useState({fn: items => { return items}})
    const [openPopup, setOpenPopup] = useState(false);
    const [notify, setNotify] = useState({isOpen: false, message: "", type: ""})
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: "",
        subtitle: ""
    })

    /////////
    
    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(records, headCells, filterFunc);

    const handleSearch = e => {
        let target = e.target;
        setFilterFunc({
            fn: items => {
                if(target.value ==="") {
                    return items;
                }
                else {
                    return items.filter(x => x.fullName.toLowerCase().includes(target.value.toLowerCase()))
                }

            }
        })
    }
    const addOrEdit = (employee, resetForm) => {
        if(employee.id === 0) {
            employeeServices.insertEmployee(employee);
        }
        else {
            employeeServices.updateEmployee(employee);
        }
        
        resetForm();
        setRecordForEdit(null);
        setOpenPopup(false);
        // to update the view a call is to update the state of the records
        setRecords(employeeServices.getAllEmployees());
        setNotify({
            isOpen: true,
            message: "User Saved",
            type: "success"
        })
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = id => {
        console.log("You caleld me")
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false

        })
        employeeServices.deleteEmployee(id);
        setRecords(employeeServices.getAllEmployees());
        setNotify({
            isOpen: true,
            message: "Employee Deleted",
            type: "error"
        })

    }

    return (
        <>  
            <PageHeader
               
                title="Add Employee"
                subtitle="Enter the new employee"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                
                <Toolbar>
                    <Input 
                        label="Search Employee"
                        InputProps={{startAdornment:(<InputAdornment position="start"><Search /></InputAdornment>)}}
                        className={classes.searchInput}
                        onChange={handleSearch}
                    />
                    <Button 
                        text="Add New"
                        variant="outlined"
                        startIcon={<Add />}
                        className={classes.newButton}
                        onClick={()=> {setOpenPopup(true);setRecordForEdit(null)}}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item => (

                                <TableRow  key={item.id}>
                                    <TableCell>{item.fullName}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.mobile}</TableCell>
                                    <TableCell>{item.department}</TableCell>
                                    <TableCell>
                                        <ActionButton
                                            color="primary"
                                            onClick={()=> {openInPopup(item)}}
                                        >
                                            <EditOutlined  fontSize="small"/>
                                        </ActionButton>
                                        <ActionButton
                                            color="secondary"
                                            onClick={()=>{
                                                console.log("you clicked me")
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: "Delete Employee",
                                                    subtitle: "Do you really want to delete?",
                                                    onConfirm: () => {onDelete(item.id)}
                                                })
                                                
                                            }}
                                        >
                                            <Close  fontSize="small"/>
                                        </ActionButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Employee Form"
            >
                <EmployeeForm 
                    addOrEdit={addOrEdit}
                    recordForEdit={recordForEdit}
                />
            </Popup>


            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog 
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}

export default Employees
