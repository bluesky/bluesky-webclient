import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { addQueueStop, IAllowedPlans, submitExcel } from './queueserver';
import { Avatar, Box, Button, ListItemSecondaryAction, MenuItem, Typography } from '@material-ui/core';
import { Star } from '@material-ui/icons';
import { BulkAdd } from './bulk';

type IProps = {
  open: boolean
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

export class ConsoleDrawer extends React.Component<IProps, IState>{

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
                    </div>
                </Drawer>
            </div>
        );
    }
}
