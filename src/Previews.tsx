import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { getPreviews } from './queueserver'

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;  // Used to keep track of which panel is active.
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
  runUid: string;
  width: string;
}
  
type PreviewsState = {
  value: number;
  previews: string[];
  intervalId: any;
}

export class Previews extends React.Component<PreviewsProps, PreviewsState> {

  public constructor(props: PreviewsProps) {
    super(props);
    this.state = {
      value: 0,
      previews: [],
      intervalId: 0
    };
  }

  private handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    this.setState({value: newValue});
  };

  private getPreviewsInternal(){
      if (this.props.runUid){
        getPreviews(this.props.runUid).then((result) => {
          this.setState({previews: result})
        })
      }
  }

  componentDidMount(){
    this.getPreviewsInternal.bind(this)
    this.setState({intervalId: setInterval(this.getPreviewsInternal.bind(this), 1000)});
  }

  componentWillUnmount(){
    clearInterval(this.state.intervalId);
  }

  render(){ 
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
                (preview: string, index: number) => (
                    <Tab label={preview} key={index} />
                ))}
            </Tabs>
          </AppBar>
          {this.state.previews.map(
                (preview: string, index: number) => (
                  <TabPanel value={this.state.value} index={index} key={index}>
                    <img src={`${process.env.REACT_APP_PREVIEW_SERVER}/${this.props.runUid}/${preview}?${Math.random()}`} alt={"preview"} width={this.props.width}/>
                  </TabPanel>
                ))}
        </div>
      );
    } else {
      return null;
    }
      }
}
