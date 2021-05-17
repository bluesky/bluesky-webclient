import React from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { IHistoricalPlan, clearHistory } from './queueserver';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, Grid, IconButton, Paper, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Previews } from './Previews';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

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
            <Box height="1vh"></Box>
                    <Typography style={{ fontWeight: 500 }} align="center" variant="h4" component="h1" gutterBottom>
                      History
                      <IconButton onClick={() => clearHistory()} edge="end" aria-label="comments">
                        <DeleteForeverIcon />
                      </IconButton>
                    </Typography>
            <Box height="2vh"></Box>
            <Paper elevation={0} style={{height: "75vh", overflow: 'auto', margin: "auto", backgroundColor: 'transparent'}}>
                {this.props.history.map(
                    (planObject: IHistoricalPlan, index: number) => (
                    <Accordion key={index} TransitionProps={{ unmountOnExit: true }}>
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
                          <Previews runUid={planObject.result.run_uids[0]}/>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  ))}
            </Paper>
          </Box>
         );}
}