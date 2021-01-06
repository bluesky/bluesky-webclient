import React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { IApplicationState } from './store';
import { getUser, loginActionCreator, registerActionCreator } from './useractions'
import { IUser } from './facility';
import { RouteComponentProps } from "react-router-dom";
import { LoginComponent } from './LoginComponent';
import { RegisterComponent } from './RegisterComponent';

interface IProps extends RouteComponentProps {
    getUser: typeof getUser;
    loginActionCreator: typeof loginActionCreator;
    registerActionCreator: typeof registerActionCreator;
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
            <LoginComponent loginActionCreator={this.props.loginActionCreator}/>
            <Box width="80vw" height="2vh"></Box>
            <RegisterComponent registerActionCreator={this.props.registerActionCreator}/>
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
    token: store.user.token,
    permissions: store.user.permissions,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getUser: (username: string) => dispatch(getUser(username)),
    loginAction: (email: string, password: string) => dispatch(loginActionCreator(email, password)),
    registerActionCreator: (firstName: string, lastName: string, 
                            email: string, password: string) => dispatch(registerActionCreator(firstName, lastName, 
                                                                                               email, password))
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);
