import {SET_USER,SET_ERRORS,CLEAR_ERRORS,LOADING_UI, SET_AUTHENTICATED, SET_UNAUTHENTICATED,LOADING_USER,LIKE_SCREEN,UNLIKE_SCREEN} from '../types'

const initialState = {
    authenticated:false,
    credentials:{},
    likes:[],
    loading:false
};

export default function(state = initialState,action){
    switch(action.type){
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated:true
            }
        case SET_UNAUTHENTICATED:
            return initialState
        case SET_USER:
            return {
                authenticated:true,
                ...action.payload,
                loading:false,
            }
        case LOADING_USER:
            return {
                ...state,
                loading:true
            }
        case LIKE_SCREEN:
            return {
                ...state,
                likes:[
                    ...state.likes,
                    {
                        userHandle:state.credentials.handle,
                        screenId:action.payload.screenId
                    }
                ]
            }
        case UNLIKE_SCREEN:
            return {
                ...state,
                likes:state.likes.filter(like => like.screenId  !== action.payload.screenId)
            }
        default:
            return state;
    }
}