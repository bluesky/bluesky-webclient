import React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import { IApplicationState } from './store';
import { getUsers } from './useractions'
import { IUser, IUserGetAction } from './facility';
import {
    RouteComponentProps
} from "react-router-dom";

export type UserActions = 
| IUserGetAction

type RouteParams = { id: string, uid: string };


interface IProps extends RouteComponentProps {
    getUsers: typeof getUsers;
    loading: boolean;
    user: IUser;
}

interface IState {
  userId: number;
}
class UserPage extends React.Component<IProps, IState> {
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
const mapStateToProps = (store: IApplicationState) => {
  return {
    loading: store.user.userLoading,
    user: store.user.user,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getUsers: () => dispatch(getUsers())
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserPage);
