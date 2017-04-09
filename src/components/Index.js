import React from 'react'
import { connect } from 'react-redux'
import { requestPosts, switchingSearchBar, requestChannels, selectChannel } from '../actions'
import PostThumbnail from './PostThumbnail'
import SearchBar from './SearchBar'

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
    render() {
        const { userInfo, isFetchingPosts, posts, searchBar, channels, selectedChannel } = this.props
        const username = userInfo.username
        console.log('***')
        console.log(selectedChannel)
        return (
            <div>
                <h1>Hello {username} !</h1>
                {isFetchingPosts &&
                    <h2>Fetching Posts</h2>
                }
                <div>
                    <button onClick={(e) => this.handleSearchBarButton(e)}> SearchBar </button>
                </div>
                {searchBar &&
                    <SearchBar channels={channels}/>
                }
                <div>
                    {
                        posts.map((post) => {
                            return <PostThumbnail key={post['id']} username={post['creator']['username']} channel={post['channel']['name']} title={post['name']} startDate={post['begin_time']} endDate={post['end_time']} description={post['description']}/>
                        })
                    }
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
