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
  runUid: string;
  enabled: boolean;
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
    if (this.props.enabled){
      if (this.props.runUid){
        getPreviews(this.props.runUid).then((result) => {
          this.setState({previews: result})
        })
      }
    }
  }

  componentDidMount(){
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