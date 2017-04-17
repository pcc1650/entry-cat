import { combineReducers } from 'redux'
import * as Actions from '../actions'

const loginRequest = (state = {isLogining: false, isLogined: false, loginFailed: false, userToken: localStorage.getItem('userToken'), userInfo: JSON.parse(localStorage.getItem('userInfo'))}, action) => {
    switch (action.type) {
        case Actions.LOGINING_REQUEST:
            return {
                ...state,
                isLogining: true,
                // username: action.username,
                // password: action.password,
            }
        case Actions.LOGIN_REQUEST_SUCC:
            return {
                ...state,
                isLogining: false,
                userToken: action.userToken,
                userInfo: action.userInfo,
                isLogined: true,
                loginFailed: false,
            }
        case Actions.LOGIN_REQUEST_FAIL:
            return {
                ...state,
                isLogining: false,
                loginFailed: true,
            }
        case Actions.CLEAR_LOGIN_REDUCER:
            return {
                ...state,
                userToken: null,
                userInfo: null,
            }
        default:
            return state
    }
}

const logoutRequest = (state = {}, action) => {
    switch (action.type) {
        case Actions.LOGOUTING_REQUEST:
            return {
                ...state,
                // username: action.username,
                // password: action.password,
            }
        case Actions.LOGOUT_REQUEST_SUCC:
            return {
                ...state,
            }
        case Actions.LOGOUT_REQUEST_FAIL:
            return {
                ...state,
            }
        default:
            return state
    }
}

const fetchPosts = (state = {isFetchingPosts: false, posts: []}, action) => {
    switch(action.type) {
        case Actions.REQUEST_POSTS:
            return {
                ...state,
                isFetchingPosts: true,
            }
        case Actions.RECEIVE_POSTS:
            return {
                ...state,
                isFetchingPosts: false,
                posts: action.posts,
                hasMore: action.hasMorePosts,
            }
        default:
            return state
    }
}

const fetchChannels = (state = {isFetchingChannels: false, channels: []}, action) => {
    switch(action.type) {
        case Actions.REQUEST_CHANNELS:
            return {
                ...state,
                isFetchingChannels: true
            }
        case Actions.RECEIVE_CHANNELS:
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
        case Actions.SWITCH_SEARCH_BAR:
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
        case Actions.SELECT_CHANNEL:
            let newSeletedChannel = state.selectedChannel.slice()
            newSeletedChannel.push(action.channelId)
            return {
                ...state,
                selectedChannel: newSeletedChannel
            }
        case Actions.REMOVE_CHANNEL:
            return {
                ...state,
                selectedChannel: (state.selectedChannel.filter(v => v != action.channelId))
            }
        default:
            return state
    }
}

const fetchComments = (state = {isFetchingComments: false, comments: []}, action) => {
    switch(action.type) {
        case Actions.REQUEST_COMMENTS:
            return {
                ...state,
                isFetchingComments: true
            }
        case Actions.RECEIVE_COMMENTS:
            return {
                ...state,
                isFetchingComments: false,
                comments: action.comments,
                hasMoreComments: action.hasMoreComments,
            }
        default:
            return state
    }
}

const postCommentRequest = (state = { isPostingComment: false, isPosted: false}, action) =>{
    switch(action.type){
        case Actions.POSTING_COMMENT:
            return {
                ...state,
                isPostingComment: true,
            }
        case Actions.POST_COMMENT_SUCC:
            return {
                ...state,
                isPostingComment: false,
                isPosted: true,
            }
        case Actions.POST_COMMENT_FAIL:
            return {
                ...state,
                isPostingComment: false
            }
        case Actions.CHANGE_ISPOSTED_FALSE:
            return {
                ...state,
                isPosted: false,
            }
        default:
            return state
    }
}

const toggleCommentInput = (state = {commentInput: false, replyTo: ''}, action) => {
    switch(action.type){
        case Actions.ENABLE_COMMENT_INPUT:
            return {
                ...state,
                commentInput: true,
                replyTo: ''
            }
        case Actions.DISABLE_COMMENT_INPUT:
            return {
                ...state,
                commentInput: false,
            }
        case Actions.REPLY_COMMENT:
            return {
                ...state,
                commentInput: true,
                replyTo: action.replyTo
            }
        default:
            return state
    }
}

const toggleEventLike = (state = {isSendingLike: false, sentLike: false}, action) => {
    switch(action.type){
        case Actions.SENDING_LIKE:
            return {
                ...state,
                isSendingLike: true,
            }
        case Actions.SEND_LIKE_SUCC:
            return {
                ...state,
                isSendingLike: false,
                sentLike: true,
            }
        case Actions.SEND_LIKE_FAIL:
            return {
                ...state,
                isSendingLike: false,
            }
        case Actions.CHANGE_SENTLIKE_FALSE:
            return {
                ...state,
                senLike: false,
            }
        default:
            return state
    }
}

const fetchLikedUsers = (state = {isFetchingLikedUsers: false, likedUsers: []}, action) => {
    switch(action.type){
        case Actions.REQUESTING_LIKED_USERS:
            return {
                ...state,
                isFetchingLikedUsers: true,
            }
        case Actions.RECEIVE_LIKED_USERS:
            return {
                ...state,
                isFetchingLikedUsers: false,
                likedUsers: action.users,
            }
        default:
            return state
    }
}

const fetchJoinedUsers = (state = {isFetchingJoinedUsers: false, joinedUsers: []}, action) => {
    switch(action.type){
        case Actions.REQUESTING_JOINED_USERS:
            return {
                ...state,
                isFetchingJoinedUsers: true,
            }
        case Actions.RECEIVE_JOINED_USERS:
            return {
                ...state,
                isFetchingJoinedUsers: false,
                joinedUsers: action.users,
            }
        default:
            return state
    }
}

const fetchUser = (state = {isFetchingUser: false, user: {}}, action) => {
    switch(action.type){
        case Actions.REQUEST_USER:
            return {
                ...state,
                isFetchingUser: true,
            }
        case Actions.RECEIVE_USER:
            return {
                ...state,
                isFetchingUser: false,
                user: action.user
            }
        default:
            return state
    }
}

const fetchUserLike = (state = {isFetchingUserLike:false, userLike: {}}, action) => {
    switch(action.type){
        case Actions.REQUEST_USER_LIKE:
            return {
                ...state,
                isFetchingUserLike: true,
            }
        case Actions.RECEIVE_USER_LIKE:
            return {
                ...state,
                isFetchingUserLike:false,
                userLike: action.userLike,
            }
        default:
            return state
    }
}

const fetchUserGoing = (state = {isFetchingUserGoing:false, userGoing: {}}, action) => {
    switch(action.type){
        case Actions.REQUEST_USER_GOING:
            return {
                ...state,
                isFetchingUserGoing: true,
            }
        case Actions.RECEIVE_USER_GOING:
            return {
                ...state,
                isFetchingUserGoing:false,
                userGoing: action.userGoing,
            }
        default:
            return state
    }
}

const fetchUserPast = (state = {isFetchingUserPast:false, userPast: {}}, action) => {
    switch(action.type){
        case Actions.REQUEST_USER_PAST:
            return {
                ...state,
                isFetchingUserPast: true,
            }
        case Actions.RECEIVE_USER_PAST:
            return {
                ...state,
                isFetchingUserPast:false,
                userPast: action.userPast,
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
    fetchComments,
    postCommentRequest,
    toggleCommentInput,
    toggleEventLike,
    fetchLikedUsers,
    fetchJoinedUsers,
    fetchUser,
    fetchUserLike,
    fetchUserGoing,
    fetchUserPast,
    logoutRequest,
})

export default rootReducer
