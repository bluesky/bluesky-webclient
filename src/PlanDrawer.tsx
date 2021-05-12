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
import { IAllowedPlans, submitExcel } from './queueserver';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Box, createStyles, Theme } from '@material-ui/core';
import theme from './theme';

/*type IProps = {
    plans: IAllowedPlans;
    selectedPlan: string;
    submitExcel: typeof submitExcel;
    handleSelect: (selectedPlan: string) => void;
  }
*/

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
                            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                            ))}
                        </List>
                        <Divider />
                        <List>
                            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                            ))}
                        </List>
                    </div>
                </Drawer>
            </div>
        );
    }
}