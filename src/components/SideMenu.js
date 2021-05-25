import React from 'react'
import { makeStyles} from "@material-ui/core"
const useStyles = makeStyles(theme =>({
    sideMenu: {
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        left: "0px",
        width: "50px",
        height: "100%",
        backgroundColor: theme.palette.primary.main,
        transition: "1s width ease-in-out",
        zIndex: "20",
        "&:hover": {
            width: "320px",

        }
    }
}));

const SideMenu = () => {
    const classes = useStyles();
    return (
        <div className={classes.sideMenu}>
            
        </div>
    )
}

export default SideMenu
