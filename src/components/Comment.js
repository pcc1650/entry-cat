import React from 'react'
import { connect } from 'react-redux'
import { downBorder } from './PostThumbnail'
import { replyComment } from '../actions'

class Comment extends React.Component {
    constructor(){
        super()
    }
    handleClickReply(e){
        e.preventDefault()
        const{ dispatch, username } = this.props
        dispatch(replyComment(username))
    }
    render(){
        const { avatar, username, time, comment } = this.props
        const standardTime = new Date(time*1000)
        return (
            <div>
                <div>
                    <img src={avatar}/>
                </div>
                <div>
                    { username }
                </div>
                <div>
                    { standardTime.toLocaleDateString() + ' ' + standardTime.toLocaleTimeString() }
                </div>
                <div>
                    { comment }
                </div>
                <button onClick={(e) => this.handleClickReply(e)}> Reply </button>
                <div style={ downBorder }>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { dispatch } = state
    return { dispatch }
}


export default connect(mapStateToProps)(Comment)
