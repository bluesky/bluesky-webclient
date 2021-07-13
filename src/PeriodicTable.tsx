
//The following periodic table data is from: https://github.com/Bowserinator/Periodic-Table-JSON



import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { Box, Button, Grid, GridList, GridListTile, Paper } from '@material-ui/core';

type IProps = {
  submit: (selectedElement: string) => void;
  hideForm: () => void;
}

interface IState {
  selectedElement: string;
}

function FormRow() {
    return (
      <React.Fragment>
        {[1,2,3,4,5].map((row: number, index) => (
                <Grid item xs={4}>
                  <Paper>{index}</Paper>
                </Grid>
        ))}
      </React.Fragment>
    );
  }

export class GenericPlanForm extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedElement: "",
    }
  }

  private submit(){
    alert(this.state.selectedElement);
  }

  render(){
    return (
          <Card raised={true}>
            <CardContent>
                <Grid container spacing={1}>
                    <Grid container item xs={12} spacing={3}>
                        <FormRow />
                    </Grid>
                    <Grid container item xs={12} spacing={3}>
                        <FormRow />
                    </Grid>
                    <Grid container item xs={12} spacing={3}>
                        <FormRow />
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions disableSpacing style={{ width: '100%', justifyContent: 'flex-end' }}>
                <Button onClick={() => this.submit()}  variant="contained" color="primary">
                  select
                </Button>
            </CardActions>
          </Card>
    );
  }
}