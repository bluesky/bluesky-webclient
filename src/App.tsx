import React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { IApplicationState } from './store';
import { getStatus, getQueuedPlans, getHistoricalPlans,
         clearQueue, deletePlan, modifyEnvironment, modifyQueue, submitEditedPlan, submitExcel, submitPlan, getAllowedPlans, getConsoleOutput, getActiveRuns } from './planactions';
import { IPlanObject, IHistoricalPlan, IAllowedPlans, IStatus, IConsoleOutput, IActiveRuns } from './queueserver';
import { PlanList } from './PlanList';
import { HistoricalPlanList } from './HistoricalPlanList';
import { CurrentPlan } from './CurrentPlan';
import { AppBar, Grid, IconButton, Popover, Toolbar } from '@material-ui/core';
import { PlanDrawer } from './PlanDrawer';
import { ConsoleDrawer } from './ConsoleDrawer';
import { PlanFormContainer } from './PlanFormContainer';
import nsls2Background from "./assets/nsls2_background.png";
import logo from './assets/bluesky-logo.svg';
import amxTab from './assets/amx_tab.png';
import bmmTab from './assets/bmm_tab.png';
import chxTab from './assets/chx_tab.png';
import cmsTab from './assets/cms_tab.png';
import csxTab from './assets/csx_tab.png';
import esmTab from './assets/esm_tab.png';
import fisTab from './assets/fis_tab.png';
import fmxTab from './assets/fmx_tab.png';
import fxiTab from './assets/fxi_tab.png';
import hexTab from './assets/hex_tab.png';
import iosTab from './assets/ios_tab.png';
import isrTab from './assets/isr_tab.png';
import lixTab from './assets/lix_tab.png';
import metTab from './assets/met_tab.png';
import nyxTab from './assets/nyx_tab.png';
import pdfTab from './assets/pdf_tab.png';
import qasTab from './assets/qas_tab.png';
import sixTab from './assets/six_tab.png';
import smiTab from './assets/smi_tab.png';
import srxTab from './assets/srx_tab.png';
import sst1Tab from './assets/sst1_tab.png';
import sst2Tab from './assets/sst2_tab.png';
import tesTab from './assets/tes_tab.png';
import xfmTab from './assets/xfm_tab.png';
import xfpTab from './assets/xfp_tab.png';
import xpdTab from './assets/xpd_tab.png';
import issTab from './assets/iss_tab.png';
import ixsTab from './assets/ixs_tab.png';

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

interface IProps {
  submitPlan: typeof submitPlan;
  submitEditedPlan: typeof submitEditedPlan;
  submitExcel: (files: File[]) => void,
  getStatus: typeof getStatus;
  getConsoleOutput: typeof getConsoleOutput;
  getQueuedPlans: typeof getQueuedPlans;
  getHistoricalPlans: typeof getHistoricalPlans;
  clearQueue: typeof clearQueue;
  deletePlan: typeof deletePlan;
  modifyEnvironment: typeof modifyEnvironment;
  modifyQueue: typeof modifyQueue;
  getAllowedPlans: typeof getAllowedPlans;
  getActiveRuns: typeof getActiveRuns;
  allowedPlans: IAllowedPlans;
  loading: boolean;
  loadingPlan: boolean;
  plan: IPlanObject;
  loadingPlans: boolean;
  plans: IPlanObject[];
  loadingHistoricalPlans: boolean;
  historicalPlans: IHistoricalPlan[];
  status: IStatus;
  console: IConsoleOutput;
  activeRuns: IActiveRuns;
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
  actionDrawerOpen: boolean;
  consoleDrawerOpen: boolean;
  planFormVisible: boolean;
}

class App extends React.Component<IProps, IState> {

  tabs: {[name: string]: any} = {
    'amx': amxTab,
    'bmm': bmmTab,
    'chx': chxTab,
    'cms': cmsTab,
    'csx': csxTab,
    'esm': esmTab,
    'fis': fisTab,
    'fmx': fmxTab,
    'fxi': fxiTab,
    'hex': hexTab,
    'ios': iosTab,
    'isr': isrTab,
    'iss': issTab,
    'ixs': ixsTab,
    'lix': lixTab,
    'met': metTab,
    'nyx': nyxTab,
    'pdf': pdfTab,
    'qas': qasTab,
    'six': sixTab,
    'smi': smiTab,
    'srx': srxTab,
    'sst1': sst1Tab,
    'sst2': sst2Tab,
    'tes': tesTab,
    'xfm': xfmTab,
    'xfp': xfpTab,
    'xpd': xpdTab,
    'default': pdfTab
  }

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
      actionDrawerOpen: false,
      consoleDrawerOpen: false,
      planFormVisible: false,
    };

    const Background = {
      backgroundImage: 'url(' + nsls2Background + ')',
      height: '100%'
      }
  }

  render() {
      return (
        <div style={{height: '100vh',
                    backgroundImage: 'url(' + nsls2Background + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
          <div>
              <AppBar position="absolute" style={{zIndex: 2000}}>
                <Toolbar>
                  <Box display='flex' flexGrow={1}>
                    <IconButton color="inherit" aria-label="menu" onClick={this.toggleActionDrawer.bind(this)}>
                      Actions
                    </IconButton>
                    <IconButton color="inherit" aria-label="menu" onClick={this.toggleConsoleDrawer.bind(this)}>
                      Console
                    </IconButton>
                    <img src={logo} alt="logo" style={{position: 'absolute', 
                                                        height: '100%',
                                                        left: '50%', 
                                                        top: '50%', 
                                                        transform: 'translate(-50%, -50%)'}}/>
                  </Box>

                  <Box width="3vw">
                      <img src={this.tabs[process.env.REACT_APP_BEAMLINE || 'default']} alt="tab" style={{position: 'absolute', 
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
                          editItemUid={""} editable={true} status={this.props.status}> </PlanList>
              </Grid>
              <Grid item justify="center" spacing={10} xs={5}>
                <CurrentPlan allowedPlans={this.props.allowedPlans} plans={this.props.plans} activeRuns={this.props.activeRuns}></CurrentPlan> 
              </Grid>
              <Grid item justify="center" spacing={10} xs={3}>    
                <HistoricalPlanList history={this.props.historicalPlans}> </HistoricalPlanList>
              </Grid>   
            </Grid>
            <Copyright/>
            <PlanDrawer open={this.state.actionDrawerOpen} selectedPlan={this.state.selectedPlan} 
                        handleSelect={this.handleSelectPlan} plans={this.props.allowedPlans}/>
            <ConsoleDrawer open={this.state.consoleDrawerOpen} console={this.props.console}/>
          </Container>
            <Popover 
                    anchorOrigin={{
                      vertical: 'center',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'center',
                      horizontal: 'center',
                    }}
                    PaperProps={{
                      style: { width: '50%' },
                    }}
                    BackdropProps={{ invisible: false }}
                    open={this.state.planFormVisible}>
                      <PlanFormContainer submitEditedPlan={this.props.submitEditedPlan} submitPlan={this.props.submitPlan} 
                                        name={this.state.selectedPlan} allowedPlans={this.props.allowedPlans}
                                        itemUid={this.state.editItemUid} editKwargs={this.state.editKwargs}
                                        hideForm={this.hidePlanForm.bind(this)}> </PlanFormContainer> 
            </Popover>
        </div>
      )
  }


  private handleSelectPlan = (selectedPlan: string) => {
      this.closeActionDrawer()
      this.showPlanForm()
      this.setState({ selectedPlan: selectedPlan });  // Check this line
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

  private toggleActionDrawer(){
    this.setState({
      actionDrawerOpen: !this.state.actionDrawerOpen
    })
    if (this.state.consoleDrawerOpen){
      this.setState({
        consoleDrawerOpen: false
      })
    }
  }

  private toggleConsoleDrawer(){
    this.setState({
      consoleDrawerOpen: !this.state.consoleDrawerOpen
    })
    if (this.state.actionDrawerOpen){
      this.setState({
        actionDrawerOpen: false
      })
    }
  }

  private closeActionDrawer(){
    this.setState({
      actionDrawerOpen: false
    })
  }

  private showPlanForm(){
    this.setState({
      planFormVisible: true
    })
  }

  private hidePlanForm(){
    this.setState({
      planFormVisible: false
    })
  }

  private editPlan = (itemUid: string, planType: string, kwargs: {[name: string]: (string|number)[]}) => {
      this.setState({editItemUid: itemUid});
      this.setState({selectedPlan: planType});
      this.setState({editKwargs: kwargs});
      this.showPlanForm()
  }

  componentDidMount() {
      setInterval(this.props.getStatus, 500);
      //setInterval(this.props.getActiveRuns, 1000);
      setInterval(this.props.getConsoleOutput, 1000);
      this.props.getAllowedPlans();
  }
}

const mapStateToProps = (store: IApplicationState) => {
  return {
    loading: store.submitted.planLoading,
    loadingPlan: store.plan.planLoading,
    plan: store.submitted.plan,
    loadingPlans: store.plans.plansLoading,
    plans: store.plans.plans,
    loadingHistoricalPlans: store.historicalPlans.plansLoading,
    historicalPlans: store.historicalPlans.historicalPlans,
    allowedPlans: store.allowedPlans.allowedPlans,
    status: store.status,
    console: store.console,
    activeRuns: store.activeRuns,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    modifyEnvironment: (opId: number) => dispatch(modifyEnvironment(opId)),
    modifyQueue: (opId: number) => dispatch(modifyQueue(opId)),
    submitPlan: (planId: number, param: number) => dispatch(submitPlan(planId, param)),
    submitExcel: (files: File[]) => dispatch(submitExcel(files)),
    submitEditedPlan: (itemUid: string, planId: number, param: number) => dispatch(submitEditedPlan(itemUid, planId, param)),
    getStatus: () => dispatch(getStatus()),
    getConsoleOutput: () => dispatch(getConsoleOutput()),
    clearQueue: () => dispatch(clearQueue()),
    deletePlan: () => dispatch(deletePlan()),
    getQueuedPlans: () => dispatch(getQueuedPlans()),
    getHistoricalPlans: () => dispatch(getHistoricalPlans()),
    getAllowedPlans: () => dispatch(getAllowedPlans()),
    getActiveRuns: () => dispatch(getActiveRuns()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
