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
    hasMore: data.has_more
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

export const requestPosts = (credential) => dispatch => {
    dispatch(requestingPosts)
    return fetch('http://blackcat.dev/api/events', {headers: {'X-BLACKCAT-TOKEN': credential}})
        .then(response => response.ok? response.json(): false)
        .then(body => body? dispatch(receivePosts(body)): console.log('fail to fetch posts'))
}

export const requestChannels = (credential) => dispatch => {
    dispatch(requestingChannels)
    return fetch('http://blackcat.dev/api/channels', {headers: {'X-BLACKCAT-TOKEN': credential}})
        .then(response => response.ok? response.json(): false)
        .then(body => body? dispatch(receiveChannels(body)): console.log('fail to fetch channels'))

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
