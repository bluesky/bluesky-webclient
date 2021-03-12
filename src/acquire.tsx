import React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { IApplicationState } from './store';
import { submitPlan, modifyEnvironment, modifyQueue, getAllowedPlans, submitEditedPlan } from './planactions';
import { clearQueue, deletePlan } from './planactions';
import { IPlanObject, IAllowedPlans } from './queueserver';
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
    submitEditedPlan: typeof submitEditedPlan;
    modifyEnvironment: typeof modifyEnvironment;
    modifyQueue: typeof modifyQueue;
    clearQueue: typeof clearQueue;
    deletePlan: typeof deletePlan;
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
    editItemUid: string;
    editKwargs: {[name: string]: (string|number)[]};
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
          editItemUid: "",
          editKwargs: {},
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
                <Grid item justify="center" spacing={1} xs={2}>    
                  <AvailablePlans selectedPlan={this.state.selectedPlan} handleSelect={this.handleSelectPlan}
                  plans={this.props.allowedPlans}> </AvailablePlans>
                </Grid>
                <Grid item justify="center" spacing={1} xs={6}> 
                  <PlanFormContainer submitEditedPlan={this.props.submitEditedPlan} submitPlan={this.props.submitPlan} 
                                     name={this.state.selectedPlan} allowedPlans={this.props.allowedPlans}
                                     itemUid={this.state.editItemUid} editKwargs={this.state.editKwargs}> </PlanFormContainer>   
                </Grid>   
                <Grid item justify="center" spacing={1} xs={3}>
                  <PlanList editPlan={this.editPlan} deletePlan={this.props.deletePlan} 
                            clearQueue={this.props.clearQueue} plans={this.props.plans}
                            modifyEnvironment={this.props.modifyEnvironment} modifyQueue={this.props.modifyQueue}
                            editItemUid={this.state.editItemUid}></PlanList>
                </Grid>
            </Grid>
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

    private editPlan = (itemUid: string, planType: string, kwargs: {[name: string]: (string|number)[]}) => {
        this.setState({editItemUid: itemUid});
        this.setState({selectedPlan: planType});
        this.setState({editKwargs: kwargs});
    }
    
    componentDidMount() {
        this.props.getOverview();
        setInterval(this.props.getQueuedPlans, 500);
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
      submitEditedPlan: (itemUid: string, planId: number, param: number) => dispatch(submitEditedPlan(itemUid, planId, param)),
      clearQueue: () => dispatch(clearQueue()),
      deletePlan: () => dispatch(deletePlan()),
      getOverview: () => dispatch(getOverview()),
      getQueuedPlans: () => dispatch(getQueuedPlans()),
      getAllowedPlans: () => dispatch(getAllowedPlans()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AcquirePage);
