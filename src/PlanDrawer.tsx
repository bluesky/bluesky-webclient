import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { addQueueStop, IAllowedPlans, submitExcel } from './queueserver';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Avatar, Box, Button, createStyles, ListItemSecondaryAction, MenuItem, Theme, Typography } from '@material-ui/core';
import theme from './theme';
import { Star } from '@material-ui/icons';
import { BulkAdd } from './bulk';

type IProps = {
  open: boolean
  plans: IAllowedPlans;
  selectedPlan: string;
  handleSelect: (selectedPlan: string) => void;
};

type IState = {
    open: boolean;
}

const styles = (theme: { zIndex: { drawer: number; }; }) => ({
  appBar: {
    // Make the app bar z-index always one more than the drawer z-index
    zIndex: theme.zIndex.drawer + 1,
  },
});

export class PlanDrawer extends React.Component<IProps, IState>{

    constructor(props: IProps) {
        super(props);
        this.state = {
          open: true }
      }

    render() {
        return (
            <div>
                <Drawer anchor='left' open={this.props['open']}>
                  <Box width="20vw" height="2vh"></Box>
                    <div>
                        <List>
                          <Box width="20vw" height="7vh"></Box>
                          <Typography align="center" variant="h5" component="h1" gutterBottom>
                             Queue Actions
                          </Typography>
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
                              <BulkAdd submitExcel={submitExcel}></BulkAdd>
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
                        </List>
                        <List>
                        <Box width="20vw" height="2vh"></Box>
                          <Typography align="center" variant="h5" component="h1" gutterBottom>
                             Plans
                          </Typography>
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
                    </div>
                </Drawer>
            </div>
        );
    }
}
