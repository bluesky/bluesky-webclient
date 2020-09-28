import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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

class AcquirePage extends React.Component<Props, IState> {
    public constructor(props: Props) {
        super(props);
        this.state = {
            run: {
                uid: "undefined",
                start: {
                    time: 0,
                    uid: "undefined",
                    scan_id: -1,
                },
                streams: [ "" ]
            }
        };
    }

    render() {
        return (
          <Container maxWidth="sm">
          <Box my={4}>
            <Typography variant="h4" component="h1" gutterBottom>
              This is where we will acquire data {this.props.match.params.uid}
              </Typography>
              <Typography variant="h6" component="h1" gutterBottom>
              <div>
                  scan_id: {this.state.run.start.scan_id} with&nbsp;
                  {this.state.run.streams.length} streams.
              </div>
            </Typography>
            <div><pre>The pretty printed JSON:<br />
                { JSON.stringify(this.state.run, null, 2) }</pre></div>
          </Box>
        </Container>
        )
    }

    componentDidMount() {
        var catalogUrl = `/db/runs/${this.props.match.params.id}/${this.props.match.params.uid}`;
        fetch(catalogUrl)
            .then(res => res.json())
            .then((data) => {
                this.setState({ run: data })
                console.log(data)
            })
            .catch(console.log)
    }
}

export default AcquirePage;