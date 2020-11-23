import React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { IApplicationState } from './store';
import { submitPlan, modifyEnvironment, modifyQueue, getAllowedPlans } from './planactions';
import { clearQueue } from './planactions';
import { IPlanObject, EnvOps, QueueOps, IAllowedPlans } from './queueserver';
import { getOverview, getQueuedPlans } from './planactions';
import { RouteComponentProps } from "react-router-dom";
import { Grid } from '@material-ui/core';
import { PlanList } from './PlanList';
import { AvailablePlans } from './AvailablePlans';
import { PlanFormContainer } from './PlanFormContainer';

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

class AcquirePage extends React.Component<IProps, IState> {
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
                <Grid item justify="center" spacing={10} xs={3}>    
                  <AvailablePlans selectedPlan={this.state.selectedPlan} handleSelect={this.handleSelectPlan}
                  plans={this.props.allowedPlans}> </AvailablePlans>
                </Grid>
                <Grid item justify="center" spacing={10} xs={5}> 
                  <PlanFormContainer submitPlan={this.props.submitPlan} name={this.state.selectedPlan} allowedPlans={this.props.allowedPlans}> </PlanFormContainer>   
                </Grid>   
                <Grid item justify="center" spacing={10} xs={3}>
                  <PlanList clearQueue={this.props.clearQueue} plans={this.props.plans}
                  modifyEnvironment={this.props.modifyEnvironment} modifyQueue={this.props.modifyQueue}></PlanList>
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
        setInterval(this.props.getQueuedPlans, 500);
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
)(AcquirePage);
