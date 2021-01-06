import React, { Component,Fragment } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import MyButton from '../util/MyButton'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

import {postScreen,clearErrors} from '../redux/actions/dataActions';
import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, TextField, withStyles } from '@material-ui/core'

const styles = (theme) => ({
    ...theme.spreadThis,
    submitButton:{
        position:'relative',
        marginTop:10,
    },
    progressSpinner: {
        position:'absolute'
    },
    closeButton: {
        position:'absolute',
        left:'92%',
        top:'6%'
    }
})

class PostScreen extends Component {
    state={
        open:false,
        body:'',
        errors:{}
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors){
            this.setState({
                errors:nextProps.UI.errors
            })
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({body:''})
            this.setState({open:false , errors:{}})
        }
    }

    handleOpen = () => {
        this.setState({open:true})
    }

    handleClose = () => {
        this.props.clearErrors();
        this.setState({open:false , errors:{}})
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.postScreen({body: this.state.body});
    }

    render() {
        const {errors} = this.state;
        const {classes,UI:{loading}} = this.props;
        return(
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Post a Screen !">
                    <AddIcon/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                    <DialogTitle>Post A New Screen</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField 
                            name="body"
                            type="text"
                            label="SCREEN :)"
                            multiline
                            rows="3"
                            placeholder="Ghost A Screen"
                            error={errors.body ? true : false}
                            helperText={errors.body}
                            className={classes.TextField}
                            onChange={this.handleChange}
                            fullWidth
                            />
                            <Button type="Submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                                Submit
                                {loading && (
                                    <CircularProgress size={30} className={classes.progressSpinner}/>
                                )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostScreen.propTypes = {
    postScreen:PropTypes.func.isRequired,
    clearErrors:PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI:state.UI
})

export default connect(mapStateToProps,{postScreen,clearErrors})(withStyles(styles)(PostScreen));