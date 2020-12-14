import React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { IApplicationState } from './store';
import { submitPlan, modifyEnvironment, modifyQueue, getAllowedPlans } from './planactions';
import { clearQueue } from './planactions';
import { IPlanObject, EnvOps, QueueOps, IAllowedPlans } from './queueserver';
import { getOverview, getQueuedPlans } from './planactions';
import { RouteComponentProps } from "react-router-dom";
import { FormControlLabel, Grid } from '@material-ui/core';
import { PlanList } from './PlanList';
import { CurrentPlan } from './CurrentPlan';
import { AvailablePlans } from './AvailablePlans';
import { PlanForm } from './PlanForm';

type RouteParams = { id: string, uid: string };

interface Props extends RouteComponentProps<RouteParams> { }

interface IProps extends RouteComponentProps {
    submitPlan: typeof submitPlan;
    modifyEnvironment: typeof modifyEnvironment;
    modifyQueue: typeof modifyQueue;
    clearQueue: typeof clearQueue;
    getOverview: typeof getOverview;
    getQueuedPlans: typeof getQueuedPlans;
    getAllowedPlans: typeof getAllowedPlans;
    loading: boolean;
    plan: IPlanObject;
    plans: IPlanObject[];
    allowedPlans: IAllowedPlans;
}

interface IState {
    selectedPlan: string;
    onPlanChange: (selectedPlan: string) => void;
    planParam: number;
    onPlanParamChange: (planParam: number) => void;
    env: string;
    onEnvChange: (env: string) => void;
    queue: string;
    onQueueChange: (queue: string) => void;
}

class BmmPlansPage extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props);
        this.state = {
          selectedPlan: "",
          onPlanChange: this.handleSelectPlan,
          planParam: 10,
          onPlanParamChange: this.handlePlanParamChange,
          env: "Open",
          onEnvChange: this.handleEnvChange,
          queue: "Start",
          onQueueChange: this.handleQueueChange,
        };
      }

    render() {
        return (
          <Container maxWidth="xl">
            <Box width="80vw" height="2vh"></Box>
            <Grid container spacing={5} direction="row" justify="center">
                
                <Grid item justify="center" spacing={10} xs={5}>
                    <Typography align="center" variant="h5" component="h1" gutterBottom>
                        XAFS Plan
                    </Typography>
                    <form noValidate autoComplete="off">
                        <div>
                            <TextField required id="element" label="Element" defaultValue="Au" /> &nbsp;
                            <TextField required id="edge" label="Edge" defaultValue="K" />
                        </div>
                        <FormControl fullWidth>
                            <TextField required id="sample" label="Sample" />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField id="prop" label="Preparation" />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField id="comment" label="Comment" multiline rows={4} />
                        </FormControl>
                        <div>
                            <TextField required id="nscans" label="Number of scans" type="number" defaultValue="3" /> &nbsp;
                            <TextField required id="start" label="Start" type="number" defaultValue="1" />
                        </div><br />
                        <FormControl>
                            <FormLabel component="legend">Mode</FormLabel>
                            <RadioGroup row id="mode" aria-label="Mode" defaultValue="transmission">
                                <FormControlLabel value="transmission" control={<Radio />} label="Transmission" />
                                <FormControlLabel value="fluorescence" control={<Radio />} label="Fluorescence" />
                                <FormControlLabel value="both" control={<Radio />} label="Both" />
                            </RadioGroup>
                        </FormControl><br />
                        <FormControl>
                            <FormLabel component="legend">Regions:</FormLabel>
                        </FormControl><br />
                        <div>
                            <FormLabel component="legend">Bounds:</FormLabel>
                            <TextField required id="b0" style={{width: 60}} defaultValue="-200" />&nbsp;
                            <TextField required id="b1" style={{width: 60}} defaultValue="-30" />&nbsp;
                            <TextField required id="b2" style={{width: 60}} defaultValue="-10" />&nbsp;
                            <TextField required id="b3" style={{width: 60}} defaultValue="15.5" />&nbsp;
                            <TextField required id="b4" style={{width: 60}} defaultValue="15k" />
                        </div>
                        <div>
                            <FormLabel component="legend">Steps:</FormLabel>
                            <TextField required id="b0" style={{width: 60}} defaultValue="10" />&nbsp;
                            <TextField required id="b1" style={{width: 60}} defaultValue="2.0" />&nbsp;
                            <TextField required id="b2" style={{width: 60}} defaultValue="0.3" />&nbsp;
                            <TextField required id="b4" style={{width: 60}} defaultValue="0.05k" />
                        </div>
                        <div>
                            <FormLabel component="legend">Times:</FormLabel>
                            <TextField required id="b0" style={{width: 60}} defaultValue="0.5" />&nbsp;
                            <TextField required id="b1" style={{width: 60}} defaultValue="0.5" />&nbsp;
                            <TextField required id="b2" style={{width: 60}} defaultValue="0.5" />&nbsp;
                            <TextField required id="b4" style={{width: 60}} defaultValue="0.25k" />
                        </div><br />
                        <Button variant="contained">Submit</Button>
                    </form>
                </Grid>   
                <Grid item justify="center" spacing={10} xs={3}>
                  <PlanList clearQueue={this.props.clearQueue} plans={this.props.plans}></PlanList> 
                </Grid>
            </Grid>
          </Container>
        )
    }

    private handleSelectPlan = (selectedPlan: string) => {
        this.setState({ selectedPlan });
    };

    private handleParamChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        this.state.onPlanParamChange(event.target.value as number);
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

    private handleSubmitClick = () => {
        this.props.submitPlan(this.state.selectedPlan, this.state.planParam);
    }

    private handleEnvClick = () => {
        if (this.state.env === "Open") {
            this.props.modifyEnvironment(EnvOps.open);
            this.state.onEnvChange("Close");
        }
        else {
            this.props.modifyEnvironment(EnvOps.close);
            this.state.onEnvChange("Open");
        }
    }

    private handleQueueClick = () => {
        if (this.state.queue === "Start") {
            this.props.modifyQueue(QueueOps.start);
            this.state.onQueueChange("Stop");
        }
        else {
            this.props.modifyQueue(QueueOps.stop);
            this.state.onQueueChange("Start");
        }
    }

    private handleClearQueue = () => {
        this.props.clearQueue();
    }
    componentDidMount() {
        this.props.getOverview();
        this.props.getQueuedPlans();
        //this.props.submitPlan();
        this.props.getAllowedPlans();
    }
}

const mapStateToProps = (store: IApplicationState) => {
    return {
      loading: store.submitted.planLoading,
      plan: store.submitted.plan,
      loadingPlans: store.plans.plansLoading,
      plans: store.plans.plans,
      allowedPlans: store.allowedPlans.allowedPlans,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
      modifyEnvironment: (opId: number) => dispatch(modifyEnvironment(opId)),
      modifyQueue: (opId: number) => dispatch(modifyQueue(opId)),
      submitPlan: (planId: number, param: number) => dispatch(submitPlan(planId, param)),
      clearQueue: () => dispatch(clearQueue()),
      getOverview: () => dispatch(getOverview()),
      getQueuedPlans: () => dispatch(getQueuedPlans()),
      getAllowedPlans: () => dispatch(getAllowedPlans()),
    };
};

  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BmmPlansPage);
