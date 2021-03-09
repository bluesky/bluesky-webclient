import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { IAllowedPlans, ISumbitPlanObject } from './queueserver';
import { Box, Button, FormControl, FormControlLabel, FormLabel, GridList, GridListTile, Radio, RadioGroup, Slider, TextField } from '@material-ui/core';

const defaultBounds = [-200, -30, -10, 15.5, 1500];
const defaultSteps = [10, 2, 0.3, 0.05];
const defaultTimes = [0.5, 0.5, 0.5, 0.25];
const defaultElement = "Au";
const defaultEdge = "K";
const defaultStart = 1;
const defaultNscans = 3;
const defaultMode = "transmission";
const defaultRegions = 4;

type IProps = {
  name: string;
  itemUid: string;
  allowedPlans: IAllowedPlans;
  submitPlan: (selectedPlan: ISumbitPlanObject) => void;
  submitEditedPlan: (selectedPlan: ISumbitPlanObject) => void;
}

interface IState {
  plan: ISumbitPlanObject;
  numRegions: number;
}

export class XAFSPlanForm extends React.Component<IProps, IState> {
  // All of the kwargs are lists, if the kwarg only has one item when it is submitted, 
  // then it is reduced to a single value.
  constructor(props: IProps) {
    super(props);
    this.state = {
      plan: {name: this.props.name,
             kwargs: {
              element: [defaultElement],
              edge: [defaultEdge],
              sample: [""],
              prop: [""],
              comment: [""],
              nscans: [defaultNscans], 
              start: [defaultStart],
              mode: [defaultMode],
              bounds: defaultBounds,
              steps: defaultSteps,
              times: defaultTimes,
             }},
      numRegions: defaultRegions
    }
  }

  private onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, id, value } = e.target;
    const new_plan = this.state.plan;
    new_plan.kwargs[name][Number(id)] = value;
    this.setState({
        plan: new_plan
    });
  }
  
  private changeRegions(event: object, value: any) {
    const new_plan = this.state.plan;
    if (value < this.state.numRegions){
      new_plan.kwargs.bounds = new_plan.kwargs.bounds.slice(0, value + 1)
      new_plan.kwargs.steps = new_plan.kwargs.steps.slice(0, value)
      new_plan.kwargs.times = new_plan.kwargs.times.slice(0, value)
    }
    if (value > this.state.numRegions){
      var i;
      for (i = 0; i <= (value - this.state.numRegions); i++){
        new_plan.kwargs.bounds.push(0)
        new_plan.kwargs.steps.push(0)
        new_plan.kwargs.times.push(0)
      }
    }
    this.setState({
        plan: new_plan,
        numRegions: value
    });
  }

  private submit(){
    const new_plan = this.state.plan;
    new_plan.name = this.props.name;
    this.setState({
        plan: new_plan
    });
    this.props.submitPlan(this.state.plan)
  }

  render(){
    return (
          <Card raised={true}>
            <CardContent>
              <div>
                <GridList spacing={3} cellHeight="auto">
                  <GridListTile key="Subheader" cols={2} style={{ color: "black", border:5, height: 'auto'}}>
                    <Box borderBottom={3}>
                      <Typography align="center" variant="h5" component="h1" >
                        {this.props.name}
                      </Typography>
                      <Typography align="center" gutterBottom>
                        {this.props.allowedPlans.plans_allowed[this.props.name]["description"] ?
                          this.props.allowedPlans.plans_allowed[this.props.name]["description"] : "No plan description found."}
                      </Typography>
                    </Box>
                  </GridListTile>
                  <GridListTile style={{ height: 'auto' }}>
                    <form noValidate autoComplete="off">
                      <div>
                        <TextField onChange={this.onChange.bind(this)} required 
                                    name="element" id="0" label="Element" defaultValue={this.state.plan.kwargs.element[0]} /> &nbsp;
                        <TextField onChange={this.onChange.bind(this)} required 
                                    name="edge" id="0" label="Edge" defaultValue={this.state.plan.kwargs.edge[0]} />
                      </div>
                      <FormControl fullWidth>
                        <TextField onChange={this.onChange.bind(this)} required 
                                    name="sample" id="0" label="Sample" />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField onChange={this.onChange.bind(this)} 
                                    name="prop" id="0" label="Preparation" />
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField onChange={this.onChange.bind(this)} 
                                    name="comment" id="0" label="Comment" multiline rows={4} />
                      </FormControl>
                      <div>
                        <TextField onChange={this.onChange.bind(this)} required 
                                    name="nscans" id="0" label="Number of scans" type="number" defaultValue={this.state.plan.kwargs.nscans[0]} /> &nbsp;
                        <TextField onChange={this.onChange.bind(this)} required 
                                    name="start" id="0" label="Start" type="number" defaultValue={this.state.plan.kwargs.start[0]} />
                      </div><br />
                      <FormControl>
                        <FormLabel component="legend">Mode</FormLabel>
                        <RadioGroup onChange={this.onChange.bind(this)} row 
                                    name="mode" id="mode" aria-label="Mode" defaultValue="transmission">
                          <FormControlLabel value="transmission" control={<Radio />} label="Transmission" />
                          <FormControlLabel value="fluorescence" control={<Radio />} label="Fluorescence" />
                          <FormControlLabel value="both" control={<Radio />} label="Both" />
                        </RadioGroup>
                      </FormControl><br />
                        <FormLabel component="legend">Regions:</FormLabel>
                        <Slider onChangeCommitted={this.changeRegions.bind(this)} 
                          defaultValue={4} aria-labelledby="discrete-slider"
                          valueLabelDisplay="auto" step={1} marks min={1} max={8}
                          style={{height: "auto", width: '100'}}
                        />
                      <div>
                          <FormLabel component="legend">Bounds:</FormLabel>
                          {Array.from(Array(this.state.numRegions+1).keys()).map((value: number, index) => (
                              <TextField onChange={this.onChange.bind(this)} required 
                                          name="bounds" id={String(index)} style={{width: 60}} defaultValue={this.state.plan.kwargs.bounds[index]} />
                          ))}
                      </div>
                      <div>
                          <FormLabel component="legend">Steps:</FormLabel>
                          {Array.from(Array(this.state.numRegions).keys()).map((value: number, index) => (
                              <TextField onChange={this.onChange.bind(this)} required 
                                          name="steps" id={String(index)} style={{width: 60}} defaultValue={this.state.plan.kwargs.steps[index]} />
                          ))}
                      </div>
                      <div>
                          <FormLabel component="legend">Times:</FormLabel>
                          {Array.from(Array(this.state.numRegions).keys()).map((value: number, index) => (
                              <TextField onChange={this.onChange.bind(this)} required 
                                          name="times" id={String(index)} style={{width: 60}} defaultValue={this.state.plan.kwargs.times[index]} />
                          ))}
                      </div><br />
                    </form>
                  </GridListTile>
                </GridList>     
              </div>
            </CardContent>
            <CardActions disableSpacing style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => this.submit()}  variant="contained" color="primary">
                submit plan
              </Button>
            </CardActions>
          </Card>
    );
  }
}