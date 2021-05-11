import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { IAllowedPlans, submitExcel } from './queueserver';

type IProps = {
    plans: IAllowedPlans;
    selectedPlan: string;
    submitExcel: typeof submitExcel;
    handleSelect: (selectedPlan: string) => void;
  }

type IState = {
    open: boolean;
}

export class TemporaryDrawer extends React.Component<IProps, IState>{

    constructor(props: IProps) {
        super(props);
        this.state = {
          open: false,
        }
      }

    private toggleDrawer(){
        this.setState({...this.state, open: !this.state.open });
    };

    render() {
        return (
            <div>
                <React.Fragment key={'left'}>
                <Button onClick={this.toggleDrawer()}>{'left'}</Button>
                <Drawer anchor='left' open={this.state['open']}>
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
                </React.Fragment>
            </div>
        );
    }
}