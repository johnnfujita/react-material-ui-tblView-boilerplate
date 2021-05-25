import React from 'react'
import  { Snackbar } from "@material-ui/core";
import { Alert}  from "@material-ui/lab";

const Notification = (props) => {
    
    const { notify, setNotify } = props;

    const handleClose = (e, reason)=> {
        setNotify({
            ...notify,
            isOpen: false
        })
    }
    
    return (
        <Snackbar
            open={notify.isOpen}
            autoHideDuration={2000}
            anchorOrigin={{vertical:"top", horizontal:"center"}}
            onClose={handleClose}
        >
            <Alert 
                onClose={handleClose}
                severity={notify.type}
            >
                {notify.message}
            </Alert>
        </Snackbar>
    )
}

export default Notification
