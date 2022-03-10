import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { IConsoleOutput } from './queueserver';
import { Box, makeStyles, Paper, Typography } from '@material-ui/core';

type IProps = {
  open: boolean,
  console: IConsoleOutput
};

type IState = {
    open: boolean;
}

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
                  <List style={{borderColor: "#ffefb2", backgroundColor:"#101010"}}>
                    <Box height="3vh"></Box>
                    <ListItem divider={false}>
                      <Box style={{padding:"15px"}} >
                        <Typography variant="body1" style={{ wordWrap: "break-word", color: "#ffefb2" }} >
                          <pre style={{ fontFamily: 'inherit' }}>
                            {this.props.console.bluesky_console.text}
                          </pre>
                        </Typography>
                      </Box>
                    </ListItem>
                  </List>
              </Drawer>
            </div>
        );
    }
}
