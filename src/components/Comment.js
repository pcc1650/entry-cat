import React from 'react'
import { connect } from 'react-redux'
import { downBorder } from './PostThumbnail'
import { replyComment } from '../actions'
import '../sass/comment.scss'



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
        const { avatar, username, time, comment} = this.props
        const standardTime = new Date(time*1000)

        return (
            <div className='comment-container'>
                <img src={avatar} className='comment-avatar'/>
                <div className='comment-content-container'>
                    <div className='comment-content-info'>
                        <div>
                            <div className='comment-content-username'>
                                { username }
                            </div>
                            <div className='comment-content-time'>
                                { standardTime.toLocaleDateString() + ' ' + standardTime.toLocaleTimeString() }
                            </div>
                        </div>
                        <div className='comment-content-reply' onClick={(e) => this.handleClickReply(e)}></div>
                    </div>
                    <div className='comment-content'>
                        { comment }
                    </div>
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
