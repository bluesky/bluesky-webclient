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
import { IPlan, IPlanObject } from './queueserver';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Thumb from './assets/nsls-ii-diffraction-image-hr.jpg';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Container, Paper } from '@material-ui/core';
import { planObjectsReducer } from './planreducers';

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
    }

  }
  
  handleExpandClick() {
    alert("Expand");
    //setExpanded(!expanded);
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
    if (plans.length == 0) {
      return "No plan currently executing";
    } else {
      return plans[0].name;
    }
  }

  getUid(plans: IPlanObject[]){
    if (plans.length == 0) {
      return "";
    } else {
      return plans[0].plan_uid;
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
            subheader={this.getUid(this.props.plans)}
          />
          <CardMedia
            className={this.state.media}
            image={Thumb}
            title="Thumbnail Image"
            component="img"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Something interesting is happening!
            </Typography>
            <LinearProgress variant="determinate" value={50} />
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
