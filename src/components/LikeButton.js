import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {likeScreen,unlikeScreen} from '../redux/actions/dataActions'
import PropTypes from 'prop-types'
import MyButton from '../util/MyButton';
import ChatIcon from '@material-ui/icons/Chat'
import  FavoriteBorder  from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

class LikeButton extends Component {
    likedScreen = () => {
        if(this.props.user.likes && this.props.user.likes.find(like => like.screenId === this.props.screenId)) {
            return true;
        } else {
            return false;
        }
    }

    likeScreen = () => {
        this.props.likeScreen(this.props.screenId)
    }

    unlikeScreen = () => {
        this.props.unlikeScreen(this.props.screenId)
    }

    render() {
        const {authenticated} = this.props.user;
        const likeButton =!authenticated ? (
            <MyButton tip="Like">
                <Link to="/login">
                    <FavoriteBorder color="primary" />
                </Link>
            </MyButton>
        ) : (
            this.likedScreen() ? (
                <MyButton tip="Undo Like" onClick={this.unlikeScreen}>
                    <FavoriteIcon color="primary" />
                </MyButton>
            ) : (
                <MyButton tip="Like" onClick={this.likeScreen}>
                    <FavoriteBorder color="primary" />
                </MyButton>
            )
        )
        return likeButton;
    }
}

LikeButton.propTypes = {
    likeScreen:PropTypes.func.isRequired,
    unlikeScreen:PropTypes.func.isRequired,
    user:PropTypes.object.isRequired,
    //screen:PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    user:state.user
})

const mapActionsToProps = {
    likeScreen,
    unlikeScreen
}

export default connect(mapStateToProps,mapActionsToProps)(LikeButton);
