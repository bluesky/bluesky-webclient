import React from 'react';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { IAllowedPlans, addQueueStop} from './queueserver';
import {submitExcel } from './planactions';
import { Avatar, Box, Button, Card, CardContent, ListItem, ListItemSecondaryAction, MenuItem, Paper, Typography } from '@material-ui/core';
import { Star } from '@material-ui/icons';
import { BulkAdd } from './bulk'

type Plans = {
  plans: IAllowedPlans;
  selectedPlan: string;
  submitExcel: typeof submitExcel;
  handleSelect: (selectedPlan: string) => void;
}

export class AvailablePlans extends React.Component<Plans>{

  render() {
    return (
          <Box> 
            <Card style={{height: "6vh"}} raised={true}>
              <CardContent>
                <Typography align="center" variant="h5" component="h1" gutterBottom>
                  Add items to queue
                </Typography>      
              </CardContent>  
            </Card>
            <Box height="2vh"></Box>
            <Paper style={{height: "75vh", overflow: 'auto', margin: "auto"}}>
              <List>
                <ListItem divider={true}>
                  <ListItemIcon color="secondary">
                    <Avatar>
                      <Star />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary="Bulk insert"
                    secondary="upload excel sheet"/>
                  <ListItemSecondaryAction>
                    <BulkAdd submitExcel={this.props.submitExcel}></BulkAdd>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem divider={true}>
                  <ListItemIcon color="secondary">
                    <Avatar>
                      <Star />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary="queue_stop"
                    secondary="stops the queue"/>
                  <ListItemSecondaryAction>
                    <Button onClick={() => addQueueStop()} variant="contained" color="primary">
                      Add
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
                {Object.keys(this.props.plans.plans_allowed).map(
                  (planObject: string) => (
                    <MenuItem selected={planObject === this.props.selectedPlan} 
                              onClick={() => this.props.handleSelect(planObject)} divider={true} 
                              button={true} key={planObject}>
                        <ListItemIcon>
                          <Avatar>
                            <Star />
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
