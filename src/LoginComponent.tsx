import React from 'react';
import { Button, Box, TextField, ListItem, List, Typography, IconButton, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

type IProps = {
  loginActionCreator: (email: string, password: string) => void;
};
  
interface IState {
  email: string,
  password: string,
  error: any,
  showPassword: boolean
};

export class LoginComponent extends React.Component<IProps, IState>{

  constructor(props: IProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      showPassword: false,
    };
  }

  showPassword(){
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>){
    event.preventDefault();
  };

  login(){
    if (!(this.state.email.length > 0)) {
      throw new Error('Email was not provided');
    }
    if (!(this.state.password.length > 0)) {
      throw new Error('Password was not provided');
    }
    this.props.loginActionCreator(this.state.email, this.state.password);
  };

  render(){
    return (
      <Box>
        <ListItem style={{justifyContent:'center'}}>
          <Typography variant="h5">
            Login
          </Typography>
        </ListItem>
        <Box border={1}>
          <List>
            <ListItem style={{justifyContent:'center'}}>
              <TextField style = {{width: '50%'}} label="email" variant="outlined" 
                         onChange={(e) => this.setState({email: e.currentTarget.value})} />
            </ListItem>
            <ListItem style={{justifyContent:'center'}}>
              <TextField type={this.state.showPassword ? 'text' : 'password'} style = {{width: '50%'}} label="password" variant="outlined" onChange={(p) => this.setState({password: p.currentTarget.value})}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={this.showPassword.bind(this)}
                            onMouseDown={this.handleMouseDownPassword.bind(this)}>
                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>,
                        }}/>
            </ListItem>
            <ListItem style={{justifyContent:'center'}}>
              <Button variant="contained" onClick={this.login.bind(this)}>
                Log In
              </Button>
            </ListItem>
          </List>
        </Box>
      </Box>
    );
  }
};