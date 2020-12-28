// Source: https://github.com/ankushjain2001/fastapi-react-mongodb/blob/master/frontend/src/auth/login.js

import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Button, FormControl, FormControlLabel, Box, TextField } from '@material-ui/core';
import auth from './auth';

export const Login = () => {
  // History hook
  const history = useHistory();

  // User information hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Function to call submit
  const callSubmit = async (e) => {
    // Prevents page reload on wrongs creds
    e.preventDefault();
    setError('');
    try {
      const data = await auth.login(email, password);
      // Executes only when there are no 400 and 500 errors, else they are thrown as errors
      // Callbacks can be added here
      if (data) {
        history.push('/');
      }
    } 
    catch (err) {
      if (err instanceof Error) {
        // Handle errors thrown from frontend
        setError(err.message);
      } 
      else {
        // Handle errors thrown from backend
        if (err === 'LOGIN_BAD_CREDENTIALS') {
          setError('Incorrect credentials');
        }
        else {
          setError('Error occured in the API.');
        }
      }
    }
  };

  return (
      <Box>
        <FormControl>
            <FormControlLabel value="email" /> 
            <TextField onChange={(e) => setEmail(e.currentTarget.value)} />
        </FormControl>
        <FormControl>
            <FormControlLabel value="password" />
            <TextField onChange={(p) => setPassword(p.currentTarget.value)} />
        </FormControl>
        <Button variant="primary" type="submit" block>
          Log In
        </Button>
        <Button onClick={callSubmit} />
      </Box>
  );
};