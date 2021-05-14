import React from 'react';
import { IAllowedPlans, ISubmitPlanObject } from './queueserver';
import { GenericPlanForm } from './GenericPlanForm';
import { XAFSPlanForm } from './XAFSPlanForm'
import { Card, CardContent, CardHeader, Paper, Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

type IProps = {
  name: string;
  itemUid: string;
  editKwargs: {[name: string]: (string|number)[]};
  allowedPlans: IAllowedPlans;
  submitPlan: (selectedPlan: ISubmitPlanObject) => void;
  submitEditedPlan: (itemUid: string, selectedPlan: ISubmitPlanObject) => void;
  hideForm: () => void;
}

interface IState {
  media: any;
  avatar: any;
}

export class PlanFormContainer extends React.Component<IProps, IState> {

  private getPlanForm() {
   const planFormDict : Record<string, JSX.Element> = {
                                'xafs': <XAFSPlanForm submitPlan={this.props.submitPlan} 
                                                      submitEditedPlan={this.props.submitEditedPlan}
                                                      name={this.props.name}
                                                      itemUid={this.props.itemUid}
                                                      editKwargs={this.props.editKwargs}
                                                      allowedPlans={this.props.allowedPlans}
                                                      hideForm={this.props.hideForm}/>,
                                'default': <GenericPlanForm submitPlan={this.props.submitPlan} 
                                                            submitEditedPlan={this.props.submitEditedPlan}
                                                            name={this.props.name} 
                                                            itemUid={this.props.itemUid}
                                                            editKwargs={this.props.editKwargs}
                                                            allowedPlans={this.props.allowedPlans}
                                                            hideForm={this.props.hideForm}/>,
                                '': <Card raised={true}>
                                      <CardHeader
                                        avatar={
                                          <AccountCircleIcon fontSize='large' />
                                        }
                                        titleTypographyProps={{variant:'h6' }}
                                        title={"Select a plan."}
                                      />
                                      <CardContent>
                                        <Typography>
                                            Select a plan from the available plans list.
                                        </Typography>
                                      </CardContent>
                                    </Card>}
      if (this.props.allowedPlans && this.props.name){
        return planFormDict[this.props.name] ? planFormDict[this.props.name] : planFormDict['default']
      } else {
        return planFormDict[''];
      }
      
    }

  render(){
    return (
      <Paper style={{height: "83vh", overflow: 'auto', margin: "auto"}}>
          {this.getPlanForm()}
      </Paper>)
  }
}