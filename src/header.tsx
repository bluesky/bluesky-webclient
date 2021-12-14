import React from 'react';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import logo from './assets/bluesky-logo.svg'
import { PlanDrawer } from './PlanDrawer';
import { Avatar, Box } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const Header: React.SFC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="absolute" style={{zIndex: 2000}}>
            <Toolbar>
              <Box display='flex' flexGrow={1}>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                </IconButton>
                <img src={logo} alt="logo" style={{position: 'absolute', 
                                                    height: '100%',
                                                    left: '50%', 
                                                    top: '50%', 
                                                    transform: 'translate(-50%, -50%)'}}/>
              </Box>
              <Button color="inherit" component={RouterLink} to="/user">Logout</Button>
              <Avatar>BR</Avatar>
            </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
