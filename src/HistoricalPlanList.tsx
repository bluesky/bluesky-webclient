import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { IHistoricalPlan } from './queueserver';
import { Box, Card, CardContent, Paper, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

type HistoricalPlans = {
  history: IHistoricalPlan[];
}

export class HistoricalPlanList extends React.Component<HistoricalPlans>{

  handleExpand(uid: string) {
    alert(uid);
  }

  render() {
    return (
          <Box> 
            <Card style={{height: "6vh"}} raised={true}>
              <CardContent>
                <Typography align="center" variant="h5" component="h1" gutterBottom>
                  History
                </Typography>
              </CardContent>
            </Card>
            <Box height="2vh"></Box>
            <Paper style={{height: "75vh", overflow: 'auto', margin: "auto"}}>
              <List>
                {this.props.history.map(
                  (planObject: IHistoricalPlan) => (
                    <ListItem divider={true} button={true} key={planObject.plan_uid}>
                        <ListItemIcon>
                          <AccountCircleIcon fontSize='large' />
                        </ListItemIcon>
                        <ListItemText
                          primary={planObject.name}
                          secondary={planObject.plan_uid.substr(0,8)}/>
                        <ListItemSecondaryAction>
                          <IconButton onClick={() => this.handleExpand(planObject.plan_uid)} edge="end" aria-label="comments">
                            <ExpandMoreIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            </Paper>
          </Box>
         );}
}

/*
    name: string;
    args: string | number | boolean | (string|number|boolean)[]; 
    kwargs: { [name: string]: string | number | boolean | (string|number|boolean)[]; }
    plan_uid: string;
    user: string;
    user_group: string;
    exit_status: string;
  */
