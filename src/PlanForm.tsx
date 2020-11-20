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

export class PlanForm extends React.Component<IProps, IState> {
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

  _onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, id, value } = e.target;
    const new_plan = this.state.plan;
    new_plan.kwargs[name][Number(id)] = value;
    //alert(JSON.stringify(this.state.plan))
    this.setState({
        plan: new_plan
    });
  }

  _addParameter(name: string){
    const new_plan = this.state.plan;
    new_plan.kwargs[name].push("");
    //alert(JSON.stringify(this.state.plan))
    this.setState({
        plan: new_plan
    });
  }

  _submit(){
    const new_plan = this.state.plan;
    new_plan.name = this.props.name;
    this.setState({
        plan: new_plan
    });
    this.props.submitPlan(this.state.plan)
  }

  _get_widget_list(parameterObject: IParameter): JSX.Element[]|JSX.Element {
      return this.state.plan.kwargs[parameterObject.name].map((value: string|number) =>
                                                              (<ListItem dense={true}>
                                                                {this._get_widget(parameterObject)}
                                                              </ListItem>))
  }

  _get_widget(parameterObject: IParameter): JSX.Element {
    const widgetDict : Record<string, JSX.Element> = {'number': <TextField  name={parameterObject.name}
                                                                            id={String(this.state.plan.kwargs[parameterObject.name].length-1)}
                                                                            defaultValue={parameterObject.default}
                                                                            onChange={this._onChange.bind(this)}
                                                                            variant="outlined"/>,
                                                      'boolean': <Switch name={parameterObject.name}
                                                                          id={String(this.state.plan.kwargs[parameterObject.name].length-1)}
                                                                          defaultValue={parameterObject.default}
                                                                          onChange={this._onChange.bind(this)}/>,
                                                      'str': <TextField name={parameterObject.name}
                                                                           id={String(this.state.plan.kwargs[parameterObject.name].length-1)}
                                                                           defaultValue={parameterObject.default}
                                                                           onChange={this._onChange.bind(this)}
                                                                           variant="outlined"/>,
                                                      'enum': <Select name={parameterObject.name}
                                                                      id={String(this.state.plan.kwargs[parameterObject.name].length-1)}
                                                                      defaultValue={parameterObject.default}/>,
                                                      'default': <TextField name={parameterObject.name}
                                                                            id={String(this.state.plan.kwargs[parameterObject.name].length-1)}
                                                                            defaultValue={parameterObject.default}
                                                                            onChange={this._onChange.bind(this)}
                                                                            margin="dense"
                                                                            variant="outlined"/>}

    return widgetDict[parameterObject.type] ? widgetDict[parameterObject.type] : widgetDict['default']
  }

  static getDerivedStateFromProps(props : IProps, current_state: IState) {
    const temp_dict: Record<string, (string|number)[]> = {};
    if (current_state.plan.name !== props.name) {
      var i;
      for (i = 0; i < props.allowedPlans.plans_allowed[props.name].parameters.length; i++) {
        if (props.allowedPlans.plans_allowed[props.name].parameters[i].default){
          temp_dict[props.allowedPlans.plans_allowed[props.name].parameters[i].name] = [props.allowedPlans.plans_allowed[props.name].parameters[i].default];
        } else {
          temp_dict[props.allowedPlans.plans_allowed[props.name].parameters[i].name] = [""];
        }
      }
      return {
        plan: {name: props.name,
               kwargs: temp_dict}
      }
    } else {
      return null;
    }
  }

  render(){
      return (
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
      );
  }
}

