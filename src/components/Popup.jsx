import { Dialog, DialogContent, DialogTitle, makeStyles, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React from 'react'
import ActionButton from './controls/ActionButton';


const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: "absolute",
        top: theme.spacing(5)
    }
}))

const Popup = (props) => {
    
    const { title, children, openPopup, setOpenPopup } = props;
    const classes = useStyles();

    return ( 
        <Dialog open={openPopup} maxWidth="md" classes={{paper:classes.dialogWrapper}}>
            <DialogTitle>
                <div style={{display: "flex"}}>
                    <Typography
                        style={{flexGrow: 1}} 
                        variant="h6"
                        component="div"
                    >
                        {title}
                    </Typography>
                    <ActionButton
                       
                        color="secondary"
                        onClick={()=>setOpenPopup(false)}
                    >
                        <Close />
                    </ActionButton>

                    
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default Popup
