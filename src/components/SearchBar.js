import React from 'react'
import { connect } from 'react-redux'
import Channels from './Channels'
import { requestPosts, requestPostsWithFilter, switchingSearchBar } from '../actions'
import '../sass/searchBar.scss'

class SearchBar extends React.Component {
    constructor(){
        super()
    }
    handleClick(e){
        e.preventDefault()
        const {dispatch, selectedChannel, userToken: credential} = this.props
        let filterCondition = {}
        filterCondition['selectedChannel'] = selectedChannel
        dispatch(switchingSearchBar())
        selectedChannel.includes('all')? dispatch(requestPosts(credential)): dispatch(requestPostsWithFilter(credential, filterCondition))
    }
    render(){
        return (
            <div>
                <Channels channels={this.props.channels}/>
                <button onClick={(e) => this.handleClick(e)}> Search </button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {loginRequest, fetchPosts, switchSearchBar, selectChannel } = state
    const {
        userToken,
    } = loginRequest

    const {
        isFetchingPosts, posts,
    } = fetchPosts

    const {
        searchBar
    } = switchSearchBar

    const {
        selectedChannel
    } = selectChannel
    return {
        userToken,
        isFetchingPosts,
        posts,
        searchBar,
        selectedChannel,
    }
}


export default connect(mapStateToProps)(SearchBar)
