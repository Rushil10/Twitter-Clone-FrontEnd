import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import StaticProfile from '../components/StaticProfile'
import {connect} from 'react-redux'
import {getUserData} from '../redux/actions/dataActions'
import { Grid } from '@material-ui/core';
import Screen from '../components/Screen';

class user extends Component {

    state = {
        profile:null
    }

    componentDidMount() {
        const handle = this.props.match.params.handle;
        this.props.getUserData(handle)
        axios.get(`http://localhost:5000/social-10fac/us-central1/api/user/${handle}`)
        .then(res => {
            this.setState({
                profile:res.data.user
            })
        })
        .catch(err => console.log(err))
    }

    render() {

        const {screens , loading } = this.props.data

        const screensMarkup = loading ? (
            <p>Loading Data...</p>
        ) : screens === null ? (
            <p>No Screens from the User</p>
        ) : (
            screens.map(screen => <Screen key={screen.screenId} screen={screen} />)
        )

        return (
            <Grid container spacing={10}>
                    <Grid item sm={8} xs={12}>
                        {screensMarkup}
                    </Grid>
                    <Grid item sm={4} xs={12}>
                    {this.state.profile === null ? (
                        <p>Loading Profile...</p>
                    ) : (
                        <StaticProfile profile={this.state.profile} />
                    )}
                    </Grid>
            </Grid>
        )
    }
}

user.propTypes = {
    getUserData:PropTypes.func.isRequired,
    data:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data:state.data
})

export default connect(mapStateToProps,{getUserData})(user);
