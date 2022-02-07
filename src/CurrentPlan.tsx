import React from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IPlanObject } from './queueserver';
import { Box, GridList, GridListTile } from '@material-ui/core';
import { Previews } from './Previews';
import { getActiveRuns } from './queueserver'
import { IAllowedPlans } from './queueserver';

type Plans = {
  plans: IPlanObject[];
  allowedPlans: IAllowedPlans;
}

interface IState {
  root: any;
  media: any;
  expand: any;
  expandOpen: any;
  avatar: any;
  expanded: boolean;
  activeRun: any;
  activeRunsId: any,
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
   console.log(this.state.activeRun)
   if (plans.length === 0) {
      return "Current Plan";
    } else {
      return plans[0].name;
    }
  }

  getDescription(plansAllowed: IAllowedPlans, name: string){
    if (name === "Current Plan" || name == ""){
      return null;
    } else {
       if (plansAllowed.plans_allowed[name]['description'] != undefined) {
        return plansAllowed.plans_allowed[name]['description'];
       } else
        return "";
    }
  }

  getActiveUids(){
    getActiveRuns().then((result) => {
      if (result !== undefined && result.length > 0 && result[0] !== undefined) {
        this.setState({ activeRun: result[0] })
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
        <Box height="1vh"></Box>
        <Typography style={{ fontWeight: 500, height: 48 }} align="center" variant="h4" component="h1" gutterBottom>
          Current Plan
          <IconButton disabled edge="end" aria-label="comments">
          </IconButton>
        </Typography>
      <Box height="2vh"></Box>
      <Card raised={true} >
          <GridList spacing={3} cellHeight="auto">
            <GridListTile key="Subheader" cols={2} style={{ color: "black", border:5, height: 'auto'}}>
            </GridListTile>
            <GridListTile cols={2} style={{ height: 'auto' }}>
              <CardContent>
                { this.state.activeRun.uid ? <Previews width="100%" runUid={this.state.activeRun.uid}/> : 
                  <Typography align="center" variant="h5" component="h1" >
                    Press the queue play button to start the plan.
                  </Typography> }            
              </CardContent>
            </GridListTile>
          </GridList>
          <CardActions disableSpacing>
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
