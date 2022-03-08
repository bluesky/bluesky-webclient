import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { IConsoleOutput } from './queueserver';
import { Box, Typography } from '@material-ui/core';

type IProps = {
  open: boolean,
  console: IConsoleOutput
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
                          <Box width="20vw" height="7vh"></Box>
                          <Typography align="center" variant="h5" component="h1" gutterBottom>
                             Console Output
                          </Typography>
                          <ListItem divider={true}>
                            <Box sx={{ width: "32vw" }}>
                              <Typography style={{ wordWrap: "break-word" }}>
                                {this.props.console.bluesky_console.text}
                              </Typography>
                            </Box>
                          </ListItem>
                        </List>
                    </div>
                </Drawer>
            </div>
        );
    }
}
