import React, { Component,Fragment } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import MyButton from '../util/MyButton';
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import {deleteScreen} from '../redux/actions/dataActions'
import { Button, Dialog, DialogActions, DialogTitle,withStyles } from '@material-ui/core';

const styles = {
    deleteButton:{
        position:'absolute',
        left:'90%',
        top:'10%'
    }

}

class DeleteScreen extends Component {
    state = {
        open:false
    }
    handleOpen = () => {
        this.setState({open:true})
    }
    handleClose = () => {
        this.setState({open:false})
    }
    deleteScreen = () => {
        this.props.deleteScreen(this.props.screenId)
        this.setState({open:false})
    }
    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <MyButton tip="Delete Screen"
                onClick={this.handleOpen}
                btnClassName={classes.deleteButton}
                >
                    <DeleteOutline color="secondary" />
                </MyButton>
            <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            fullWidth
            maxWidth="sm"
            >
                <DialogTitle>
                    Are you sure you want to delete this screen ?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.deleteScreen} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            </Fragment>
        )
    }
}

DeleteScreen.propTypes = {
    deleteScreen: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    screenId: PropTypes.string.isRequired
}
export default connect(null,{deleteScreen})(withStyles(styles)(DeleteScreen));
