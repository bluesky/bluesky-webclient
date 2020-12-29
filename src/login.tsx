// Source: https://github.com/ankushjain2001/fastapi-react-mongodb/blob/master/frontend/src/auth/login.js

import React from 'react';
import { useHistory } from 'react-router';
import { Button, FormControl, FormControlLabel, Box, TextField, FormLabel } from '@material-ui/core';
import auth from './auth';

type IProps = {};
  
interface IState {
  email: string,
  password: string,
  error: any,
};

export class Login extends React.Component<IProps, IState>{
  
  constructor(props: IProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
    };
  }

  async callSubmit(e: any){

    let history = useHistory();

    // Prevents page reload on wrongs creds
    e.preventDefault();
    this.setState({error: ""})
    try {
      const data = await auth.login(this.state.email, this.state.password);
      // Executes only when there are no 400 and 500 errors, else they are thrown as errors
      // Callbacks can be added here
      if (data) {
        history.push('/');
      }
    } 
    catch (err) {
      if (err instanceof Error) {
        // Handle errors thrown from frontend
        this.setState({error: err.message})
      } 
      else {
        // Handle errors thrown from backend
        if (err === 'LOGIN_BAD_CREDENTIALS') {
          this.setState({error: 'Incorrect credentials'})
        }
        else {
          this.setState({error: 'Error occured in the API.'})
        }
      }
    }
  };

  
  render(){
    return (
      <Box>
        <FormControl>
          <FormLabel component="legend">
            email  
          </FormLabel>
          <TextField onChange={(e) => this.setState({email: e.currentTarget.value})} />
        </FormControl>
        <FormControl>
          <FormLabel component="legend">
            password
          </FormLabel>
          <TextField onChange={(p) => this.setState({password: p.currentTarget.value})} />
        </FormControl>
        <Button variant="contained">
          Log In
        </Button>
        <Button onClick={this.callSubmit} />
      </Box>
    );
  }

};