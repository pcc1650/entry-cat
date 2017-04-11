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
// export const CHANGE_SENTLIKE_FALSE = 'CHANGE_SENTLIKE_FALSE'



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

// export const changeSentLikeFalse = () => ({
//     type: CHANGE_SENTLIKE_FALSE,
// })

export const requestPosts = (credential) => dispatch => {
    dispatch(requestingPosts())
    return fetch('http://blackcat.dev/api/events', {headers: {'X-BLACKCAT-TOKEN': credential}})
        .then(response => response.ok? response.json(): false)
        .then(body => body? dispatch(receivePosts(body)): console.log('fail to fetch posts'))
}

export const requestPostsWithFilter = (credential, filterCondition) => dispatch => {
    let url = 'http://blackcat.dev/api/events?channels=' + filterCondition.selectedChannel.toString()
    dispatch(requestingPosts())
    return fetch(url, {headers: {'X-BLACKCAT-TOKEN': credential}})
        .then(response => response.ok? response.json(): false)
        .then(body => body? dispatch(receivePosts(body)): console.log('fail to fetch filtered posts'))
}

export const requestChannels = (credential) => dispatch => {
    dispatch(requestingChannels())
    return fetch('http://blackcat.dev/api/channels', {headers: {'X-BLACKCAT-TOKEN': credential}})
        .then(response => response.ok? response.json(): false)
        .then(body => body? dispatch(receiveChannels(body)): console.log('fail to fetch channels'))
}


export const requestComments = (eventId, credential) => dispatch => {
    let url = 'http://blackcat.dev/api/event/'+eventId+'/comments'
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
    return fetch('http://blackcat.dev/api/auth/token', {method: 'POST', body: form})
    // return fetch('http://blackcat.dev/api/events', {headers: {'X-BLACKCAT-TOKEN': 'NwvrPWAgXWVBVvO4tdYrUJs3MtrGAlh6'}})
    // .then(response => response.ok? dispatch(loginRequestSucc(response.json())): dispatch(loginRequestFail()))
    .then(response => response.ok? response.json(): false)
    .then(body => body? dispatch(loginRequestSucc(body)): dispatch(loginRequestFail()))
}

export const postComment = (comment, eventId, credential) => dispatch => {
    dispatch(postingComment())
    let form = new FormData()
    form.append('comment', comment)
    return fetch('http://blackcat.dev/api/event/' + eventId + '/comments', {method: 'POST', body: form, headers: {'X-BLACKCAT-TOKEN': credential}})
    .then(response => response.ok? dispatch(postCommentSucc()): dispatch(postCommentFail()))
    .then(setTimeout(()=>{
        dispatch(changeIsPostedFalse())
    }, 500))
}

export const sendLike = (eventId, credential) => dispatch => {
    dispatch(sendingLike())
    return fetch('http://blackcat.dev/api/event/' + eventId + '/likes', {method: 'POST', headers: {'X-BLACKCAT-TOKEN': credential}})
    .then(response => response.ok? dispatch(sendLikeSucc()): dispatch(sendLikeFail()))
}

export const cancelLike = (eventId, credential, userId) => dispatch => {
    dispatch(sendingLike())
    return fetch('http://blackcat.dev/api/event/' + eventId + '/likes/' + userId, {method: 'DELETE', headers: {'X-BLACKCAT-TOKEN': credential}})
    .then(response => response.ok? dispatch(sendLikeSucc()): dispatch(sendLikeFail()))
}

export const requestLikedUsers = (eventId, credential) => dispatch => {
    dispatch(requestingLikedUsers())
    return fetch('http://blackcat.dev/api/event/' + eventId + '/likes', {headers: {'X-BLACKCAT-TOKEN': credential}})
        .then(response => response.ok? response.json(): false)
        .then(body => body? dispatch(receiveLikedUsers(body)): console.log('fail to fetch posts'))
}
