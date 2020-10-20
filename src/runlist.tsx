import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import StarIcon from '@material-ui/icons/Star';
import ListItemText from '@material-ui/core/ListItemText';

export function RunList(props: any) {
  return (<List>
              {props.plans.map((planObject: any) => (
                  <ListItem divider={true} key={planObject.plan_uid}>
                      <ListItemIcon>
                        <StarIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={planObject.plan_uid.substr(0,8)}
                        secondary={planObject.name}
                      />
                  </ListItem>
              ))}
          </List>
         );
}
