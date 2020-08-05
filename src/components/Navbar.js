import React from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toRight: {
    marginRight: theme.spacing(2),
  }
}));

// override style ~ butto， 搭配<ThemeProvider>
const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        color: 'white',
        textTransform : 'none',
      },
    },
  },
});

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <span className={classes.toRight}></span>
          <ThemeProvider theme={theme}>
            <Button component={Link} to="/" className={classes.forButton}>
              Patients
            </Button>
          </ThemeProvider>
        </Toolbar>
      </AppBar>
    </div>
  );
}
