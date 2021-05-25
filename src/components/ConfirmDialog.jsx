import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles, Typography } from '@material-ui/core'
import { NotListedLocation } from '@material-ui/icons';
import React from 'react'
import Button from './controls/Button';


const useStyles = makeStyles( theme => ({
    dialog: {
        padding: theme.spacing(2),
        position: "absolute",
        top: theme.spacing(5)
    },
    dialogTitle: {
        textAlign: 'center'
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogAction: {
        justifyContent: "center"
    },
    titleIcon: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.main,
        "&:hover": {
            backgroundColor: theme.palette.secondary.light,
            cursor: "default"
        },
        "& .MuiSvgIcon-root": {
            fontSize: "8rem"
        }
    }
}))

const ConfirmDialog = (props) => {

    const classes = useStyles();

    const { confirmDialog, setConfirmDialog } = props;
    return (
        <Dialog classes={{paper: classes.dialog}} open={confirmDialog.isOpen}>
            <DialogTitle className={classes.dialogTitle}>
                <IconButton disableRipple className={classes.titleIcon}>
                    <NotListedLocation />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography
                    variant="h6"
                >
                    {confirmDialog.title}
                </Typography>
                <Typography
                    variant="subtitle2"
                >
                    {confirmDialog.subtitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Button 
                    text="No"
                    color="default"
                    onClick={()=> setConfirmDialog({...confirmDialog, isOpen: false })}
                />
                <Button 
                    text="Yes"
                    color="secondary"
                    onClick={confirmDialog.onConfirm}
                />

            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog
