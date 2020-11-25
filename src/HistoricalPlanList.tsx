import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { IHistoricalPlan } from './queueserver';
import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, Paper, Typography } from '@material-ui/core';
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

  private handleChange(e: React.ChangeEvent<{}>, expanded: boolean) {
    alert(JSON.stringify(e.target))
    //const { id } = e.target;
    //this.setState({
    //    expanded: id
    //});
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
                    <Accordion square id={planObject.plan_uid} expanded={this.state.expanded === planObject.plan_uid} onChange={this.handleChange.bind(this)}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                      <Typography>{planObject.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        uid: {planObject.plan_uid}
                      </Typography>
                      <Typography>
                        args: {planObject.args}
                      </Typography>
                      <Typography>
                        kwargs: {planObject.kwargs}
                      </Typography>
                      <Typography>
                        user: {planObject.user}
                      </Typography>
                      <Typography>
                        user_group: {planObject.user_group}
                      </Typography>
                      <Typography>
                        exit_status: {planObject.exit_status}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
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
