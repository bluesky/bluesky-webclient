import React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { IApplicationState } from './store';
import { submitPlan } from './planactions';
import { IPlanObject } from './queueserver';
import {
    RouteComponentProps
} from "react-router-dom";

interface IRun {
    uid: string,
    start: { time: number, uid: string, scan_id: number },
    streams: Array<string>
}
interface IState {
    run: IRun;
}

type RouteParams = { id: string, uid: string };

interface Props extends RouteComponentProps<RouteParams> { }

interface IProps extends RouteComponentProps {
    submitPlan: typeof submitPlan;
    loading: boolean;
    plan: IPlanObject;
}

class AcquirePage extends React.Component<IProps> {
    render() {
        return (
          <Container maxWidth="sm">
          <Box my={4}>
            <Typography variant="h4" component="h1" gutterBottom>
              This is where we will acquire data...
              <button onClick={this.handleSubmitClick}>Submit</button>
              </Typography>
              <Typography variant="h6" component="h1" gutterBottom>
              <div>
                  loading: {this.props.loading}.
              </div>
            </Typography>
            <div><pre>The pretty printed JSON:<br />
                { JSON.stringify(this.props.plan, null, 2) }</pre></div>
          </Box>
        </Container>
        )
    }

    private handleSubmitClick = () => {
        this.props.submitPlan();
    }

    componentDidMount() {
        //this.props.submitPlan();
    }
}

const mapStateToProps = (store: IApplicationState) => {
    return {
      loading: store.submitted.planLoading,
      plan: store.submitted.plan,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
      submitPlan: () => dispatch(submitPlan())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AcquirePage);
