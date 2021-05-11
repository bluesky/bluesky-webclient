import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import configureStore from './store';
import { IApplicationState } from './store'
import theme from './theme';
import Routes from './routes';
import { PlanDrawer } from './PlanDrawer';

interface IProps {
  store: Store<IApplicationState>;
}
const Root: React.FunctionComponent<IProps> = props => {
  return (
    <Provider store={props.store}>
      <Routes />
    </Provider>
  );
};

const store = configureStore();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <Root store={store} />
    <CssBaseline />
    <div />
  </ThemeProvider>,
  document.querySelector('#root'),
);
