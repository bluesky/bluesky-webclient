import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import {getOverview, IPlan} from './queueserver'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://blueskyproject.io/">
        Bluesky Project
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

interface IState {
  plan: IPlan;
}

class App extends React.Component<{}, IState> {
  public constructor() {
    super({});
    this.state = {
        plan: {
            manager_state: "undefined",
            msg: "",
            plans_in_queue: 0,
            running_plan_uid: "",
            worker_environment_exists: false
        }
    };
  }

  render() {
      return (
        <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            This is the future of all your Bluesky acquisition dreams on the web!
          </Typography>
          <Typography variant="h6" component="h4" gutterBottom>
            There are {this.state.plan.plans_in_queue} plans in the queue.
            The running plan uid is '{this.state.plan.running_plan_uid}'
          </Typography>
          <Copyright />
        </Box>
      </Container>
      )
  }

  componentDidMount() {
      getOverview()
          .then((data) => {
              this.setState({ plan: data })
              console.log(data)
          })
          .catch(console.log)
  }
}

export default App;