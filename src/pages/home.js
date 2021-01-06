import React, { Component } from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import Screen from '../components/Screen';
import Profile from '../components/Profile'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {getScreens} from '../redux/actions/dataActions'

class home extends Component {
    componentDidMount(){
        this.props.getScreens();
    }
    render() {
        const {screens,loading} = this.props.data;
        let recentScreensMarkup= !loading ? (
            screens.map(screen => <Screen screen={screen} key={screen.screenId}/>)
        ) : <p>Loading...</p>
        return (
            <div>
                <Grid container spacing={10}>
                    <Grid item sm={8} xs={12}>
                        {recentScreensMarkup}
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <Profile />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

home.propTypes = {
    getScreens:PropTypes.func.isRequired,
    data:PropTypes.object.isRequired
}

const mapStateToProps =state => ({
    data:state.data
})

export default connect(mapStateToProps,{getScreens})(home);
