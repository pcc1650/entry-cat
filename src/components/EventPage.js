import React from 'react'
import { connect } from 'react-redux'
import { requestPosts, switchingSearchBar, requestChannels, selectingChannel, removingChannel, requestComments, postComment, enableCommentInput, disableCommentInput, sendLike, cancelLike, requestLikedUsers, sendJoin, cancelJoin, requestJoinedUsers} from '../actions'
import PostThumbnail, { downBorder } from './PostThumbnail'
import Comment from './Comment'
import Comments from './Comments'
import CommentInput from './CommentInput'
import Banner from './Banner'
import '../sass/event.scss'

class EventPage extends React.Component {
    constructor(){
        super()
        this.state = {
            commentInputContent: '',
            liked: false,
            joined: false,
        }
    }

    componentWillMount(){
        // console.log(this.props.params.id)
        const { dispatch, userToken: credential} = this.props
        dispatch(requestComments(this.props.params.id, credential))
        dispatch(requestLikedUsers(this.props.params.id, credential))
        dispatch(requestJoinedUsers(this.props.params.id, credential))

    }

    componentWillReceiveProps(nextProps){
        const { dispatch, userToken: credential, isPosted, replyTo, likedUsers, userInfo, sentLike, joinedUsers} = nextProps
        // update comments
        if(isPosted){
            dispatch(requestComments(this.props.params.id, credential))
        }
        // set reply someone
        const standardReply = replyTo!==''? '@'+replyTo+': ': ''
        this.setState({commentInputContent: standardReply})
        // judge if user already liked this post
        let likedUserSet= new Set()
        likedUsers.map(likedUser => likedUserSet.add(likedUser.username))
        likedUserSet.has(userInfo.username) ? this.setState({liked: true}): this.setState({liked: false})
        // judge if user already joined this post
        let joinedUserSet= new Set()
        joinedUsers.map(joinedUser => joinedUserSet.add(joinedUser.username))
        joinedUserSet.has(userInfo.username) ? this.setState({joined: true}): this.setState({joined: false})
    }

    handleCommentChange(content){
        this.setState({
            commentInputContent: content,
        })
    }

    handleClickComment(e){
        const { dispatch } = this.props
        e.preventDefault();
        dispatch(enableCommentInput())
    }

    handleClickCancel(e){
        const { dispatch } = this.props
        e.preventDefault();
        dispatch(disableCommentInput())
    }

    handleClickSend(e){
        e.preventDefault()
        const comment = this.state.commentInputContent
        const { dispatch, userToken: credential} = this.props
        dispatch(postComment(comment, this.props.params.id, credential))
        dispatch(disableCommentInput())
    }

    handleClickLike(e){
        const { dispatch, userToken: credential, liked, userInfo} = this.props
        e.preventDefault()
        this.state.liked? dispatch(cancelLike(this.props.params.id, credential, userInfo.id)): dispatch(sendLike(this.props.params.id, credential))
        setTimeout(()=>{
            dispatch(requestLikedUsers(this.props.params.id, credential))
        }, 100)
    }

    handleClickJoin(e){
        const { dispatch, userToken: credential, joined, userInfo} = this.props
        e.preventDefault()
        this.state.joined? dispatch(cancelJoin(this.props.params.id, credential, userInfo.id)): dispatch(sendJoin(this.props.params.id, credential))
        setTimeout(()=>{
            dispatch(requestJoinedUsers(this.props.params.id, credential))
        }, 100)
    }


    render() {
        const { userInfo, posts, comments, commentInput, replyTo, likedUsers} = this.props
        const { id } = this.props.params
        const post = posts.filter(post => post.id == id)
        const postInfo = post[0]
        const beginTime = new Date(postInfo['begin_time']*1000)
        const endTime = new Date(postInfo['end_time']*1000)
        const indexPath = false
        const createTime = postInfo['create_time'] * 1000
        const currentTime =  + new Date()
        const daysBefore = Math.round((currentTime - createTime)/(24*60*60*1000))

        
        return (
            <div>
                <Banner userInfo={userInfo}  indexPath={indexPath}/>
                <div className='event-channel-container-container'>
                    <div className='event-channel-container'>
                        <div className='event-channel'>
                            {postInfo['channel']['name']}
                        </div>
                    </div>
                </div>
                <div className='event-title'>
                    {postInfo['name']}
                </div>
                <div className='evnet-userInfo-container'>
                    <img src={postInfo['creator']['avatar']} className='event-userInfo-img'/>
                    <div className='event-userInfo-words'>
                        <div className='event-userInfo-username'>{postInfo['creator']['username']}</div>
                        <div className='event-userInfo-pubTime'>Published {daysBefore} days ago</div>
                    </div>
                </div>
                <div style={tabStyle}>
                    <div style={singleTab}>
                        <a href='#' >Details </a>
                    </div>
                    <div style={singleTab}>
                        <a href='#participants' >Participants </a>
                    </div>
                    <div style={singleTab}>
                        <a href='#comments' >Comments </a>
                    </div>
                </div>
                <div>
                    <p>{postInfo['description']}</p>
                </div>
                <div style={ downBorder }>
                </div>
                <div>
                    <p>When</p>
                    <span>{beginTime.toLocaleDateString() + ' ' + beginTime.toLocaleTimeString()}    </span>
                    <span>{endTime.toLocaleDateString() + ' ' + endTime.toLocaleTimeString()}</span>
                </div>
                <div style={ downBorder }>
                </div>
                <div>
                    <p>Where</p>
                    <p>{postInfo['location']}</p>
                </div>
                <div style={ downBorder }>
                </div>
                <div id='participants'>
                    <p>{postInfo['goings_count']} going</p>
                </div>
                <div style={ downBorder }>
                </div>
                <div>
                    <p>{likedUsers.length} likes</p>
                </div>
                <div style={ downBorder }>
                </div>
                <div id='comments'>
                    <Comments  style={commentsStyle} comments={comments} />
                </div>
                {!commentInput ?
                    (<div>
                        <button onClick={(e) => this.handleClickComment(e)}>Comment</button>
                        <button onClick={(e) => this.handleClickLike(e)}>{this.state.liked? <p>liked</p>:<p>like</p>}</button>
                        <button onClick={(e) => this.handleClickJoin(e)}>{this.state.joined? <p>joined</p>:<p>join</p>}</button>
                    </div>) :
                    <div>
                        <button onClick={(e) => this.handleClickCancel(e)}>Cancel</button>
                        <CommentInput value={this.state.commentInputContent} handleCommentChange={(e) => this.handleCommentChange(e)}/>
                        <button onClick={(e) => this.handleClickSend(e)}>Send</button>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { loginRequest, fetchPosts, fetchComments, postCommentRequest, toggleCommentInput, toggleEventLike, fetchLikedUsers, fetchJoinedUsers } = state
    const {
        userInfo,
        userToken,
    } = loginRequest

    const {
        posts,
    } = fetchPosts

    const {
        comments,
    } = fetchComments

    const {
        isPostingComment, isPosted
    } = postCommentRequest

    const {
        replyTo,
        commentInput,
    } = toggleCommentInput

    const {
        isSendingLike, sentLike
    } = toggleEventLike

    const {
        isFetchingLikedUsers, likedUsers
    } = fetchLikedUsers

    const {
        isFetchingJoinedUsers, joinedUsers
    } = fetchJoinedUsers

    return {
        userInfo,
        userToken,
        posts,
        comments,
        isPostingComment,
        isPosted,
        replyTo,
        commentInput,
        isSendingLike,
        sentLike,
        isFetchingLikedUsers,
        likedUsers,
        isFetchingJoinedUsers,
        joinedUsers,
    }
}



export const tabStyle = {
    display: "flex",
    flexDirection: "row",
    width: "1000px",
    height: "120px",
    backgroundColor: "#EEE",
    position: "sticky",
    top: "50vh",
    position: "-webkit-sticky",
}


export const singleTab = {
    width: "333px",
    height: "100px",
    border: "1px solid black",
    padding: "2px",
}

const commentsStyle = {
    width: "1000px",
    backgroundColor: "#EEE",
}


export default connect(mapStateToProps)(EventPage)
