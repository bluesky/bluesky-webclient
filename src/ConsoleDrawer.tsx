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
                  <Box width="32vw" height="2vh"></Box>
                    <div>
                        <List>
                          <Box width="20vw" height="5vh"></Box>
                          <Typography align="center" variant="h5" component="h1" gutterBottom>
                             Console Output
                          </Typography>
                          <ListItem divider={true}>
                            <Typography>
                              Console output
                            </Typography>
                          </ListItem>
                        </List>
                    </div>
                </Drawer>
            </div>
        );
    }
}
