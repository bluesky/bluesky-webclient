import React from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { IHistoricalPlan, clearHistory } from './queueserver';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActions, CardContent, Grid, Paper, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Previews } from './Previews';

type HistoricalPlans = {
  history: IHistoricalPlan[];
}

type HistoricalPlansState = {
  expanded: boolean;
}

export class HistoricalPlanList extends React.Component<HistoricalPlans, HistoricalPlansState>{

  public constructor(props: HistoricalPlans) {
    super(props);
    this.state = {
      expanded: false,
    };
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
                    <Button onClick={() => clearHistory()} variant="contained" color="primary">
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
                            exit_status: {planObject.result.exit_status}
                          </Typography>
                          <Typography>
                            run_uids: {JSON.stringify(planObject.result.run_uids)}
                          </Typography>
                          <Previews run_uid={planObject.result.run_uids[0]} enabled={true}/>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  ))}
            </Paper>
          </Box>
         );}
}