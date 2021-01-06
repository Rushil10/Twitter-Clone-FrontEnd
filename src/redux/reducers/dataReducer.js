import {SET_SCREENS,LOADING_DATA,LIKE_SCREEN,UNLIKE_SCREEN, DELETE_SCREEN,POST_SCREEN, SET_SCREEN, SUBMIT_COMMENT} from '../types'

const initialState = {
    screens:[],
    screen:{},
    loading:false
}

export default function(state=initialState,action) {
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading:true,
            }
        case SET_SCREENS:
            return {
                ...state,
                screens:action.payload,
                loading:false
            }
        case LIKE_SCREEN:
        case UNLIKE_SCREEN:
            let index = state.screen.findIndex((screen) => screen.screenId === action.payload.screenId);
            state.screens[index]=action.payload
            if(state.screen.screenId === action.payload.screenId){
                state.screen = action.payload
            }
            return {
                ...state
            }
        case DELETE_SCREEN:
            index = state.screen.findIndex(screen => screen.screenId === action.payload)
            state.screens.splice(index,1);
            return {
                ...state
            }
        case POST_SCREEN:
            return{
                ...state,
                screens:[
                    action.payload,
                    ...state.screens
                ]
            }
        case SET_SCREEN:
            return {
                ...state,
                screen: action.payload
            }
        case SUBMIT_COMMENT:
            return {
                ...state,
                screen: {
                    ...state.screen,
                    comments: [action.payload, ...state.screen.comments]
                }
            }
        default:
            return state;
    }
}