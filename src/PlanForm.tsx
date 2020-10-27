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
import SendIcon from '@material-ui/icons/Send';

type PlanType = {
  name: string;
  submitPlan: (selectedPlan: string) => void;
}

interface IState {
  root: any;
  media: any;
  avatar: any;
  expanded: boolean
}

export class PlanForm extends React.Component<PlanType, IState> {
  constructor(props: PlanType) {
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
    }

  }
  render(){
    if (this.props.name == ""){
      return (
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
      );
    } else {
      return (
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
              <Typography>
                  Plan description.
              </Typography>
            </CardContent>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                Enter the plan parameters!
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton onClick={() => this.props.submitPlan(this.props.name)} edge="end" aria-label="comments">
                <SendIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Box>
      );
    }
  }
}
