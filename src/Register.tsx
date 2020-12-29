import { Box, ListItem, Typography, List, TextField, Button, InputAdornment, IconButton, Input, FormControl, InputLabel, FilledInput, OutlinedInput } from '@material-ui/core';
import { Visibility, VisibilityOff, Widgets } from '@material-ui/icons';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import auth from './auth';

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

export class Register extends React.Component<IProps, IState>{

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

  // Source: https://github.com/ankushjain2001/fastapi-react-mongodb/blob/master/frontend/src/auth/register.js
  async callSubmit(e: any){

    // Prevents page reload on wrongs creds
    e.preventDefault();
    this.setState({error: ''})
    try {
      const data = await auth.register(this.state.firstName, this.state.lastName, 
                                       this.state.email, this.state.password, this.state.passwordConfirmation);
      // Executes only when there are no 400 and 500 errors, else they are thrown as errors
      // Callbacks can be added here
      if (data) {
        await auth.login(this.state.email, this.state.password);
        alert('Registration Successful!');
        //history.push('/');
      }
    }
    catch (err) {
      if (err instanceof Error) {
        // Handle errors thrown from frontend
        this.setState({error: err.message});
      } 
      else {
        // Handle errors thrown from backend
        if (err === 'REGISTER_USER_ALREADY_EXISTS') {
          this.setState({error: 'Email ID is already registered. Please use your credentials to login.'});
        }
        else {
          this.setState({error: 'Error occured in the API.'});
        }
      }
    }
  };

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
              <Button variant="contained" onClick={this.callSubmit.bind(this)}>
                Register
              </Button>
            </ListItem>
          </List>
        </Box>
      </Box>
    );
  }
};