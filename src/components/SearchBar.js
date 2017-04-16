import React from 'react'
import { connect } from 'react-redux'
import Channels from './Channels'
import { requestPosts, requestPostsWithFilter, switchingSearchBar } from '../actions'
import '../sass/searchBar.scss'
import { dateFormat } from '../date.js'



class SearchBar extends React.Component {
    constructor(){
        super()
    }
    handleClick(e){
        e.preventDefault()
        const {dispatch, selectedChannel, userToken: credential} = this.props
        let filterCondition = {}
        filterCondition['selectedChannel'] = selectedChannel

        const beginDate = document.getElementById('startDate')
        const endDate = document.getElementById('endDate')


        const beginDateTimestamp = + new Date(beginDate.value)
        const endDateTimestamp = + new Date(endDate.value)

        filterCondition['after'] = beginDateTimestamp / 1000;
        filterCondition['before'] = endDateTimestamp / 1000;

        // dispatch(switchingSearchBar())
        // selectedChannel.includes('all')? dispatch(requestPosts(credential)):
        dispatch(requestPostsWithFilter(credential, filterCondition))
    }
    render(){
        // let x = document.getElementById('startDate')
        // if(x !== null){
        //     let y = + new Date(x.value)
        //     console.log(y)
        // }
        const now = + new Date();
        const defaultTime = dateFormat(now, "yyyy-mm-dd")

        return (
            <div className='searchBar-container'>
                <div>
                    <div className='searchBar-date-container'>
                        <div className='searchBar-date-title'>Date</div>
                        <div className='searchBar-date-underline'></div>
                        <div className='searchBar-date-date-container'>
                            <input type='date' id='startDate' defaultValue={defaultTime} className='searchBar-date-timepicker'/>
                            <img className='searchBar-date-img' src='../SVGs/date-from-event.svg'/>
                            <input type='date' id='endDate' defaultValue={defaultTime} className='searchBar-date-timepicker'/>
                        </div>
                    </div>
                    <Channels channels={this.props.channels}/>
                </div>
                <div onClick={(e) => this.handleClick(e)} className='searchBar-search-container'> Search </div>
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
