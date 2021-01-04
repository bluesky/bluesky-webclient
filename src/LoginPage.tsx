import React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import { IApplicationState } from './store';
import { getUser } from './useractions'
import { IUser, IUserGetAction } from './facility';
import {
    RouteComponentProps
} from "react-router-dom";
import { LoginComponent } from './LoginComponent';
import { RegisterComponent } from './RegisterComponent';

export type UserActions = 
| IUserGetAction

type RouteParams = { id: string, uid: string };

interface IProps extends RouteComponentProps {
    getUser: typeof getUser;
    loading: boolean;
    user: IUser;
}

interface IState {
  userId: number;
}
class LoginPage extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props);
      }
    render() {
        return (
          <Container maxWidth="sm">
          <Box my={4}>
            <LoginComponent />
            <Box width="80vw" height="2vh"></Box>
            <RegisterComponent />
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
)(LoginPage);
