import React from 'react';
import { red } from '@material-ui/core/colors';
import { IAllowedPlans, IParameter, ISumbitPlanObject } from './queueserver';
import { PlanForm } from './PlanForm';
import { Box, Card, CardContent, CardHeader, Paper, Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

type IProps = {
  name: string;
  allowedPlans: IAllowedPlans;
  submitPlan: (selectedPlan: ISumbitPlanObject) => void;
}

interface IState {
  root: any;
  media: any;
  avatar: any;
  expanded: boolean;
  plan: ISumbitPlanObject;
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
      expanded: false,
      plan: {name: this.props.name,
             kwargs: {}}
    }
  }

  _get_planform(name: string): JSX.Element {
    const planFormDict : Record<string, JSX.Element> = {'count': <PlanForm submitPlan={this.props.submitPlan} 
                                                                            name={name} 
                                                                            allowedPlans={this.props.allowedPlans}/>,
                                                        'default': <PlanForm submitPlan={this.props.submitPlan} 
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

    return planFormDict[name] ? planFormDict[name] : planFormDict['default']
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
          {this._get_planform(this.props.name)}
        </Box>
      </Paper>)
  }
}

