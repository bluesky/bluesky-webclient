import React from 'react';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { IAllowedPlans } from './queueserver';
import { Avatar, Box, Card, CardContent, MenuItem, Paper, Typography } from '@material-ui/core';

type Plans = {
  plans: IAllowedPlans;
  selectedPlan: string;
  handleSelect: (selectedPlan: string) => void;
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
                {Object.keys(this.props.plans.plans_allowed).map(
                  (planObject: string) => (
                    <MenuItem selected={planObject === this.props.selectedPlan} onClick={() => this.props.handleSelect(planObject)} divider={true} button={true} key={planObject}>
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
