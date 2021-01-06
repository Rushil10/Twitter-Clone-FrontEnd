import {SET_SCREENS,LOADING_DATA,LIKE_SCREEN,UNLIKE_SCREEN, SET_ERRORS,DELETE_SCREEN, LOADING_UI, CLEAR_ERRORS,POST_SCREEN, SET_SCREEN,STOP_LOADING_UI, SUBMIT_COMMENT} from '../types'
import axios from 'axios';

export const getScreens = () => dispatch => {
    dispatch({type:LOADING_DATA})
    axios.get('http://localhost:5000/social-10fac/us-central1/api/screens')
    .then(res => {
        dispatch({
            type:SET_SCREENS,
            payload:res.data
        })
    })
    .catch(err => {
        dispatch({
            type:SET_SCREENS,
            payload:[]
        })
    })
}

export const postScreen = (newScreen) => dispatch => {
    dispatch({type:LOADING_UI})
    axios.post('http://localhost:5000/social-10fac/us-central1/api/screen',newScreen)
    .then(res => {
        dispatch({
            type:POST_SCREEN,
            payload: res.data
        });
        dispatch({type:CLEAR_ERRORS})
    })
    .catch(err => {
        dispatch({
            type:SET_ERRORS,
            payload:err.response.data
        })
    })
}

export const likeScreen = (screenId) => dispatch => {
    axios.get(`http://localhost:5000/social-10fac/us-central1/api/screen/${screenId}/like`)
    .then(res => {
        dispatch({
            type:LIKE_SCREEN,
            payload:res.data
        })
    })
    .catch(err => console.log(err))
}

export const unlikeScreen = (screenId) => dispatch => {
    axios.get(`http://localhost:5000/social-10fac/us-central1/api/screen/${screenId}/unlike`)
    .then(res => {
        dispatch({
            type:UNLIKE_SCREEN,
            payload:res.data
        })
    })
    .catch(err => console.log(err))
}

export const getScreen = (screenId) => dispatch => {
    dispatch({type:LOADING_UI});
    axios.get(`http://localhost:5000/social-10fac/us-central1/api/screen/${screenId}`)
    .then(res => {
        dispatch({
            type: SET_SCREEN,
            payload:res.data
        });
        dispatch({type:STOP_LOADING_UI})
    })
    .catch(err => console.log(err))
}

export const deleteScreen = (screenId) => dispatch => {
    axios.delete(`http://localhost:5000/social-10fac/us-central1/api/screen/${screenId}`)
    .then(() => {
        dispatch({type:DELETE_SCREEN,payload:screenId})
    })
    .catch(err => {
        console.log(err);
    })
}

export const submitComment = (screenId,commentData) => dispatch => {
    axios.post(`http://localhost:5000/social-10fac/us-central1/api/screen/${screenId}/comment`,commentData)
    .then(res => {
        dispatch({
            type:SUBMIT_COMMENT,
            payload:res.data
        })
        dispatch(clearErrors())
    })
    .catch(err => {
        dispatch({
            type:SET_ERRORS,
            payload:err.response.data
        })
    })
}

export const getUserData = (userHandle) => dispatch => {
    dispatch({type:LOADING_DATA})
    axios.get(`http://localhost:5000/social-10fac/us-central1/api//user/${userHandle}`)
    .then(res => {
            dispatch({
                type:SET_SCREENS,
                payload:res.data.screens
            })
    })
    .catch(() => {
        dispatch({
            type:SET_SCREENS,
            payload:null
        })
    })
}

export const clearErrors = () => dispatch => {
    dispatch({type:CLEAR_ERRORS})
}