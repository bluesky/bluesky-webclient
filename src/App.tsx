import React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { IApplicationState } from './store';
import { getOverview, getQueuedPlans } from './planactions';
import { RouteComponentProps } from 'react-router-dom';
import { IPlan, IPlanObject } from './queueserver';
import { PlanList } from './PlanList';
import { HistoricalPlanList } from './HistoricalPlanList';
import { CurrentPlan } from './CurrentPlan';
import { clearQueue, modifyEnvironment, modifyQueue } from './planactions';
import { Grid } from '@material-ui/core';


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
  clearQueue: typeof clearQueue;
  modifyEnvironment: typeof modifyEnvironment;
  modifyQueue: typeof modifyQueue;
  loadingPlan: boolean;
  plan: IPlan;
  loadingPlans: boolean;
  plans: IPlanObject[];
}

class App extends React.Component<IProps> {
  render() {
      return (
        <Container maxWidth="xl">
          <Box width="80vw" height="2vh"></Box>
          <Grid container spacing={5} direction="row" justify="center">
            <Grid item justify="center" spacing={10} xs={3}>    
              <PlanList clearQueue={this.props.clearQueue} plans={this.props.plans}
              modifyEnvironment={this.props.modifyEnvironment} modifyQueue={this.props.modifyQueue}> </PlanList>
            </Grid>
            <Grid item justify="center" spacing={10} xs={5}>
              <CurrentPlan plans={this.props.plans}></CurrentPlan> 
            </Grid>
            <Grid item justify="center" spacing={10} xs={3}>    
              <HistoricalPlanList plans={this.props.plans.slice(1, this.props.plans.length)}> </HistoricalPlanList>
            </Grid>   
          </Grid>
          <Copyright/>
        </Container>
      )
  }
/*
<Card>
  <CardContent>
    <Typography align="center" variant="h5" component="h1" gutterBottom>
      This is the future of all your Bluesky acquisition dreams on the web!
    </Typography>
  </CardContent>
</Card>
*/
  
  componentDidMount() {
      this.props.getOverview();
      setInterval(this.props.getQueuedPlans, 1000);
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
    clearQueue: () => dispatch(clearQueue()),
    getQueuedPlans: () => dispatch(getQueuedPlans())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
