import { combineReducers } from 'redux'
import { LOGINING_REQUEST, LOGIN_REQUEST_SUCC, LOGIN_REQUEST_FAIL, REQUEST_POSTS, RECEIVE_POSTS, SWITCH_SEARCH_BAR, REQUEST_CHANNELS, RECEIVE_CHANNELS, SELECT_CHANNEL, REMOVE_CHANNEL} from '../actions'

const loginRequest = (state = {isLogining: false, isLogined: false, loginFailed: false}, action) => {
    switch (action.type) {
        case LOGINING_REQUEST:
            return {
                ...state,
                isLogining: true,
                // username: action.username,
                // password: action.password,
            }
        case LOGIN_REQUEST_SUCC:
            return {
                ...state,
                isLogining: false,
                userToken: action.userToken,
                userInfo: action.userInfo,
                isLogined: true,
                loginFailed: false,
            }
        case LOGIN_REQUEST_FAIL:
            return {
                ...state,
                isLogining: false,
                loginFailed: true,
            }
        default:
            return state
    }
}

const fetchPosts = (state = {isFetchingPosts: false, posts: []}, action) => {
    switch(action.type) {
        case REQUEST_POSTS:
            return {
                ...state,
                isFetchingPosts: true
            }
        case RECEIVE_POSTS:
            return {
                ...state,
                isFetchingPosts: false,
                posts: action.posts,
                hasMore: action.hasMore,
            }
        default:
            return state
    }
}

const fetchChannels = (state = {isFetchingChannels: false, channels: []}, action) => {
    switch(action.type) {
        case REQUEST_CHANNELS:
            return {
                ...state,
                isFetchingChannels: true
            }
        case RECEIVE_CHANNELS:
            return {
                ...state,
                isFetchingChannels: false,
                channels: action.channels,
            }
        default:
            return state
    }
}

const switchSearchBar = (state = {searchBar: false}, action) => {
    switch(action.type){
        case SWITCH_SEARCH_BAR:
            return {
                ...state,
                searchBar: !state.searchBar,
            }
        default:
            return state
    }
}

const selectChannel = (state = {selectedChannel: []}, action) => {
    switch(action.type){
        case SELECT_CHANNEL:
            return {
                ...state,
                selectedChannel: selectedChannel.push(action.channelId)
            }
        case REMOVE_CHANNEL:
            return {
                ...state,
                selectedChannel: selectedChannel.filter(v => v != channelId)
            }
        default:
            return state
    }
}


const rootReducer = combineReducers ({
    loginRequest,
    fetchPosts,
    switchSearchBar,
    fetchChannels,
    selectChannel,
})

export default rootReducer
