import { AppBar, Toolbar, Grid, InputBase, IconButton, Badge, makeStyles } from '@material-ui/core'
import React from 'react'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { NotificationsNoneRounded } from '@material-ui/icons';
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "#fff",
    },
    searchInput: {
        opacity: 0.6,
        padding: "0px 8px",
        fontSize:"0.8rem",
        "&:hover": {
            backgroundColor: "#f2f2f2"
        },
        "& .MuiSvgIcon-root": {
            marginRight: theme.spacing(1)
        }
    }
}))

const Header = () => {
    const classes = useStyles();
    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Grid container alignItems="center" >
                    <Grid item>
                        <InputBase className={classes.searchInput} placeholder="Busca" startAdornment={<SearchIcon fontSize="small"/>}/>
                    </Grid>
                    <Grid item sm></Grid>
                    <Grid item >
                        <IconButton>
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsNoneRounded fontSize="small"/>
                            </Badge>
                         
                        </IconButton>
                        <IconButton>
                        <Badge badgeContent={3} color="primary">
                                <ChatBubbleIcon fontSize="small" />
                            </Badge>
                        </IconButton>
                        <IconButton>
                        <Badge badgeContent={3} color="primary">
                                <AccountCircleIcon fontSize="small"/>
                            </Badge>
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Header
