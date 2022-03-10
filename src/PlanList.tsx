import React from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Tooltip from '@material-ui/core/Tooltip';
import LoopIcon from '@material-ui/icons/Loop';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { IPlanObject, QueueOps, EnvOps, incrementPosition, decrementPosition, IStatus } from './queueserver';
import { Accordion, AccordionDetails, AccordionSummary, Box, Paper, Typography } from '@material-ui/core';
import { clearQueue, deletePlan, modifyQueue, modifyEnvironment} from './planactions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import StopIcon from '@material-ui/icons/Stop';
import EditIcon from '@material-ui/icons/Edit';
import { green } from '@material-ui/core/colors';

type Plans = {
  plans: IPlanObject[];
  clearQueue: typeof clearQueue;
  deletePlan: typeof deletePlan;
  editPlan: any;
  modifyEnvironment: typeof modifyEnvironment;
  modifyQueue: typeof modifyQueue;
  editItemUid: string;
  editable: boolean;
  status: IStatus;
}

interface IState {
  env: string;
  onEnvChange: (env: string) => void;
}

export class PlanList extends React.Component<Plans, IState>{
  public constructor(props: Plans) {
    super(props);
    this.state = {
      env: "Open",
      onEnvChange: this.handleEnvChange,
    };
  }

  handleIncrement(index: number) {
    if (index === this.props.plans.length - 1){
      return
    } else {
      incrementPosition(this.props.plans[index].item_uid, this.props.plans[index+1].item_uid);
    }
  }

  handleDecrement(index: number) {
    if (index === 0){
      return
    } else {
      decrementPosition(this.props.plans[index].item_uid, this.props.plans[index-1].item_uid);
    }
  }

  private handleEnvChange = (env: string) => {
    this.setState({ env });
  };

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

  private handlePlay() {
    this.props.modifyQueue(QueueOps.start);
  }

  private handlePause() {
    this.props.modifyQueue(QueueOps.stop);
  }

  render() {
    return (
          <Box> 
            <Box height="1vh"></Box>
              <Typography style={{ fontWeight: 500 }} align="center" variant="h4" component="h1" gutterBottom>
                Queue
                <Tooltip title={`${this.state.env} RE environment`}>
                  <IconButton onClick={() => this.handleEnvClick()} edge="end" aria-label="comments">
                    <LoopIcon />
                  </IconButton>
                </Tooltip>
                <IconButton onClick={() => this.handlePlay()} edge="end" aria-label="comments">
                  <PlayCircleOutlineIcon />
                </IconButton>
                <IconButton onClick={() => this.handlePause()} edge="end" aria-label="comments">
                  <PauseCircleOutlineIcon />
                </IconButton>
                <IconButton onClick={() => this.props.clearQueue()} edge="end" aria-label="comments">
                  <DeleteForeverIcon />
                </IconButton>
              </Typography>
            <Box height="2vh"></Box>
            <Paper elevation={0} style={{height: "75vh", overflow: 'auto', margin: "auto", backgroundColor: 'transparent'}}>
                {this.props.plans.map((planObject: IPlanObject, index) => (
                  <Accordion key={index}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" 
                                      style={{ backgroundColor: this.props.editItemUid === planObject.item_uid ? green[500] : '#fff'}}
                                      expandIcon={<ExpandMoreIcon />}>
                      {(planObject.name === "queue_stop") ?
                        <ListItemIcon>
                          <StopIcon fontSize='large' color="primary" />
                        </ListItemIcon> :
                        <ListItemIcon>
                          <AccountCircleIcon fontSize='large' />
                        </ListItemIcon>}
                      {(planObject.item_type === "instruction") ?
                        <Typography component="div" color="primary">
                          <Box textAlign="justify" m={1} fontWeight="fontWeightMedium">
                            {planObject.name}
                          </Box> 
                        </Typography> :
                        <ListItemText
                          primary={planObject.name}
                          secondary={planObject.item_uid.substr(0,8)}/>}
                      <ListItemSecondaryAction>
                        {(index !== 0) && <IconButton onClick={(e) => {e.stopPropagation(); this.handleDecrement(index)}} edge="end" aria-label="comments">
                            <ArrowUpwardIcon />
                          </IconButton>}
                        {(index !== this.props.plans.length -1) && <IconButton onClick={(e) => {e.stopPropagation(); this.handleIncrement(index)}} edge="end" aria-label="comments">
                            <ArrowDownwardIcon/>
                          </IconButton>}
                        <IconButton onClick={(e) => {e.stopPropagation(); this.props.deletePlan(planObject.item_uid)}} edge="end" aria-label="comments">
                          <DeleteForeverIcon />
                        </IconButton>
                        {
                          planObject.name !== "queue_stop" && this.props.editable ?
                          <IconButton  onClick={(e) => {e.stopPropagation(); this.props.editPlan(planObject.item_uid, planObject.name, planObject.kwargs)}} edge="end" aria-label="comments">
                            <EditIcon />
                          </IconButton>: <IconButton disabled edge="end" aria-label="comments">
                            <EditIcon />
                          </IconButton>
                        }
                        <IconButton />
                      </ListItemSecondaryAction>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div>
                          <Typography>
                            uid: {planObject.item_uid}
                          </Typography>
                          {planObject.args ?
                            <Typography>
                              args: {JSON.stringify(planObject.args)}
                            </Typography> : null }
                          {planObject.kwargs ?
                            <Typography>
                              kwargs: {JSON.stringify(planObject.kwargs)}
                            </Typography> : null
                           } 
                          <Typography>
                            user: {planObject.user}
                          </Typography>
                          <Typography>
                            user_group: {planObject.user_group}
                          </Typography>
                          <Typography>
                            item_type: {planObject.item_type}
                          </Typography>
                          {planObject.name ?
                            <Typography>
                              name: {planObject.name}
                            </Typography> : null}
                        </div>
                      </AccordionDetails>
                  </Accordion>
                ))}
            </Paper>
          </Box>
         );}
}
