import React from 'react'
import { connect } from 'react-redux'
import { selectingChannel, removingChannel } from '../actions'
import { browserHistory } from 'react-router'
import '../sass/banner.scss'


class Banner extends React.Component {
    constructor(){
        super()
        this.state = {

        }
    }
    handleClickAvatar(e){
        e.preventDefault()
        browserHistory.push('/profile')
    }
    render(){
        // const { userInfo } = this.props.userInfo
        return (
            <div className='banner-container'>
                <div className='banner-search' onClick={this.props.handleClickSearchBar}>
                </div>
                <div className='banner-logo'>
                </div>
                <div className='banner-avatar' onClick={(e) => this.handleClickAvatar(e)}>
                    <img src={this.props.userInfo.avatar} className='banner-avatar-image'/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { dispatch } = state
    return { dispatch }
}


export default connect(mapStateToProps)(Banner)
