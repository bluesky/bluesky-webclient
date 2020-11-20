import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IAllowedPlans, IParameter, ISumbitPlanObject } from './queueserver';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Box, Button, Grid, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Paper, Select, Switch, TextField } from '@material-ui/core';
import StarsIcon from '@material-ui/icons/Stars';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { PlanForm } from './PlanForm';

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

  _submit(){
    const new_plan = this.state.plan;
    new_plan.name = this.props.name;
    this.setState({
        plan: new_plan
    });
    this.props.submitPlan(this.state.plan)
  }

  _get_planform(name: string): JSX.Element {
    const planFormDict : Record<string, JSX.Element> = {'count': <PlanForm submitPlan={this.props.submitPlan} 
                                                                            name={name} 
                                                                            allowedPlans={this.props.allowedPlans}/>,
                                                        'default': <PlanForm submitPlan={this.props.submitPlan} 
                                                                            name={name} 
                                                                            allowedPlans={this.props.allowedPlans}/>}

    return planFormDict[name] ? planFormDict[name] : planFormDict['default']
  }

  render(){
    if (this.props.name === ""){
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
            <Card raised={true}>
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
            </Card>
          </Box>
        </Paper>
      );
    } else {
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
            <Card raised={true}>
              <CardHeader
                avatar={
                  <AccountCircleIcon fontSize='large' />
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                titleTypographyProps={{variant:'h6' }}
                title={this.props.name}
              />
              <CardContent>
                <Typography >
                    {this.props.allowedPlans.plans_allowed[this.props.name]["description"] ?
                    this.props.allowedPlans.plans_allowed[this.props.name]["description"] : "No plan description found."}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Enter the plan parameters!
                </Typography>
                <List>
                  {this.props.allowedPlans.plans_allowed[this.props.name].parameters.map(
                    (parameterObject: IParameter) => (
                      <ListItem divider={true} button={true} key={parameterObject.name}>
                        {(!parameterObject.default) ?
                                              <ListItemIcon>
                                                 <StarsIcon />
                                              </ListItemIcon> : <ListItemIcon/>}
                        <Grid container spacing={5} direction="row" justify="center">
                          <Grid item justify="center" spacing={10} xs={5}>
                            <ListItemText
                              primary={parameterObject.name}
                              secondary={parameterObject.description ? parameterObject.description : ""}/>
                          </Grid>
                          <Grid item justify="center" spacing={1} xs={5}>
                            <List dense={true}>
                              {this._get_widget_list(parameterObject)}
                            </List>
                          </Grid>
                        </Grid>
                        {!parameterObject.isList ?  <ListItemSecondaryAction>
                                                      <IconButton onClick={() => this._addParameter(parameterObject.name)}>
                                                        <AddCircleOutlineIcon />
                                                      </IconButton>
                                                    </ListItemSecondaryAction>:<IconButton/>}
                      </ListItem>
                  ))}
                </List>
              </CardContent>
              <CardActions disableSpacing>
                <Button onClick={() => this._submit()}  variant="contained" color="primary">
                  submit
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Paper>
      );
    }
  }
}

