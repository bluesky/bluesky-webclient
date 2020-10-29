import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IAllowedPlans, IParameter, IPlan, IPlanObject, ISumbitPlanObject } from './queueserver';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Thumb from './assets/nsls-ii-diffraction-image-hr.jpg';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Button, Container, Grid, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Paper, Select, Switch, TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import StarsIcon from '@material-ui/icons/Stars';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { JsxExpression } from 'typescript';

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
        paddingTop: '56.25%', // 16:9
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
                                                              (<ListItem>
                                                                {this._get_widget(parameterObject)}
                                                              </ListItem>))
  }

  _get_widget(parameterObject: IParameter): JSX.Element {
    const widgetDict : Record<string, JSX.Element> = {'number': <TextField variant="outlined"/>,
                                                      'boolean': <Switch/>,
                                                      'string': <TextField name={parameterObject.name}
                                                                           id={String(this.state.plan.kwargs[parameterObject.name].length-1)}
                                                                           defaultValue={parameterObject.default}
                                                                           onChange={this._onChange.bind(this)}
                                                                           variant="outlined"/>,
                                                      'detector': <Select/>,
                                                      'moveable': <Select/>,
                                                      'default': <TextField name={parameterObject.name}
                                                                            id={String(this.state.plan.kwargs[parameterObject.name].length-1)}
                                                                            defaultValue={parameterObject.default}
                                                                            onChange={this._onChange.bind(this)}
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
    if (this.props.name == ""){
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
                        {(parameterObject.kind.value==2) ? 
                                              <ListItemIcon>
                                                 <StarsIcon />
                                              </ListItemIcon> : <ListItemIcon/>}
                        <Grid container spacing={5} direction="row" justify="center">
                          <Grid item justify="center" spacing={10} xs={5}>    
                            <ListItemText
                              primary={parameterObject.name}
                              secondary={parameterObject.description ? parameterObject.description : "No parameter description found."}/>
                          </Grid>
                          <Grid item justify="center" spacing={1} xs={5}>
                            <List>
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

