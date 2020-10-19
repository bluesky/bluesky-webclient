import React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import StarIcon from '@material-ui/icons/Star';
import ListItemText from '@material-ui/core/ListItemText';
import { IApplicationState } from './store';
import { getOverview, getQueuedPlans } from './planactions';
import { RouteComponentProps } from 'react-router-dom';
import { IPlan, IPlanObject } from './queueserver';


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

interface IProps extends RouteComponentProps {
  getOverview: typeof getOverview;
  getQueuedPlans: typeof getQueuedPlans;
  loadingPlan: boolean;
  plan: IPlan;
  loadingPlans: boolean;
  plans: IPlanObject[];
}

class App extends React.Component<IProps> {
  render() {
      return (
        <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            This is the future of all your Bluesky acquisition dreams on the web!
          </Typography>
          <Typography variant="h6" component="h4" gutterBottom>
            There are {this.props.plan.plans_in_queue} plans in the queue.
            The running plan uid is '{this.props.plan.running_plan_uid}'
          </Typography>
          <div>
            <List>
              {this.props.plans.map(planObject => (
                  <ListItem divider={true} key={planObject.plan_uid}>
                      <ListItemIcon>
                        <StarIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={planObject.plan_uid.substr(0,8)}
                        secondary={planObject.name}
                      />
                  </ListItem>
              ))}
            </List>
          </div>
          <Copyright />
        </Box>
      </Container>
      )
  }

  componentDidMount() {
      this.props.getOverview();
      this.props.getQueuedPlans();
  }

}

const mapStateToProps = (store: IApplicationState) => {
  return {
    loadingPlan: store.plan.planLoading,
    plan: store.plan.plan,
    loadingPlans: store.plans.plansLoading,
    plans: store.plans.plans
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getOverview: () => dispatch(getOverview()),
    getQueuedPlans: () => dispatch(getQueuedPlans())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
