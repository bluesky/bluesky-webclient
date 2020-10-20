import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import StarIcon from '@material-ui/icons/Star';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { IPlanObject } from './queueserver';
import { RouteComponentProps } from 'react-router-dom';

type Plans = {
  plans: IPlanObject[];
}

export class RunList extends React.Component<Plans>{
  render() {
    return (<List>
              {this.props.plans.map((planObject: any) => (
                  <ListItem divider={true} button={true} key={planObject.plan_uid}>
                      <ListItemIcon>
                        <StarIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={planObject.plan_uid.substr(0,8)}
                        secondary={planObject.name}/>
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="comments">
                          <DeleteForeverIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                  </ListItem>
              ))}
          </List>
         );}
}
