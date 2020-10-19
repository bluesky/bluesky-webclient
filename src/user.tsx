import React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { IApplicationState } from './store';
import { IUser } from './facility';
import {
    RouteComponentProps
} from "react-router-dom";

export enum UserActionTypes {
  GETINFO = "USER/GETACTION",
  LOADING = "USER/LOADING"
}

export interface IUserGetAction {
  type: UserActionTypes.GETINFO,
  user: IUser
}

export interface IUserLoadingAction {
  type: UserActionTypes.LOADING
}

export type UserActions = 
| IUserGetAction

type RouteParams = { id: string, uid: string };

interface Props extends RouteComponentProps<RouteParams> { }

interface IProps extends RouteComponentProps {
    loading: boolean;
    user: IUser;
}

class UserPage extends React.Component<IProps> {
    public constructor(props: IProps) {
        super(props);
      }
    render() {
        return (
          <Container maxWidth="sm">
          <Box my={4}>
            <Typography variant="h4" component="h1" gutterBottom>
              This is where we will display information for the user...
            </Typography>
              <Typography variant="h6" component="h1" gutterBottom>
              <div>
                  loading: {this.props.loading}.
              </div>
            </Typography>
            <Tooltip title="Just show something pretty">
              <Typography variant="h5">User: {this.props.user.username}</Typography>
              </Tooltip>
	      <Typography variant="h3">Globus email: {this.props.user.globus_email}</Typography>
            <div><pre>no plan so not printing something pretty here</pre></div>
          </Box>
        </Container>
        )
    }

    componentDidMount() {
        //this.props.submitPlan();
    }
}
export default connect(
)(UserPage);
