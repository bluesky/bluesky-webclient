import React from 'react';
import { IAllowedPlans, ISumbitPlanObject } from './queueserver';
import { GenericPlanForm } from './GenericPlanForm';
import { Box, Card, CardContent, CardHeader, Paper, Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { red } from '@material-ui/core/colors';

type IProps = {
  name: string;
  allowedPlans: IAllowedPlans;
  submitPlan: (selectedPlan: ISumbitPlanObject) => void;
}

interface IState {
  root: any;
  media: any;
  avatar: any;
  name: string;
  form: JSX.Element;
}

export class PlanFormContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      root: {
        //maxWidth: 345,
      },
      media: {
        height: 0,
        paddingTop: '56.25%',
      },
      avatar: {
        backgroundColor: red[500],
      },
      form: <Card raised={true}>
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
            </Card>,
      name: ""
    }
  }

/*
  _get_planform(name: string): JSX.Element {
    const planFormDict : Record<string, JSX.Element> = {
                                                        'count': <GenericPlanForm submitPlan={this.props.submitPlan} 
                                                                            name={name} 
                                                                            allowedPlans={this.props.allowedPlans}/>,
                                                        'default': <GenericPlanForm submitPlan={this.props.submitPlan} 
                                                                            name={name} 
                                                                            allowedPlans={this.props.allowedPlans}/>,
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
    return planFormDict[name] ? planFormDict[name] : planFormDict['']
  }
*/

  static getDerivedStateFromProps(props : IProps, current_state: IState) {
    if (current_state.name !== props.name) {
      const planFormDict : Record<string, JSX.Element> = {'count': <GenericPlanForm submitPlan={props.submitPlan} 
                                                                              name={props.name} 
                                                                              allowedPlans={props.allowedPlans}/>,
                                                          'default': <GenericPlanForm submitPlan={props.submitPlan} 
                                                                              name={props.name} 
                                                                              allowedPlans={props.allowedPlans}/>,
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
      return {form: planFormDict[props.name] ? planFormDict[props.name] : planFormDict['default']}
    }
  }

  render(){
    return (
      <Paper style={{height: "83vh", overflow: 'auto', margin: "auto"}}>
        <Box>
          <Card style={{height: "6vh"}} raised={true}>
            <CardContent>
              <Typography align="center" variant="h5" component="h1" gutterBottom>
                Plan Form
              </Typography>
            </CardContent>
          </Card>
        <Box height="2vh"></Box>
          {this.state.form} 
        </Box>
      </Paper>)
  }
}