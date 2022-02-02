import React from 'react';
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';


interface IPropsBulk {
    submitExcel: (files: File[]) => void;
}

interface IState {
  open: boolean,
  files: File[],
}

export class BulkAdd extends React.Component<IPropsBulk, IState> {
    constructor(props: IPropsBulk) {
        super(props);
        this.state = {
            open: false,
            files: []
        };
    }

    handleClose() {
        this.setState({
            open: false
        });
    }

    handleSave(files: File[]) {
        //Saving files to state for further use and closing Modal.
        this.props.submitExcel(files);
        this.setState({
            files: files,
            open: false
        });
    }

    handleOpen() {
        this.setState({
            open: true,
        });
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleOpen.bind(this)} variant="contained" color="primary">
                  Upload
                </Button>
                <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSave.bind(this)}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
                    showPreviews={true}
                    filesLimit={1}
                    maxFileSize={5000000}
                    onClose={this.handleClose.bind(this)}
                />
            </div>
        );
    }
}