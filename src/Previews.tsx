import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

type PreviewsProps = {
  run_uid: string;
  previews: string[];
}
  
type PreviewsState = {
  value: number;
}

export class Previews extends React.Component<PreviewsProps, PreviewsState> {

  public constructor(props: PreviewsProps) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  private handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    this.setState({value: newValue});
  };

  render(){ 
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
            {this.props.previews.map(
            (preview: string) => (
                <Tab label={preview} />
            ))}
        </Tabs>
      </AppBar>
      {this.props.previews.map(
            (preview: string, index: number) => (
              <TabPanel value={this.state.value} index={index}>
                <img src={`http://localhost:8000/${this.props.run_uid}/${preview}`} width="100%" />
              </TabPanel>
            ))}
    </div>
  );}
}