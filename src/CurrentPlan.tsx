import React from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IPlanObject, IActiveRun } from './queueserver';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Box } from '@material-ui/core';
import { Previews } from './Previews';
import { getActiveRuns } from './queueserver'

type Plans = {
  plans: IPlanObject[];
}

interface IState {
  root: any;
  media: any;
  expand: any;
  expandOpen: any;
  avatar: any;
  expanded: boolean;
  activeRun: string;
  activeRunsId: any;
}

export class CurrentPlan extends React.Component<Plans, IState> {
  constructor(props: Plans) {
    super(props);
    this.state = {
      root: {
        //maxWidth: 345,
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      avatar: {
        backgroundColor: red[500],
      },
      expanded: false,
      activeRun: "",
      activeRunsId: 0,
    }

  }
  
  handleExpandClick() {
    alert("Expand");
  };

  handlePlay() {
    alert("Play");
  }

  handlePause() {
    alert("Pause");
  }

  handleDelete(uid: string) {
    alert(uid);
  }

  getName(plans: IPlanObject[]){
    if (plans.length === 0) {
      return "Current Plan";
    } else {
      return plans[0].name;
    }
  }

  getActiveUids(){
    getActiveRuns().then((result) => {
      if (result[0] !== undefined){
        this.setState({activeRun: result[0].uid})
      } 
    })
  }

  componentDidMount(){
    this.getActiveUids.bind(this)
    this.setState({activeRunsId: setInterval(this.getActiveUids.bind(this), 1000)});
  }

  componentWillUnmount(){
    clearInterval(this.state.activeRunsId);
  }

  getUid(plans: IPlanObject[]){
    if (plans.length === 0) {
      return "";
    } else {
      return plans[0].item_uid;
    }
  }

  render(){
    return (
      <Box>
        <Card style={{height: "6vh"}} raised={true}>
          <CardContent>
            <Typography align="center" variant="h5" component="h1" gutterBottom>
              Current Plan
            </Typography>
          </CardContent>
        </Card>
      <Box height="2vh"></Box>
        <Card raised={true} >
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={this.state.avatar}>
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            titleTypographyProps={{variant:'h6' }}
            title={this.getName(this.props.plans)}
            subheader={this.state.activeRun}
          />
          <CardContent>
            { this.state.activeRun ? <Previews runUid={this.state.activeRun}/> : null }            
          </CardContent>
          <CardActions disableSpacing>
            <IconButton onClick={() => this.handlePlay()} edge="end" aria-label="comments">
              <PlayCircleOutlineIcon />
            </IconButton>
            <IconButton onClick={() => this.handlePause()} edge="end" aria-label="comments">
              <PauseCircleOutlineIcon />
            </IconButton>
            <IconButton onClick={() => this.handleDelete("temp_string_uid")} edge="end" aria-label="comments">
              <HighlightOffIcon />
            </IconButton>
            <IconButton>
              <ShareIcon />
            </IconButton>
            <IconButton
              className={clsx(this.state.expand, {
                [this.state.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Plan metadata</Typography>
              <Typography>
                Some text here.
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Box>
    );
  }
}
