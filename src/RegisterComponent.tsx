import { Box, ListItem, Typography, List, TextField, Button, InputAdornment, IconButton } from '@material-ui/core';
import { FirstPageRounded, Visibility, VisibilityOff } from '@material-ui/icons';
import React from 'react';
import { registerAction } from './useractions'

type IProps = {};
  
interface IState {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  passwordConfirmation: string,
  error: string,
  showPassword: boolean,
};

export class RegisterComponent extends React.Component<IProps, IState>{

  constructor(props: IProps) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
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

  register(){
        // Assert firstName, lastName and phone not empty
        if (!((this.state.firstName.length) > 0)) {
          throw new Error('First Name was not provided');
        }
        // Assert firstName, lastName and phone not empty
        if (!((this.state.lastName.length) > 0)) {
          throw new Error('Last Name was not provided');
        }
        // Assert email is not empty
        if (!(this.state.email.length > 0)) {
          throw new Error('Email was not provided');
        }
        // Assert password is not empty
        if (!(this.state.password.length > 0)) {
          throw new Error('Password was not provided');
        }
        // Assert password confirmation is not empty
        if (!(this.state.passwordConfirmation.length > 0)) {
          throw new Error('Password confirmation was not provided');
        }
        // Assert email or password or password confirmation is not empty
        if (this.state.password !== this.state.passwordConfirmation) {
          throw new Error('Passwords do not match')
        }

        registerAction(this.state.firstName, this.state.lastName, this.state.email, this.state.password)
  }

  render(){
    return (
      <Box>
        <ListItem style={{justifyContent:'center'}}>
          <Typography variant="h5">
            Register
          </Typography>
        </ListItem>
        <Box border={1}>
          <List>
            <ListItem style={{justifyContent:'center'}}>
              <TextField style = {{width: '50%'}} label="first name" variant="outlined" 
                         onChange={(e) => this.setState({firstName: e.currentTarget.value})} />
            </ListItem>
            <ListItem style={{justifyContent:'center'}}>
              <TextField style = {{width: '50%'}} label="last name" variant="outlined" 
                         onChange={(p) => this.setState({lastName: p.currentTarget.value})} />
            </ListItem>
            <ListItem style={{justifyContent:'center'}}>
              <TextField style = {{width: '50%'}} label="email" variant="outlined" 
                         onChange={(p) => this.setState({email: p.currentTarget.value})} />
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
              <TextField type={this.state.showPassword ? 'text' : 'password'} style = {{width: '50%'}} label="confirm password" variant="outlined" onChange={(p) => this.setState({passwordConfirmation: p.currentTarget.value})}
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
              <Button variant="contained" onClick={this.register.bind(this)}>
                Register
              </Button>
            </ListItem>
          </List>
        </Box>
      </Box>
    );
  }
};