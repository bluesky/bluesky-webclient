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
import { IPlan, IPlanAllowedObject, IPlanObject } from './queueserver';
import { RouteComponentProps } from 'react-router-dom';
import { Avatar, Box, Card, CardActions, CardContent, Container, MenuItem, Paper, Typography } from '@material-ui/core';
import Thumb from './assets/nsls-ii-diffraction-image-hr.jpg';

type Plans = {
  allowedPlans: IPlanAllowedObject[];
  selectedPlan: IPlanAllowedObject;
  handleSelect: (selectedPlan: IPlanAllowedObject) => void;
}

export class AvailablePlans extends React.Component<Plans>{

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
                {this.props.allowedPlans.map((planObject: IPlanAllowedObject) => (
                    <MenuItem selected={planObject == this.props.selectedPlan} onClick={() => this.props.handleSelect(planObject)} divider={true} button={true} key={planObject.name}>
                        <ListItemIcon>
                          <Avatar>
                            <Typography align="center" variant="body2" gutterBottom>
                              BMM
                            </Typography>
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={planObject}
                          secondary={planObject}/>
                    </MenuItem>
                ))}
            </List>
            </Paper>
          </Box>
         );}
}
