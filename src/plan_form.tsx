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
}

interface IState {
  root: any;
  media: any;
  expand: any;
  expandOpen: any;
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
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        //transition: theme.transitions.create('transform', {
        //  duration: theme.transitions.duration.shortest,
        //}),
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
  //const [expanded, setExpanded] = React.useState(false);
  
  handleExpandClick() {
    alert("Expand")
    //setExpanded(!expanded);
  };

  handleSubmit(uid: string) {
    alert(uid)
  }

  render(){
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
            title={this.props.name}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Enter the plan parameters!
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton onClick={() => this.handleSubmit(this.props.name)} edge="end" aria-label="comments">
              <SendIcon />
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
