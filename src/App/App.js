import './App.css';
import React from "react";
import SideMenu from '../components/SideMenu';
import { CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';
import Header from "../components/Header";
import { createMuiTheme } from "@material-ui/core";


import Employees from '../Pages/Employees/Employees';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126"
      
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526"
    },
    background: {
      default: "#f4f5fd"
    }
  },
  shape: {
    borderRadius: "12px"
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0)"
      }
    }
  }
})

const useStyles = makeStyles({
  appMain: {
    paddingLeft: "50px",
    width: "100%"
  }
})

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
    
    <SideMenu />
    <div className={classes.appMain}>
    <Header>
      
    </Header>
    
    <Employees />
    </div>
    <CssBaseline />
    </ThemeProvider>
    
  );
}

export default App;
