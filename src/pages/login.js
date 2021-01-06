import { Button, CircularProgress, Grid, TextField, Typography, withStyles } from '@material-ui/core'
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import AppIcon from '../images/icon4.png';
import { Link } from 'react-router-dom';

import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/userActions'

const styles = (theme) => ({
    ...theme.spreadThis
})

class login extends Component {
    constructor(){
        super();
        this.state = {
            email:'',
            password:'',
            errors:{
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors){
            this.setState({errors : nextProps.UI.errors});
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email:this.state.email,
            password:this.state.password,
        }
        this.props.loginUser(userData,this.props.history)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    render() {
        const {classes, UI: {loading}} = this.props
        const {errors} = this.state
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="orange" />
                    <Typography variant="h3" className={classes.pageTitle}>Login</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" name="email" type="email" label="Email" className={classes.textfield} value={this.state.email}
                        onChange={this.handleChange} fullWidth 
                        helperText={errors.email} error={errors.email ? true : false} />
                        <TextField id="password" name="password" type="password" label="Password" className={classes.textfield} value={this.state.password}
                        onChange={this.handleChange} fullWidth
                        helperText={errors.password} error={errors.password ? true : false}
                        />
                        {errors.general && (
                            <Typography className={classes.customError} variant="body2">{errors.general}</Typography>
                        )}
                        <Button disabled={loading} type="submit" variant ="contained" color="primary" className={classes.button}>
                        Login
                        {loading && (
                            <CircularProgress size={30} className={classes.progress} />
                        )}
                        </Button>
                        {<br/>}
                        <small>don't have an acoount ? signup <Link to='/signup'>here</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user:PropTypes.object.isRequired,
    UI:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user:state.user,
    UI:state.UI
})

const mapActionsToProps = {
    loginUser
}

 export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(login));