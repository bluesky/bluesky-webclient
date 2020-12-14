import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { getPreviewsAction } from './planactions';
import { getPreviews } from './queueserver'

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

type PreviewsProps = {
  getPreviewsAction: typeof getPreviewsAction;
  runUid: string;
  previews: {[uid: string]: string[]} 
  enabled: boolean;
  live: boolean;
}
  
type PreviewsState = {
  value: number;
  previews: string[];
}

export class Previews extends React.Component<PreviewsProps, PreviewsState> {

  public constructor(props: PreviewsProps) {
    super(props);
    this.state = {
      value: 0,
      previews: [],
    };
  }

  private handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    this.setState({value: newValue});
  };

  private getPreviewsInternal(){
    if (this.props.runUid !== undefined){
      getPreviews(this.props.runUid).then((result) => {
        this.setState({previews: result})
        console.log(JSON.stringify(this.state.previews))
      })
    }
    
    /*
    if ((this.props.previews === undefined) || (this.props.runUid === undefined)){
      return;
    } else {
      if (this.props.enabled){
        if (this.props.live){
          alert(this.props.runUid)
          this.props.getPreviews(this.props.runUid)
        } else {
          if (this.props.previews[this.props.runUid] === undefined){
            this.props.getPreviews(this.props.runUid)
          }
        }
      }
    }
    */
  }

  componentDidMount(){
    setInterval(this.getPreviewsInternal.bind(this), 5000); 
  }

  render(){ 
    if ((this.state.previews === undefined) || (this.props.runUid === undefined)) {
      return null;
    }
    if (this.state.previews.length > 0){
      return (
        <div>
          <AppBar position="static" color="default">
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
                {this.state.previews.map(
                (preview: string) => (
                    <Tab label={preview} />
                ))}
            </Tabs>
          </AppBar>
          {this.state.previews.map(
                (preview: string, index: number) => (
                  <TabPanel value={this.state.value} index={index}>
                    <img src={`http://localhost:8000/${this.props.runUid}/${preview}`} width="100%" />
                  </TabPanel>
                ))}
        </div>
      );
    } else {
      return null;
    }
      }
}