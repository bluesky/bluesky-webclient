import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Tooltip from '@material-ui/core/Tooltip';
import LoopIcon from '@material-ui/icons/Loop';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { IPlanObject, QueueOps, EnvOps } from './queueserver';
import { Box, Card, CardContent, Paper, Typography } from '@material-ui/core';
import { clearQueue, modifyQueue, modifyEnvironment } from './planactions';

type Plans = {
  plans: IPlanObject[];
  clearQueue: typeof clearQueue;
  modifyEnvironment: typeof modifyEnvironment;
  modifyQueue: typeof modifyQueue;
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

  handleMoveForward(uid: string) {
    alert(uid);
  }

  handleMoveBackward(uid: string) {
    alert(uid);
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

  handlePlay() {
    this.props.modifyQueue(QueueOps.start);
  }

  handlePause() {
    this.props.modifyQueue(QueueOps.stop);
  }

  handleDelete(uid: string){

  }

  render() {
    return (
          <Box> 
            <Card style={{height: "6vh"}} raised={true}>
              <CardContent>
                <Typography align="center" variant="h5" component="h1" gutterBottom>
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
              </CardContent>
            </Card>
            <Box height="2vh"></Box>
            <Paper style={{height: "75vh", overflow: 'auto', margin: "auto"}}>
              <List>
                {this.props.plans.map((planObject: IPlanObject) => (
                    <ListItem divider={true} button={true} key={planObject.plan_uid}>
                        <ListItemIcon>
                          <AccountCircleIcon fontSize='large' />
                        </ListItemIcon>
                        <ListItemText
                          primary={planObject.name}
                          secondary={planObject.plan_uid.substr(0,8)}/>
                        <ListItemSecondaryAction>
                          <IconButton onClick={() => this.handleMoveForward(planObject.plan_uid)} edge="end" aria-label="comments">
                            <KeyboardArrowUpIcon />
                          </IconButton>
                          <IconButton onClick={() => this.handleMoveBackward(planObject.plan_uid)} edge="end" aria-label="comments">
                            <KeyboardArrowDownIcon />
                          </IconButton>
                          <IconButton onClick={() => this.handleDelete(planObject.plan_uid)} edge="end" aria-label="comments">
                            <DeleteForeverIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            </Paper>
          </Box>
         );}
}
