import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { IHistoricalPlan } from './queueserver';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, makeStyles, Paper, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

type HistoricalPlans = {
  history: IHistoricalPlan[];
}

type HistoricalPlansState = {
  expanded: string;
}

export class HistoricalPlanList extends React.Component<HistoricalPlans, HistoricalPlansState>{

  public constructor(props: HistoricalPlans) {
    super(props);
    this.state = {
      expanded: "",
    };
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
            <div>
                {this.props.history.map(
                    (planObject: IHistoricalPlan) => (
                    <Accordion>
                      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography>{planObject.name}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <List>
                          {Object.entries(planObject).map(
                            (key, value) => (
                              <Typography>
                                {key} : {JSON.stringify(value)}
                              </Typography>
                            )
                          )}
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  ))}
              </div>
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
