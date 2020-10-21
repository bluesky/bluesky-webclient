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

type Plans = {
  plans: IPlanObject[];
}

interface IState {
  root: any;
  media: any;
  expand: any;
  expandOpen: any;
  avatar: any;
  expanded: boolean
}

const useStyles = makeStyles((theme) => ({
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
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

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

  handlePlay(uid: string) {
    alert(uid)
  }

  handlePause(uid: string) {
    alert(uid)
  }

  handleDelete(uid: string) {
    alert(uid)
  }
  render(){
    return (
      <Card className={this.state.root}>
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
          title={this.props.plans[0].name}
          subheader={this.props.plans[0].plan_uid}
        />
        <CardMedia
          className={this.state.media}
          image={Thumb}
          title="Thumbnail Image"
          component="img"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Something interesting.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={() => this.handlePlay(this.props.plans[0].plan_uid)} edge="end" aria-label="comments">
            <PlayCircleOutlineIcon />
          </IconButton>
          <IconButton onClick={() => this.handlePause(this.props.plans[0].plan_uid)} edge="end" aria-label="comments">
            <PauseCircleOutlineIcon />
          </IconButton>
          <IconButton onClick={() => this.handleDelete(this.props.plans[0].plan_uid)} edge="end" aria-label="comments">
            <DeleteForeverIcon />
          </IconButton>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
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
    );
  }
}
