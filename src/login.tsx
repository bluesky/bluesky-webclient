import React from 'react';
import { useHistory } from 'react-router';
import { Button, Box, TextField, FormLabel, ListItem, List, Typography } from '@material-ui/core';
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
    // Source: https://github.com/ankushjain2001/fastapi-react-mongodb/blob/master/frontend/src/auth/login.js
    //let history = useHistory();

    // Prevents page reload on wrongs creds
    e.preventDefault();
    this.setState({error: ""})
    try {
      const data = await auth.login(this.state.email, this.state.password);
      // Executes only when there are no 400 and 500 errors, else they are thrown as errors
      // Callbacks can be added here
      if (data) {
        //history.push('/');
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
        <ListItem style={{justifyContent:'center'}}>
          <Typography variant="h5">
            Login
          </Typography>
        </ListItem>
        <Box border={1}>
          <List>
            <ListItem style={{justifyContent:'center'}}>
              <TextField label="email" variant="outlined" onChange={(e) => this.setState({email: e.currentTarget.value})} />
            </ListItem>
            <ListItem style={{justifyContent:'center'}}>
              <TextField label="password" variant="outlined" onChange={(p) => this.setState({password: p.currentTarget.value})} />
            </ListItem>
            <ListItem style={{justifyContent:'center'}}>
              <Button variant="contained" onClick={this.callSubmit.bind(this)}>
                Log In
              </Button>
            </ListItem>
          </List>
        </Box>
      </Box>
    );
  }

};