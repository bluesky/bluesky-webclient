import React from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { IHistoricalPlan } from './queueserver';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActions, CardContent, Grid, Paper, Typography } from '@material-ui/core';
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

  private clearHistory(){
    alert("Clear")
  }

  render() {
    return (
          <Box> 
            <Card style={{height: "6vh"}} raised={true}>

              <CardContent>
                <Grid container spacing={5} direction="row" justify="space-evenly" alignContent="center">
                  <Grid item>
                    <Typography align="center" variant="h5" component="h1">
                      History
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button onClick={() => this.clearHistory()} variant="contained" color="primary">
                      clear
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Box height="2vh"></Box>
            <Paper style={{height: "75vh", overflow: 'auto', margin: "auto"}}>
                {this.props.history.map(
                    (planObject: IHistoricalPlan) => (
                    <Accordion>
                      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
                        <ListItemIcon>
                          <AccountCircleIcon fontSize='large' />
                        </ListItemIcon>
                        <ListItemText
                            primary={planObject.name}
                            secondary={planObject.item_uid.substr(0,8)}/>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div>
                          <Typography>
                            uid: {planObject.item_uid}
                          </Typography>
                          <Typography>
                            args: {JSON.stringify(planObject.args)}
                          </Typography>
                          <Typography>
                            kwargs: {JSON.stringify(planObject.kwargs)}
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
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  ))}
            </Paper>
          </Box>
         );}
}


/*
    name: string;
    args: string | number | boolean | (string|number|boolean)[]; 
    kwargs: { [name: string]: string | number | boolean | (string|number|boolean)[]; }
    item_uid: string;
    user: string;
    user_group: string;
    exit_status: string;
  */
