import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types'
import MyButton from '../util/MyButton'

import {getScreen,clearErrors} from '../redux/actions/dataActions'
import { connect } from 'react-redux';
import { CircularProgress, createGenerateClassName, Dialog, DialogContent, Grid, Typography, withStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'
import ChatIcon from '@material-ui/icons/Chat'
import UnfoldMore from '@material-ui/icons/UnfoldMore'
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';

const styles = (theme) => ({
    ...theme.spreadThis,
    invisibleSeparator:{
        border:'none',
        margin:4,
    },
    visibleSeparator:{
        width:'100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom:20
    },
    profileImage:{
        maxWidth:200,
        height:200,
        borderRadius:'50%',
        objectFit:'cover'
    },
    dialogContent:{
        padding:20
    },
    expandButton: {
        position:'absolute',
        left:'90%'
    },
    spinnerDiv:{
        textAlign:'center',
        marginTop:50,
        marginBottom:50
    }
})

class ScreenDialog extends Component {
    state={
        open:false
    }

    handleOpen = () => {
        this.setState({open:true});
        this.props.getScreen(this.props.screenId);
    }

    handleClose = () => {
        this.setState({open:false});
        this.props.clearErrors();
    }

    render() {
        const {classes,screen:{screenId,body,createdAt,likeCount,commentCount,userImage,userHandle,comments},UI: {loading}} = this.props;

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2}/>
            </div>
        ) : (
            <Grid container spacing={16}>
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.profileImage}/>
                </Grid>
                <Grid item sm={7}>
                    <Typography component={Link} color="primary" variant="h5" to={`/users/${userHandle}`}>
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body1">
                        {body}
                    </Typography>
                    <LikeButton screenId={screenId} />
                    <span>{likeCount} likes</span>
                    <MyButton tip="comment">
                       <ChatIcon color="primary" />
                   </MyButton>
                   <span>{commentCount} comments</span>
                </Grid>
                <hr className={classes.visibleSeparator} />
                <CommentForm screenId={screenId} />
                <Comments comments={comments} />
            </Grid>
        )

        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tipClassName={classes.expandButton} tip="Expand Screen">
                    <UnfoldMore color="primary"/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                    <DialogContent className={classes.DialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

ScreenDialog.propTypes = {
    getScreen:PropTypes.func.isRequired,
    screenId:PropTypes.string.isRequired,
    userHandle:PropTypes.string.isRequired,
    screen:PropTypes.object.isRequired,
    UI:PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    screen:state.data.screen,
    UI:state.UI
})

const mapActionsToProps = {
    getScreen,
    clearErrors
}

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(ScreenDialog));