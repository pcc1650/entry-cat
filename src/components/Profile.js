import React from 'react'
import { connect } from 'react-redux'
import { tabStyle, singleTab } from './EventPage'
import { requestUser, requestUserLike, requestUserGoing, requestUserPast } from '../actions'
import PostThumbnail from './PostThumbnail'



class Profile extends React.Component{
    constructor(){
        super()
        this.state = {
            tab: ''
        }
    }
    componentWillMount(){
        const {dispatch, userInfo, userToken: credential} = this.props
        dispatch(requestUser(userInfo.id, credential))
        dispatch(requestUserLike(userInfo.id, credential))
        dispatch(requestUserGoing(userInfo.id, credential))
        dispatch(requestUserPast(userInfo.id, credential))
    }
    componentWillReceiveProps(nextProps){
        const { userLike } = nextProps
        console.log("!@#")
        console.log(userLike)
        // to check if userLike is empty object
        // Object.keys(obj).length === 0 && obj.constructor === Object
        if(!(Object.keys(userLike).length === 0 && userLike.constructor === Object)){
            this.setState({tab:'likes'})
        }
    }
    handleClickLikes(e){
        e.preventDefault()
        this.setState({tab: 'likes'})
    }
    handleClickGoing(e){
        e.preventDefault()
        this.setState({tab: 'going'})
    }
    handleClickPast(e){
        e.preventDefault()
        this.setState({tab: 'past'})
    }
    render(){
        const { user, userLike, userGoing, userPast } = this.props
        // console.log('*********')
        // console.log(userLike.events)
        // console.log(userGoing.events)
        // console.log(userPast.events)
        // goings_count and past_count are reversed due to potential backend bug
        return (
            <div>
                <div>
                    <img src={user.avatar} />
                </div>
                <div>
                    {user.username}
                </div>
                <div>
                    {user.email}
                </div>
                <div style={tabStyle}>
                    <div style={singleTab}>
                        <button onClick={(e) => this.handleClickLikes(e)}>{user.likes_count} Likes </button>
                    </div>
                    <div style={singleTab}>
                        <button onClick={(e) => this.handleClickGoing(e)}>{user.past_count} Going </button>
                    </div>
                    <div style={singleTab}>
                        <button onClick={(e) => this.handleClickPast(e)}>{user.goings_count} Past </button>
                    </div>
                </div>
                <div>
                {this.state.tab == 'likes' &&
                 (!userLike.events.length == 0?
                    userLike.events.map(event => (<PostThumbnail key={event.id} post={event} />)):
                    <h2>No activity found</h2>)
                }
                {this.state.tab == 'going' &&
                 (!userGoing.events.length == 0?
                    userGoing.events.map(event => (<PostThumbnail key={event.id} post={event} />)):
                    <h2>No activity found</h2>)
                }
                {this.state.tab == 'past' &&
                 (!userPast.events.length == 0?
                    userPast.events.map(event => (<PostThumbnail key={event.id} post={event} />)):
                    <h2>No activity found</h2>)
                }
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    const { loginRequest, fetchUser, fetchUserLike, fetchUserGoing, fetchUserPast } = state
    const {
        userInfo,
        userToken,
    } = loginRequest
    const {
        isFetchingUser,
        user,
    } = fetchUser
    const {
        isFetchingUserLike,
        userLike,
    } = fetchUserLike
    const {
        isFetchingUserGoing,
        userGoing,
    } = fetchUserGoing
    const {
        isFetchingUserPast,
        userPast,
    } = fetchUserPast
    return {
        userInfo,
        userToken,
        isFetchingUser,
        user,
        isFetchingUserLike,
        userLike,
        isFetchingUserGoing,
        userGoing,
        isFetchingUserPast,
        userPast,
    }
}


export default connect(mapStateToProps)(Profile)
