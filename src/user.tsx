import React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import { IApplicationState } from './store';
import { getUser } from './useractions'
import { IUser, IUserGetAction } from './facility';

export type UserActions = 
| IUserGetAction

type RouteParams = { id: string, uid: string };

interface IProps {
    getUser: typeof getUser;
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
              Page to display Login or Logout/User information
            </Typography>
            <Tooltip title="Local username">
              <Typography variant="h5">User: {this.props.user.username}</Typography>
              </Tooltip>
	      <Typography variant="h6">User info - email: {this.props.user.email}
        <p>ORCiD: {this.props.user.orcid}</p></Typography>
            <div><pre>More information about the user here...</pre></div>
          </Box>
        </Container>
        )
    }

    componentDidMount() {
        this.props.getUser(this.props.user.username);
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
    getUser: (username: string) => dispatch(getUser(username))
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserPage);
