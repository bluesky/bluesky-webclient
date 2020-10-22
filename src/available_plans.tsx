import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import StarIcon from '@material-ui/icons/Star';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { IPlan, IPlanObject } from './queueserver';
import { RouteComponentProps } from 'react-router-dom';
import { Box, Card, CardActions, CardContent, Container, Paper, Typography } from '@material-ui/core';

type Plans = {
  plans: string[];
}

export class AvailablePlans extends React.Component<Plans>{

  handleDelete(uid: string) {
    alert(uid)
  }

  handleMoveForward(uid: string) {
    alert(uid)
  }

  handleMoveBackward(uid: string) {
    alert(uid)
  }

  handlePlay(uid: string) {
    alert(uid)
  }

  handlePause(uid: string) {
    alert(uid)
  }

  render() {
    return (
          <Box> 
            <Card style={{height: "6vh"}} raised={true}>
              <CardContent>
                <Typography align="center" variant="h5" component="h1" gutterBottom>
                  Available Plans
                </Typography>
              </CardContent>
            </Card>
            <Box height="2vh"></Box>
            <Paper style={{height: "75vh", overflow: 'auto', margin: "auto"}}>
              <List>
                {this.props.plans.map((planObject: string) => (
                    <ListItem divider={true} button={true} key={planObject}>
                        <ListItemIcon>
                          <AccountCircleIcon fontSize='large' />
                        </ListItemIcon>
                        <ListItemText
                          primary={planObject}
                          secondary={planObject}/>
                    </ListItem>
                ))}
            </List>
            </Paper>
          </Box>
         );}
}
