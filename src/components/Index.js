import React from 'react'
import { connect } from 'react-redux'
import { requestPosts, switchingSearchBar, requestChannels, selectingChannel, removingChannel, requestUserLike, requestUserGoing } from '../actions'
import PostThumbnail from './PostThumbnail'
import SearchBar from './SearchBar'
import{ browserHistory } from 'react-router'
import Banner from './Banner'
import '../sass/index.scss'

class Index extends React.Component {
    componentWillMount(){
        const { dispatch, userToken: credential, userInfo} = this.props
        dispatch(requestPosts(credential))
        dispatch(requestChannels(credential))
        dispatch(requestUserLike(userInfo.id, credential))
        dispatch(requestUserGoing(userInfo.id, credential))
    }
    handleSearchBarButton(e){
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(switchingSearchBar())
    }
    handleClickEvent(id){
        const { posts } = this.props
        browserHistory.push('/event/' + id)
    }
    // handleProfileButton(e){
    //     e.preventDefault()
    //     browserHistory.push('/profile')
    // }


    render() {
        const { userInfo, isFetchingPosts, posts, searchBar, channels, selectedChannel, userLike, userGoing } = this.props

        const indexPath = true
        return (
            <div className='index-container'>
                <div className='index-searchBar-container'>
                    <SearchBar channels={channels} />
                </div>
{/*                <div className='index-mainpage-container'> */}
                <Banner userInfo={userInfo} handleClickSearchBar={(e) => this.handleSearchBarButton(e)} indexPath={indexPath}/>
                {/*isFetchingPosts &&
                    <h2>Fetching Posts</h2>
                */}
                <div className='index-mainpage-container'>
                {
                    posts.map((post) => {
                        return <PostThumbnail key={post['id']} post={post} userLike={userLike} userGoing={userGoing}
                        onClick={() => this.handleClickEvent(post['id'])}/>
                    })
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { loginRequest, fetchPosts, switchSearchBar, fetchChannels, selectChannel, fetchUserLike, fetchUserGoing } = state
    const {
        userInfo,
        userToken,
    } = loginRequest

    const {
        isFetchingPosts, posts,
    } = fetchPosts

    const {
        searchBar
    } = switchSearchBar

    const {
        isFetchingChannels, channels,
    } = fetchChannels

    const {
        selectedChannel
    } = selectChannel
    const {
        userLike
    } = fetchUserLike
    const {
        userGoing
    } = fetchUserGoing
    return {
        userInfo,
        userToken,
        isFetchingPosts,
        posts,
        searchBar,
        isFetchingChannels,
        channels,
        selectedChannel,
        userLike,
        userGoing,
    }
}


export default connect(mapStateToProps)(Index)

const marginStyle = {
    "marginTop": "10vh",
}
