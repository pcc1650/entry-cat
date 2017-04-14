import React from 'react'
import { connect } from 'react-redux'
import { requestPosts, switchingSearchBar, requestChannels, selectingChannel, removingChannel } from '../actions'
import PostThumbnail from './PostThumbnail'
import SearchBar from './SearchBar'
import{ browserHistory } from 'react-router'
import Banner from './Banner'
import '../sass/index.scss'

class Index extends React.Component {
    componentWillMount(){
        const { dispatch, userToken: credential} = this.props
        dispatch(requestPosts(credential))
        dispatch(requestChannels(credential))
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
        const { userInfo, isFetchingPosts, posts, searchBar, channels, selectedChannel } = this.props
        const username = userInfo.username
        return (
            <div className='index-container'>
                {searchBar &&
                <SearchBar channels={channels} className='searchBar-container'/>
                }
                <div className='index-mainpage-container'>
                    <Banner userInfo={userInfo} handleClickSearchBar={(e) => this.handleSearchBarButton(e)}/>
                    <div>
                        {isFetchingPosts &&
                            <h2>Fetching Posts</h2>
                        }
                    </div>
                    <div style={marginStyle}></div>
                    <div>
                        {
                            posts.map((post) => {
                                return <PostThumbnail key={post['id']} post={post}
                                onClick={() => this.handleClickEvent(post['id'])}/>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { loginRequest, fetchPosts, switchSearchBar, fetchChannels, selectChannel } = state
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
    return {
        userInfo,
        userToken,
        isFetchingPosts,
        posts,
        searchBar,
        isFetchingChannels,
        channels,
        selectedChannel,
    }
}


export default connect(mapStateToProps)(Index)

const marginStyle = {
    "marginTop": "10vh",
}
