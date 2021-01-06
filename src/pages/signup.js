import { Button, CircularProgress, Grid, TextField, Typography, withStyles } from '@material-ui/core'
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import AppIcon from '../images/icon4.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import {signupUser} from '../redux/actions/userActions'

const styles = (theme) => ({
    ...theme.spreadThis
})

class signup extends Component {
    constructor(){
        super();
        this.state = {
            email:'',
            password:'',
            confirmPassword:'',
            handle:'',
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
        this.setState({
            loading:true
        })
        const newUserData = {
            email:this.state.email,
            password:this.state.password,
            confirmPassword:this.state.confirmPassword,
            handle:this.state.handle
        }
        this.props.signupUser(newUserData,this.props.history);

    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    render() {
        const {classes,UI:{loading}} = this.props
        const {errors} = this.state
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="orange" />
                    <Typography variant="h3" className={classes.pageTitle}>Signup</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" name="email" type="email" label="Email" className={classes.textfield} value={this.state.email}
                        onChange={this.handleChange} fullWidth 
                        helperText={errors.email} error={errors.email ? true : false} />
                        <TextField id="password" name="password" type="password" label="Password" className={classes.textfield} value={this.state.password}
                        onChange={this.handleChange} fullWidth
                        helperText={errors.password} error={errors.password ? true : false}
                        />
                        <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" className={classes.textfield} value={this.state.confirmPassword}
                        onChange={this.handleChange} fullWidth 
                        helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false} />
                        <TextField id="handle" name="handle" type="text" label="Handle" className={classes.textfield} value={this.state.handle}
                        onChange={this.handleChange} fullWidth 
                        helperText={errors.handle} error={errors.handle ? true : false} />
                        {errors.general && (
                            <Typography className={classes.customError} variant="body2">{errors.general}</Typography>
                        )}
                        <Button disabled={loading} type="submit" variant ="contained" color="primary" className={classes.button}>
                        Signup
                        {loading && (
                            <CircularProgress size={30} className={classes.progress} />
                        )}
                        </Button>
                        {<br/>}
                        <small>Already have an acoount ? login <Link to='/login'>here</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user:PropTypes.object.isRequired,
    UI:PropTypes.object.isRequired,
    logoutUser:PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user:state.user,
    UI : state.UI
})

 export default connect(mapStateToProps,{signupUser})(withStyles(styles)(signup));