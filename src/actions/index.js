export const LOGINING_REQUEST = 'LOGINING_REQUEST'
export const LOGIN_REQUEST_SUCC = 'LOGIN_REQUEST_SUCC'
export const LOGIN_REQUEST_FAIL = 'LOGIN_REQUEST_FAIL'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const REQUEST_CHANNELS = 'REQUEST_CHANNELS'
export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS'
export const SWITCH_SEARCH_BAR = 'SWITCH_SEARCH_BAR'
export const SELECT_CHANNEL = 'SELECT_CHANNEL'
export const REMOVE_CHANNEL = 'REMOVE_CHANNEL'
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const POSTING_COMMENT = 'POSTING_COMMENT'
export const POST_COMMENT_SUCC = 'POST_COMMENT_SUCC'
export const POST_COMMENT_FAIL = 'POST_COMMENT_FAIL'
export const CHANGE_ISPOSTED_FALSE = 'CHANGE_ISPOSTED_FALSE'
export const ENABLE_COMMENT_INPUT = 'ENABLE_COMMENT_INPUT'
export const DISABLE_COMMENT_INPUT = 'DISABLE_COMMENT_INPUT'
export const REPLY_COMMENT = 'REPLY_COMMENT'
export const SENDING_LIKE = 'SENDING_LIKE'
export const SEND_LIKE_SUCC = 'SEND_LIKE_SUCC'
export const SEND_LIKE_FAIL = 'SEND_LIKE_FAIL'
export const REQUESTING_LIKED_USERS = 'REQUESTING_LIKED_USERS'
export const RECEIVE_LIKED_USERS = 'RECEIVE_LIKED_USERS'
export const SENDING_JOIN = 'SENDING_JOIN'
export const SEND_JOIN_SUCC = 'SEND_JOIN_SUCC'
export const SEND_JOIN_FAIL = 'SEND_JOIN_FAIL'
export const REQUESTING_JOINED_USERS = 'REQUESTING_JOINED_USERS'
export const RECEIVE_JOINED_USERS = 'RECEIVE_JOINED_USERS'
export const REQUEST_USER = 'REQUEST_USER'
export const RECEIVE_USER = 'RECEIVE_USER'
export const REQUEST_USER_LIKE = 'REQUEST_USER_LIKE'
export const RECEIVE_USER_LIKE = 'RECEIVE_USER_LIKE'
export const REQUEST_USER_GOING = 'REQUEST_USER_GOING'
export const RECEIVE_USER_GOING = 'RECEIVE_USER_GOING'
export const REQUEST_USER_PAST = 'REQUEST_USER_PAST'
export const RECEIVE_USER_PAST = 'RECEIVE_USER_PAST'
// import { getIPs } from '../getIP'
// getIPs(function(ip){console.log(ip);})

const ipAddress = 'http://10.2.202.31:8081'
// const ipAddress = 'http://192.168.33.10'

export const loginingRequest = () => ({
    type: LOGINING_REQUEST,
})

export const loginRequestSucc = (data) => ({
    type: LOGIN_REQUEST_SUCC,
    userToken: data.token,
    userInfo: data.user,
})

export const loginRequestFail = () => ({
    type: LOGIN_REQUEST_FAIL,
})

export const requestingPosts = () => ({
    type: REQUEST_POSTS,
})

export const receivePosts = (data) => ({
    type: RECEIVE_POSTS,
    posts: data.events,
    hasMorePosts: data.has_more
})

export const requestingChannels = () => ({
    type: REQUEST_CHANNELS,
})

export const receiveChannels = (data) => ({
    type: RECEIVE_CHANNELS,
    channels: data.channels,
})

export const switchingSearchBar = () => ({
    type: SWITCH_SEARCH_BAR
})

export const selectingChannel = (id) => ({
    type: SELECT_CHANNEL,
    channelId: id,
})

export const removingChannel = (id) => ({
    type: REMOVE_CHANNEL,
    channelId: id,
})

export const requestingComments = () => ({
    type: REQUEST_COMMENTS,
})

export const receiveComments = (data) => ({
    type: RECEIVE_COMMENTS,
    comments: data.comments,
    hasMoreComments: data.has_more,
})

export const postingComment = () => ({
    type: POSTING_COMMENT,
})

export const postCommentSucc = () => ({
    type: POST_COMMENT_SUCC,
})

export const postCommentFail = () => ({
    type: POST_COMMENT_FAIL,
})

export const changeIsPostedFalse = () => ({
    type: CHANGE_ISPOSTED_FALSE,
})

export const enableCommentInput = () => ({
    type: ENABLE_COMMENT_INPUT,
})

export const disableCommentInput = () => ({
    type: DISABLE_COMMENT_INPUT,
})

export const replyComment = (author) => ({
    type: REPLY_COMMENT,
    replyTo: author,
})

export const sendingLike = () => ({
    type: SENDING_LIKE,
})

export const sendLikeSucc = () => ({
    type: SEND_LIKE_SUCC,
})

export const sendLikeFail = () => ({
    type: SEND_LIKE_FAIL,
})

export const requestingLikedUsers = () => ({
    type: REQUESTING_LIKED_USERS
})

export const receiveLikedUsers = (data) => ({
    type: RECEIVE_LIKED_USERS,
    users: data.users
})

export const sendingJoin = () => ({
    type: SENDING_JOIN,
})

export const sendJoinSucc = () => ({
    type: SEND_JOIN_SUCC,
})

export const sendJoinFail = () => ({
    type: SEND_JOIN_FAIL,
})

export const requestingJoinedUsers = () => ({
    type: REQUESTING_JOINED_USERS
})

export const receiveJoinedUsers = (data) => ({
    type: RECEIVE_JOINED_USERS,
    users: data.users
})

export const requestingUser = () => ({
    type: REQUEST_USER,
})

export const receiveUser = (data) => ({
    type: RECEIVE_USER,
    user: data,
})

export const requestingUserLike = () => ({
    type: REQUEST_USER_LIKE,
})

export const receiveUserLike = (data) => ({
    type: RECEIVE_USER_LIKE,
    userLike: data
})

export const requestingUserGoing = () => ({
    type: REQUEST_USER_GOING,
})

export const receiveUserGoing = (data) => ({
    type: RECEIVE_USER_GOING,
    userGoing: data
})

export const requestingUserPast = () => ({
    type: REQUEST_USER_PAST,
})

export const receiveUserPast = (data) => ({
    type: RECEIVE_USER_PAST,
    userPast: data
})

export const requestPosts = (credential) => dispatch => {
    dispatch(requestingPosts())
    return fetch(ipAddress + '/api/events', {headers: {'X-BLACKCAT-TOKEN': credential}})
        .then(response => response.ok? response.json(): false)
        .then(body => body? dispatch(receivePosts(body)): console.log('fail to fetch posts'))
}

export const requestPostsWithFilter = (credential, filterCondition) => dispatch => {
    let url = ipAddress + '/api/events?channels=' + filterCondition.selectedChannel.toString()
    dispatch(requestingPosts())
    return fetch(url, {headers: {'X-BLACKCAT-TOKEN': credential}})
        .then(response => response.ok? response.json(): false)
        .then(body => body? dispatch(receivePosts(body)): console.log('fail to fetch filtered posts'))
}

export const requestChannels = (credential) => dispatch => {
    dispatch(requestingChannels())
    return fetch(ipAddress + '/api/channels', {headers: {'X-BLACKCAT-TOKEN': credential}})
        .then(response => response.ok? response.json(): false)
        .then(body => body? dispatch(receiveChannels(body)): console.log('fail to fetch channels'))
}


export const requestComments = (eventId, credential) => dispatch => {
    let url = ipAddress + '/api/event/'+eventId+'/comments'
    dispatch(requestingComments())
    return fetch(url, {headers: {'X-BLACKCAT-TOKEN': credential}})
    .then(response => response.ok? response.json(): false)
    .then(body => body? dispatch(receiveComments(body)): console.log('fail to fetch comments'))
}



export const login = info => dispatch => {
    dispatch(loginingRequest())
    // You cannot view the data in FormData by console.log() but it actually exists.
    let form = new FormData()
    Object.entries(info).map(([k, v]) => form.append([k, v][0], [k, v][1]))
    // return fetch('http://blackcat.dev/api/auth/token', {method: 'POST', body: form})
    return fetch(ipAddress + '/api/auth/token', {method: 'POST', body: form, headers: {'Host': 'blackcat.dev'}})
    .then(response => response.ok? response.json(): false)
    .then(body => body? dispatch(loginRequestSucc(body)): dispatch(loginRequestFail()))
}

export const postComment = (comment, eventId, credential) => dispatch => {
    dispatch(postingComment())
    let form = new FormData()
    form.append('comment', comment)
    return fetch(ipAddress + '/api/event/' + eventId + '/comments', {method: 'POST', body: form, headers: {'X-BLACKCAT-TOKEN': credential}})
    .then(response => response.ok? dispatch(postCommentSucc()): dispatch(postCommentFail()))
    .then(setTimeout(()=>{
        dispatch(changeIsPostedFalse())
    }, 500))
}

export const sendLike = (eventId, credential) => dispatch => {
    dispatch(sendingLike())
    return fetch(ipAddress + '/api/event/' + eventId + '/likes', {method: 'POST', headers: {'X-BLACKCAT-TOKEN': credential}})
    .then(response => response.ok? dispatch(sendLikeSucc()): dispatch(sendLikeFail()))
}

export const cancelLike = (eventId, credential, userId) => dispatch => {
    dispatch(sendingLike())
    return fetch(ipAddress+ '/api/event/' + eventId + '/likes/' + userId, {method: 'DELETE', headers: {'X-BLACKCAT-TOKEN': credential}})
    .then(response => response.ok? dispatch(sendLikeSucc()): dispatch(sendLikeFail()))
}

export const requestLikedUsers = (eventId, credential) => dispatch => {
    dispatch(requestingLikedUsers())
    return fetch(ipAddress + '/api/event/' + eventId + '/likes', {
        headers: {
            'X-BLACKCAT-TOKEN': credential,
            // 'Host': 'domain name'
        }})
        .then(response => response.ok? response.json(): false)
        .then(body => body? dispatch(receiveLikedUsers(body)): console.log('fail to fetch liked users'))
}

export const sendJoin = (eventId, credential) => dispatch => {
    dispatch(sendingJoin())
    return fetch(ipAddress + '/api/event/' + eventId + '/participants', {method: 'POST', headers: {'X-BLACKCAT-TOKEN': credential}})
    .then(response => response.ok? dispatch(sendJoinSucc()): dispatch(sendJoinFail()))
}

export const cancelJoin = (eventId, credential, userId) => dispatch => {
    dispatch(sendingJoin())
    return fetch(ipAddress + '/api/event/' + eventId + '/participants/' + userId, {method: 'DELETE', headers: {'X-BLACKCAT-TOKEN': credential}})
    .then(response => response.ok? dispatch(sendJoinSucc()): dispatch(sendJoinFail()))
}

export const requestJoinedUsers = (eventId, credential) => dispatch => {
    dispatch(requestingJoinedUsers())
    return fetch(ipAddress + '/api/event/' + eventId + '/participants', {headers: {'X-BLACKCAT-TOKEN': credential}})
        .then(response => response.ok? response.json(): false)
        .then(body => body? dispatch(receiveJoinedUsers(body)): console.log('fail to fetch joined users'))
}

export const requestUser = (userId, credential) => dispatch => {
    dispatch(requestingUser())
    return fetch(ipAddress + '/api/user/' + userId, {headers: {'X-BLACKCAT-TOKEN': credential}})
        .then(response => response.ok? response.json(): false)
        .then(body => body? dispatch(receiveUser(body)): console.log('fail to fetch user profile'))
}

export const requestUserLike = (userId, credential) => dispatch => {
    dispatch(requestingUserLike())
    return fetch(ipAddress + '/api/user/' + userId + '/events?type=liked', {headers: {'X-BLACKCAT-TOKEN': credential}})
        .then(response => response.ok? response.json(): false)
        .then(body => body? dispatch(receiveUserLike(body)): console.log('fail to fetch user likes'))
}

export const requestUserGoing = (userId, credential) => dispatch => {
    dispatch(requestingUserGoing())
    return fetch(ipAddress + '/api/user/' + userId + '/events?type=going', {headers: {'X-BLACKCAT-TOKEN': credential}})
        .then(response => response.ok? response.json(): false)
        .then(body => body? dispatch(receiveUserGoing(body)): console.log('fail to fetch user going'))
}

export const requestUserPast = (userId, credential) => dispatch => {
    dispatch(requestingUserPast())
    return fetch(ipAddress + '/api/user/' + userId + '/events?type=past', {headers: {'X-BLACKCAT-TOKEN': credential}})
        .then(response => response.ok? response.json(): false)
        .then(body => body? dispatch(receiveUserPast(body)): console.log('fail to fetch user past'))
}
