import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import '../sass/PostThumbnail.scss'
import '../sass/downBorder.scss'
import {dateFormat} from '../date.js'

export default class PostThumbnail extends React.Component {
    constructor(){
        super()
    }
    render(){
        const { post, onClick } = this.props

        // username={post['creator']['username']} channel={post['channel']['name']} title={post['name']} startDate={post['begin_time']} endDate={post['end_time']} description={post['description']} id={post['id']}
        const username = post.creator.username
        const avatar = post.creator.avatar
        const channel = post.channel.name
        const title = post.name
        const startDate = post.begin_time
        const endDate = post.end_time
        const description = post.description
        const id = post.id
        const standardStartDate = new Date(startDate*1000)
        const standardEndDate = new Date(endDate*1000)
        const descriptionRestricted = description.length > 300 ? description.substring(0, 300) + '...' : description

        const userLike = this.props.userLike.events
        const userGoing = this.props.userGoing.events

        let userLikeId = []
        let userGoingId = []

        if(userLike && userLike.length !== 0){
            userLikeId = userLike.map(like => like.id)
        }

        if(userGoing && userGoing.length !== 0){
            userGoingId = userGoing.map(going => going.id)
        }

        return (
            <div onClick={onClick} className='postThumbnail-container'>
                <div className='postThumbnail-user-info'>
                    <img className='postThumbnail-userImg' src={avatar} />
                    <div className='postThumbnail-username'>{ username} </div>
                    <div className='postThumbnail-channel-container' >
                        <div className='postThumbnail-channel'>{ channel }</div>
                    </div>
                </div>
                <div className='postThumbnail-title'>
                    { title }
                </div>
                <div className='postThumbnail-time-container'>
                    <img src='../SVGs/time-index.svg' className='postThumbnail-time-logo'/>
                    <div className='postThumbnail-time'>
                    { dateFormat(standardStartDate, "dd mmm yyyy HH:MM:ss")} -
                    { ' ' + dateFormat(standardEndDate, "dd mmm yyyy HH:MM:ss") }
                    </div>
                </div>
                <div className='postThumbnail-description'>
                    { descriptionRestricted }
                </div>
                <div className='postThumbnail-going-like'>
                    {userGoingId.includes(id) ?
                        <div className='postThumbnail-going-like-true'>
                            <img src='../SVGs/checked-index.svg' className='postThumbnail-going-like-logo' />
                            <div>I am going</div>
                        </div> :
                        <div className='postThumbnail-going-like-false'>
                            <img src='../SVGs/check-index.svg' className='postThumbnail-going-like-logo' />
                            <div>0 Going</div>
                        </div>
                    }
                    {userLikeId.includes(id) ?
                        <div className='postThumbnail-going-like-true'>
                            <img src='../SVGs/liked-index.svg' className='postThumbnail-going-like-logo' />
                            <div>I like it</div>
                        </div> :
                        <div className='postThumbnail-going-like-false'>
                            <img src='../SVGs/like-index.svg' className='postThumbnail-going-like-logo' />
                            <div>0 Like</div>
                        </div>
                    }
                </div>
                <div className='downBorder'>
                </div>
            </div>
        )
    }
}

// const PostThumbnailStyle = {
//     height: "500px",
//     width: "1000px",
//     border: "1px solid black",
//     padding: "2px",
// }
