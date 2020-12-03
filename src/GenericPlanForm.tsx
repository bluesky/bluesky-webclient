import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { IAllowedPlans, IParameter, ISumbitPlanObject } from './queueserver';
import { Box, Button, Grid, GridList, GridListTile, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, makeStyles, PropTypes, Select, Switch, TextField } from '@material-ui/core';
import StarsIcon from '@material-ui/icons/Stars';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import theme from './theme';

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

export class GenericPlanForm extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
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
    this.setState({
        plan: new_plan
    });
  }

  _addParameter(name: string){
    const new_plan = this.state.plan;
    new_plan.kwargs[name].push("");
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
      if (this.state.plan.kwargs[parameterObject.name] === undefined){
        return <Card />
      } else {
        return this.state.plan.kwargs[parameterObject.name].map(() =>
        (<ListItem dense={true}>
          {this._get_widget(parameterObject)}
        </ListItem>))
      }                                            
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
            <CardContent>
              <div>
                <GridList style={{border:5, borderColor: "primary.main"}}>
                  <GridListTile key="Subheader" cols={2} style={{ color: "black", border:5, height: 'auto'}}>
                    <Box borderBottom={2}>
                      <Typography align="center" variant="h5" component="h1" >
                        {this.props.name}
                      </Typography>
                      <Typography align="center" gutterBottom>
                        {this.props.allowedPlans.plans_allowed[this.props.name]["description"] ?
                          this.props.allowedPlans.plans_allowed[this.props.name]["description"] : "No plan description found."}
                      </Typography>
                    </Box>
                  </GridListTile>
                  {this.props.allowedPlans.plans_allowed[this.props.name].parameters.map(
                    (parameterObject: IParameter) => (
                      <GridListTile style={{ height: 'auto', border: 5, borderColor: "primary.main"}}>
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
                      </GridListTile>

                  ))}
                </GridList>
              </div>
              
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