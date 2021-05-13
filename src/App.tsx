import React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { Link as RouterLink, RouteComponentProps } from 'react-router-dom'
import { IApplicationState } from './store';
import { getOverview, getQueuedPlans, getHistoricalPlans,
         clearQueue, deletePlan, modifyEnvironment, modifyQueue, submitEditedPlan, submitExcel, submitPlan, getAllowedPlans } from './planactions';
import { IPlanObject, IHistoricalPlan, IAllowedPlans, ISubmitPlanObject } from './queueserver';
import { PlanList } from './PlanList';
import { HistoricalPlanList } from './HistoricalPlanList';
import { CurrentPlan } from './CurrentPlan';
import { AppBar, Avatar, Grid, IconButton, Popover, Toolbar } from '@material-ui/core';
import { PlanDrawer } from './PlanDrawer';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import logo from './assets/bluesky-logo.svg'
import bmm_logo from './assets/BMM_Logo.png'
import { PlanFormContainer } from './PlanFormContainer';
import nsls2Background from "./assets/NSLS-II_Aerial_Filter.png"
import { Height } from '@material-ui/icons';


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
  submitPlan: typeof submitPlan;
  submitEditedPlan: typeof submitEditedPlan;
  submitExcel: (files: File[]) => void,
  getOverview: typeof getOverview;
  getQueuedPlans: typeof getQueuedPlans;
  getHistoricalPlans: typeof getHistoricalPlans;
  clearQueue: typeof clearQueue;
  deletePlan: typeof deletePlan;
  modifyEnvironment: typeof modifyEnvironment;
  modifyQueue: typeof modifyQueue;
  getAllowedPlans: typeof getAllowedPlans;
  allowedPlans: IAllowedPlans;
  loading: boolean;
  loadingPlan: boolean;
  plan: IPlanObject;
  loadingPlans: boolean;
  plans: IPlanObject[];
  loadingHistoricalPlans: boolean;
  historicalPlans: IHistoricalPlan[];
  //previews: {[uid: string]: string[];};  // Need to add map dispatch to props, or map state to props
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
  drawerOpen: boolean
}


class App extends React.Component<IProps, IState> {

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
      drawerOpen: false,
    };

    const Background = {
      backgroundImage: 'url(' + nsls2Background + ')',
      height: '100%'
      }
  }
/*
                  <IconButton color="inherit" aria-label="menu" component={RouterLink} to="/user">Logout</IconButton>
                  <Avatar>BR</Avatar>
*/

  render() {
      return (
        <div style={{backgroundImage: 'url(' + nsls2Background + ')'}}>
          <div>
              <AppBar position="absolute" style={{zIndex: 2000}}>
                <Toolbar>
                  <Box display='flex' flexGrow={1}>
                    <IconButton color="inherit" aria-label="menu" onClick={this.openDrawer.bind(this)}>
                      Actions
                    </IconButton>
                    <img src={logo} alt="logo" style={{position: 'absolute', 
                                                        height: '100%',
                                                        left: '50%', 
                                                        top: '50%', 
                                                        transform: 'translate(-50%, -50%)'}}/>
                  </Box>

                  <Box width="3vw">
                      <img src={bmm_logo} alt="bmm_logo" style={{position: 'absolute', 
                                                                height: '100%',
                                                                left: '97%', 
                                                                top: '50%', 
                                                                transform: 'translate(-50%, -50%)'}}/>
                  </Box>
                </Toolbar>
              </AppBar>
          </div>
          <Container maxWidth="xl" >
            <Box width="80vw" height="7vh"></Box>
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
            <PlanDrawer open={this.state.drawerOpen} selectedPlan={this.state.selectedPlan} 
                        handleSelect={this.handleSelectPlan} plans={this.props.allowedPlans} 
                        submitExcel={this.props.submitExcel}/>
            <Popover 
                  anchorReference="anchorPosition"
                  anchorPosition={{ top: 200, left: 400 }}
                  anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={true}>
                      Hello
            </Popover>
          </Container>
        </div>

      )
  }

  private handleSelectPlan = (selectedPlan: string) => {
      this.openDrawer()
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

  private openDrawer(){
    this.setState({
      drawerOpen: !this.state.drawerOpen
    })
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
      this.props.getAllowedPlans();
  }

}

const mapStateToProps = (store: IApplicationState) => {
  return {
    loading: store.submitted.planLoading,
    loadingPlan: store.plan.planLoading,
    //plan: store.plan.plan,
    plan: store.submitted.plan,
    loadingPlans: store.plans.plansLoading,
    plans: store.plans.plans,
    loadingHistoricalPlans: store.historicalPlans.plansLoading,
    historicalPlans: store.historicalPlans.historicalPlans,
    allowedPlans: store.allowedPlans.allowedPlans,
  };
};


const mapDispatchToProps = (dispatch: any) => {
  return {
    modifyEnvironment: (opId: number) => dispatch(modifyEnvironment(opId)),
    modifyQueue: (opId: number) => dispatch(modifyQueue(opId)),
    submitPlan: (planId: number, param: number) => dispatch(submitPlan(planId, param)),
    submitExcel: (files: File[]) => dispatch(submitExcel(files)),
    submitEditedPlan: (itemUid: string, planId: number, param: number) => dispatch(submitEditedPlan(itemUid, planId, param)),
    getOverview: () => dispatch(getOverview()),
    clearQueue: () => dispatch(clearQueue()),
    deletePlan: () => dispatch(deletePlan()),
    getQueuedPlans: () => dispatch(getQueuedPlans()),
    getHistoricalPlans: () => dispatch(getHistoricalPlans()),
    getAllowedPlans: () => dispatch(getAllowedPlans()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);