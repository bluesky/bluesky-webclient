import React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { IApplicationState } from './store';
import { submitPlan, modifyEnvironment, modifyQueue } from './planactions';
import { clearQueue } from './planactions';
import { IPlanObject, EnvOps, QueueOps } from './queueserver';
import { getOverview, getQueuedPlans } from './planactions';
import { RouteComponentProps } from "react-router-dom";
import { Grid } from '@material-ui/core';
import { PlanList } from './plan_list';
import { CurrentPlan } from './current_plan';
import { AvailablePlans } from './available_plans';
import { PlanForm } from './plan_form';

type RouteParams = { id: string, uid: string };

interface Props extends RouteComponentProps<RouteParams> { }

interface IProps extends RouteComponentProps {
    submitPlan: typeof submitPlan;
    modifyEnvironment: typeof modifyEnvironment;
    modifyQueue: typeof modifyQueue;
    clearQueue: typeof clearQueue;
    getOverview: typeof getOverview;
    getQueuedPlans: typeof getQueuedPlans;
    loading: boolean;
    plan: IPlanObject;
    plans: IPlanObject[];
}

interface IState {
    planId: number;
    onPlanChange: (planId: number) => void;
    planParam: number;
    onPlanParamChange: (planParam: number) => void;
    env: string;
    onEnvChange: (env: string) => void;
    queue: string;
    onQueueChange: (queue: string) => void;
}

class AcquirePage extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props);
        this.state = {
          planId: -1,
          onPlanChange: this.handlePlanChange,
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
                <Grid item justify="center" spacing={10} xs={3}>    
                  <AvailablePlans plans={['count', 'scan']}> </AvailablePlans>
                </Grid>
                <Grid item justify="center" spacing={10} xs={5}> 
                  <PlanForm name='count'> </PlanForm>   
                </Grid>   
                <Grid item justify="center" spacing={10} xs={3}>
                  <PlanList plans={this.props.plans}></PlanList> 
                </Grid>
            </Grid>
          </Container>

        )
    }

/*
          <Box my={4}>
              <Typography variant="h6" component="h1" gutterBottom>
              <div>
                  loading: {this.props.loading}.
              </div>
            </Typography>
            <FormControl>
                <InputLabel id="demo-simple-select-label">type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={this.state.planId}
                    onChange={this.handleChange}
                >
                    <MenuItem value={0}>count</MenuItem>
                    <MenuItem value={1}>scan</MenuItem>
                </Select>
                {}
                {(() => {
                    switch (this.state.planId) {
                        case 0:
                            return <TextField
                                id="filled-number"
                                label="num"
                                type="number"
                                value={this.state.planParam}
                                onChange={this.handleParamChange}
                            />;
                        case 1:
                            return <TextField
                                id="filled-number"
                                label="step"
                                type="number"
                                value={this.state.planParam}
                                onChange={this.handleParamChange}
                            />;
                        default:
                            return <p>Make a choice!</p>;
                    }
                })()}
            </FormControl>
            <Tooltip title="Submit the plan to the queue">
              <Button variant="contained" onClick={this.handleSubmitClick}>Submit</Button>
            </Tooltip>
            <div><pre>The pretty printed JSON:<br />
                { JSON.stringify(this.props.plan, null, 2) }</pre></div>
          </Box>
          <Box my={4}>
              <Button variant="contained" onClick={this.handleEnvClick}>{this.state.env} environment</Button>
              <Button variant="contained" onClick={this.handleQueueClick}>{this.state.queue} queue</Button>

          </Box>
        </Container>
*/

    private handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        this.state.onPlanChange(event.target.value as number);
    };

    private handlePlanChange = (planId: number) => {
        this.setState({ planId });
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
        this.props.submitPlan(this.state.planId, this.state.planParam);
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
    }
}

const mapStateToProps = (store: IApplicationState) => {
    return {
      loading: store.submitted.planLoading,
      plan: store.submitted.plan,
      loadingPlans: store.plans.plansLoading,
      plans: store.plans.plans
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
      modifyEnvironment: (opId: number) => dispatch(modifyEnvironment(opId)),
      modifyQueue: (opId: number) => dispatch(modifyQueue(opId)),
      submitPlan: (planId: number, param: number) => dispatch(submitPlan(planId, param)),
      clearQueue: () => dispatch(clearQueue()),
      getOverview: () => dispatch(getOverview()),
      getQueuedPlans: () => dispatch(getQueuedPlans())
    };
};

  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AcquirePage);
