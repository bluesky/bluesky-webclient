import React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { IApplicationState } from './store';
import { getOverview, getQueuedPlans, getHistoricalPlans,
         clearQueue, deletePlan, modifyEnvironment, modifyQueue, submitEditedPlan, submitExcel } from './planactions';
import { RouteComponentProps } from 'react-router-dom';
import { IPlan, IPlanObject, IHistoricalPlan } from './queueserver';
import { PlanList } from './PlanList';
import { HistoricalPlanList } from './HistoricalPlanList';
import { CurrentPlan } from './CurrentPlan';
import { Grid } from '@material-ui/core';
import { PlanDrawer } from './PlanDrawer';

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
  getHistoricalPlans: typeof getHistoricalPlans;
  clearQueue: typeof clearQueue;
  deletePlan: typeof deletePlan;
  modifyEnvironment: typeof modifyEnvironment;
  modifyQueue: typeof modifyQueue;
  loadingPlan: boolean;
  plan: IPlan;
  loadingPlans: boolean;
  plans: IPlanObject[];
  loadingHistoricalPlans: boolean;
  historicalPlans: IHistoricalPlan[];
  previews: {[uid: string]: string[];};
}

interface IState {
  selectedPlan: string;
  editItemUid: string;
  editKwargs: {[name: string]: (string|number)[]};
  onPlanChange: (selectedPlan: string) => void;
  planParam: number;
  onPlanParamChange: (planParam: number) => void;
  env: string;
  onEnvChange: (env: string) => void;
  queue: string;
  onQueueChange: (queue: string) => void;
  files: File[];
}

class App extends React.Component<IProps> {

  public constructor(props: IProps) {
    super(props);
    this.state = {
      selectedPlan: "",
      editItemUid: "",
      editKwargs: {},
      onPlanChange: this.handleSelectPlan,
      planParam: 10,
      onPlanParamChange: this.handlePlanParamChange,
      env: "Open",
      onEnvChange: this.handleEnvChange,
      queue: "Start",
      onQueueChange: this.handleQueueChange,
      files: [],
    };
  }

  render() {
      return (
        <Container maxWidth="xl">
          <Box width="80vw" height="2vh"></Box>
          <Grid container spacing={5} direction="row" justify="center">
            <Grid item justify="center" spacing={10} xs={3}>    
              <PlanList editPlan={this.editPlan} deletePlan={this.props.deletePlan} 
                        clearQueue={this.props.clearQueue} plans={this.props.plans}
                        modifyEnvironment={this.props.modifyEnvironment} modifyQueue={this.props.modifyQueue}
                        editItemUid={""} editable={false}> </PlanList>
            </Grid>
            <Grid item justify="center" spacing={10} xs={5}>
              <CurrentPlan plans={this.props.plans}></CurrentPlan> 
            </Grid>
            <Grid item justify="center" spacing={10} xs={3}>    
              <HistoricalPlanList history={this.props.historicalPlans}> </HistoricalPlanList>
            </Grid>   
          </Grid>
          <Copyright/>
          <PlanDrawer/>
        </Container>
      )
  }

  private handleSelectPlan = (selectedPlan: string) => {
      this.setState({ selectedPlan });
      this.setState({ editItemUid: ""});
  };

  private handlePlanParamChange = (planParam: number) => {
      this.setState({ planParam });
  };

  private handleEnvChange = (env: string) => {
      this.setState({ env });
  };

  private handleQueueChange = (queue: string) => {
      this.setState({ queue });
  };

  handleChange(files: File[]){
    this.setState({
      files: files
    });
  }

  private editPlan = (itemUid: string, planType: string, kwargs: {[name: string]: (string|number)[]}) => {
      this.setState({editItemUid: itemUid});
      this.setState({selectedPlan: planType});
      this.setState({editKwargs: kwargs});
  }

  componentDidMount() {
      this.props.getOverview();
      setInterval(this.props.getQueuedPlans, 1000);
      setInterval(this.props.getHistoricalPlans, 1000);
  }

}

const mapStateToProps = (store: IApplicationState) => {
  return {
    loadingPlan: store.plan.planLoading,
    plan: store.plan.plan,
    loadingPlans: store.plans.plansLoading,
    plans: store.plans.plans,
    loadingHistoricalPlans: store.historicalPlans.plansLoading,
    historicalPlans: store.historicalPlans.historicalPlans,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getOverview: () => dispatch(getOverview()),
    clearQueue: () => dispatch(clearQueue()),
    deletePlan: () => dispatch(deletePlan()),
    modifyEnvironment: () => dispatch(modifyEnvironment()),
    modifyQueue: () => dispatch(modifyQueue()),
    getQueuedPlans: () => dispatch(getQueuedPlans()),
    getHistoricalPlans: () => dispatch(getHistoricalPlans()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);