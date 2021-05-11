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
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    <Link color="inherit" component={RouterLink} to="/">Monitor </Link>
                    <Link color="inherit" component={RouterLink} to="/acquire">Edit </Link>
                </Typography>
                <img src={logo} alt="logo" style={{position: 'absolute', 
                                                    height: '100%',
                                                    left: '50%', 
                                                    top: '50%', 
                                                    transform: 'translate(-50%, -50%)'}}/>
                <Button color="inherit" component={RouterLink} to="/user">Login</Button>
            </Toolbar>
            </AppBar>
            
        </div>
    );
};

export default Header;
