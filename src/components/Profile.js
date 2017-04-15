import React from 'react'
import { connect } from 'react-redux'
import { tabStyle, singleTab } from './EventPage'
import { requestUser, requestUserLike, requestUserGoing, requestUserPast } from '../actions'
import PostThumbnail from './PostThumbnail'
import Banner from './Banner'
import '../sass/profile.scss'
import '../sass/downBorder.scss'
import '../sass/separator.scss'


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
        // to check if userLike is empty object
        // Object.keys(obj).length === 0 && obj.constructor === Object
        if(!(Object.keys(userLike).length === 0 && userLike.constructor === Object)){
            this.setState({tab:'likes'})
        }
    }
    handleClickLikes(e){
        this.setState({tab: 'likes'})
    }
    handleClickGoing(e){
        this.setState({tab: 'going'})
    }
    handleClickPast(e){
        this.setState({tab: 'past'})
    }
    render(){
        const { user, userLike, userGoing, userPast, userInfo} = this.props
        // console.log('*********')
        // console.log(userLike.events)
        // console.log(userGoing.events)
        // console.log(userPast.events)
        // goings_count and past_count are reversed due to potential backend bug
        const indexPath = false
        return (
            <div className='profile-container'>
                <Banner userInfo={userInfo}  indexPath={indexPath}/>
                <div style={marginStyle}></div>
                <div className='profile-userinfo'>
                    <div>
                        <div className='profile-avatar-container'>
                            <img src={user.avatar} className='profile-avatar'/>
                        </div>
                    </div>
                    <div className='profile-username'>
                        {user.username}
                    </div>
                    <div className='profile-email'>
                        <img src='../SVGs/email-profile.svg' className='profile-email-logo' />
                        <div>{user.email}</div>
                    </div>
                </div>
                <div className='downBorder'></div>
                {/*
                    <div className='profile-tabs'>
                        <div className='profile-tab' onClick={(e) => this.handleClickLikes(e)}>
                            <div>{user.likes_count} Likes</div>
                        </div>
                        <div className='separator'></div>
                        <div className='profile-tab' onClick={(e) => this.handleClickGoing(e)}>
                            <div>{user.past_count} Going</div>
                        </div>
                        <div className='separator'></div>
                        <div className='profile-tab' onClick={(e) => this.handleClickPast(e)}>
                            <div>{user.goings_count} Past</div>
                        </div>
                    </div>
                */}

                <div className='profile-tab-wrapper'>
                        <div className='profile-single-tab-container'>
                        {this.state.tab == 'likes'?
                            <img src='../SVGs/liked-profile.svg' className='profile-tab-img' /> :
                            <img src='../SVGs/like-outline-profile.svg' className='profile-tab-img' />
                        }
                            <input type="radio" name="tab-radio" className="profile-tab-radio" id="tab-radio-1" defaultChecked />
                            <label htmlFor="tab-radio-1" className="profile-tab-handler" onClick={(e) => this.handleClickLikes(e)}>{user.likes_count} Likes</label>
                        </div>
                        <div className='separator'></div>
                        <div className='profile-single-tab-container'>
                        {this.state.tab == 'going'?
                            <img src='../SVGs/checked-profile.svg' className='profile-tab-img' /> :
                            <img src='../SVGs/check-outline-profile.svg' className='profile-tab-img' />
                        }
                            <input type="radio" name="tab-radio" className="profile-tab-radio" id="tab-radio-2" />
                            <label htmlFor="tab-radio-2" className="profile-tab-handler" onClick={(e) => this.handleClickGoing(e)}>{user.past_count} Going</label>
                        </div>
                        <div className='separator'></div>
                        <div className='profile-single-tab-container'>
                        {this.state.tab == 'past'?
                            <img src='../SVGs/past-profile.svg' className='profile-tab-img' /> :
                            <img src='../SVGs/past-outline-profile.svg' className='profile-tab-img' />
                        }
                        <input type="radio" name="tab-radio" className="profile-tab-radio" id="tab-radio-3" />
                        <label htmlFor="tab-radio-3" className="profile-tab-handler" onClick={(e) => this.handleClickPast(e)}>{user.goings_count} Past</label>
                        </div>
                </div>

                <div className='downBorder'></div>
                <div>
                {this.state.tab == 'likes' &&
                 (!userLike.events.length == 0?
                    userLike.events.map(event => (<PostThumbnail key={event.id} post={event} userLike={userLike} userGoing={userGoing}/>)):
                    <div>
                    <img src='../SVGs/no-activity-profile.svg' className='profile-noActivity-img' />
                    <div className='profile-noActivity-word'>No activity found</div>
                    </div>
                )}
                {this.state.tab == 'going' &&
                 (!userGoing.events.length == 0?
                    userGoing.events.map(event => (<PostThumbnail key={event.id} post={event} userLike={userLike} userGoing={userGoing}/>)):
                    <div>
                    <img src='../SVGs/no-activity-profile.svg' className='profile-noActivity-img' />
                    <div className='profile-noActivity-word'>No activity found</div>
                    </div>
                )}
                {this.state.tab == 'past' &&
                 (!userPast.events.length == 0?
                    userPast.events.map(event => (<PostThumbnail key={event.id} post={event} userLike={userLike} userGoing={userGoing}/>)):
                    <div className='profile-no-activity'>
                    <img src='../SVGs/no-activity-profile.svg' className='profile-noActivity-img' />
                    <div className='profile-noActivity-word'>No activity found</div>
                    </div>
                )}
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

const marginStyle = {
    "marginTop": "7vh",
}
