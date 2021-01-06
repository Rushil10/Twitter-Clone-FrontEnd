import { Card, CardContent, CardMedia, Typography, withStyles } from '@material-ui/core'
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import MyButton from '../util/MyButton';
import ChatIcon from '@material-ui/icons/Chat'
import  FavoriteBorder  from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteScreen from '../components/DeleteScreen'
import ScreenDialog from '../components/ScreenDialog'
import LikeButton from './LikeButton'

const styles = {
    card: {
        position:'relative',
        display:'flex',
        marginBottom:20,
    },
    image:{
        minWidth:200,
    },
    content:{
        padding:25,
        objectFit:'cover',
    }
}

class Screen extends Component {
    render() {
        dayjs.extend(relativeTime);
        const {classes,screen:{body,createdAt,userImage,userHandle,screenId,likeCount,commentCount},
        user:{authenticated,credentials:{handle}}} = this.props;

        const deleteButton = authenticated  && userHandle === handle ? (
            <DeleteScreen screenId={screenId}/>
        ) : null
        return (
           <Card className={classes.card}>
               <CardMedia className={classes.image}
               image={userImage}
               title="Profile Image"/>
               <CardContent className={classes.content}>
                   <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                   {deleteButton}
                   <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                   <Typography variant="body1">{body}</Typography>
                   <LikeButton screenId={screenId} />
                   <span>{likeCount} Likes</span>
                   <MyButton tip="comment">
                       <ChatIcon color="primary" />
                   </MyButton>
                   <span>{commentCount} comments</span>
                   <ScreenDialog screenId={screenId} userHandle={userHandle} />
               </CardContent>
           </Card>
        )
    }
}

Screen.propTypes = {
    user:PropTypes.object.isRequired,
    screen:PropTypes.object.isRequired,
    classes:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user:state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Screen));
