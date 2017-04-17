import React from 'react'
import { connect } from 'react-redux'
import { requestPosts, switchingSearchBar, requestChannels, selectingChannel, removingChannel, requestComments, postComment, enableCommentInput, disableCommentInput, sendLike, cancelLike, requestLikedUsers, sendJoin, cancelJoin, requestJoinedUsers} from '../actions'
import PostThumbnail, { downBorder } from './PostThumbnail'
import Comment from './Comment'
import Comments from './Comments'
import CommentInput from './CommentInput'
import Banner from './Banner'
import {dateFormat} from '../date.js'
import '../sass/event.scss'
import '../sass/downBorder.scss'
import '../sass/separator.scss'

class EventPage extends React.Component {
    constructor(){
        super()
        this.state = {
            commentInputContent: '',
            liked: false,
            joined: false,
            tab: 'details',
            message: '',
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
        // e.preventDefault();
        dispatch(enableCommentInput())
    }

    handleClickCancel(e){
        const { dispatch } = this.props
        // e.preventDefault();
        dispatch(disableCommentInput())
    }

    handleClickSend(e){
        // e.preventDefault()
        const comment = this.state.commentInputContent
        const { dispatch, userToken: credential} = this.props
        dispatch(postComment(comment, this.props.params.id, credential))
        dispatch(disableCommentInput())
        this.setState({message: 'comment sending...'})
        this.showFunction()
    }

    handleClickLike(e){
        const { dispatch, userToken: credential, liked, userInfo} = this.props
        // e.preventDefault()
        this.state.liked? dispatch(cancelLike(this.props.params.id, credential, userInfo.id)): dispatch(sendLike(this.props.params.id, credential))
        setTimeout(()=>{
            dispatch(requestLikedUsers(this.props.params.id, credential))
        }, 100)
    }

    handleClickJoin(e){
        const { dispatch, userToken: credential, joined, userInfo, posts} = this.props
        // e.preventDefault()
        this.state.joined? dispatch(cancelJoin(this.props.params.id, credential, userInfo.id)): dispatch(sendJoin(this.props.params.id, credential))
        setTimeout(()=>{
            dispatch(requestJoinedUsers(this.props.params.id, credential))
        }, 100)

        const { id } = this.props.params
        const post = posts.filter(post => post.id == id)
        const postInfo = post[0]
        const now = + new Date()
        if(now > postInfo['end_time'] * 1000){
            this.setState({message:'Can not join expired event'})
            this.showFunction()
        }
    }


    handleClickDetailsTab(e){
        document.location.href = '#'
        this.setState({tab: 'details'})
    }

    handleClickCommentsTab(e){
        document.location.href = '#comments'
        this.setState({tab: 'comments'})
    }

    handleClickParticipantsTab(e){
        document.location.href = '#participants'
        this.setState({tab: 'participants'})
    }

    showFunction() {
        var x = document.getElementById("snackbar")
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1500);
    }


    render() {
        console.log("***")
        console.log(this.props)
        const { userInfo, posts, comments, commentInput, replyTo, likedUsers, joinedUsers} = this.props
        const { id } = this.props.params
        const post = posts.filter(post => post.id == id)
        const postInfo = post[0]
        const beginTime = new Date(postInfo['begin_time']*1000)
        const endTime = new Date(postInfo['end_time']*1000)
        const indexPath = false
        const createTime = postInfo['create_time'] * 1000
        const currentTime =  + new Date()
        const daysBefore = Math.round((currentTime - createTime)/(24*60*60*1000))

        const description = postInfo['description']
        const descriptionRestricted = description.length > 300 ? description.substring(0, 300) + '...' : description


        return (
            <div className='event-container'>
                <div id="snackbar">{this.state.message}</div>
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
                <div className='event-userInfo-container'>
                    <img src={postInfo['creator']['avatar']} className='event-userInfo-img'/>
                    <div className='event-userInfo-words'>
                        <div className='event-userInfo-username'>{postInfo['creator']['username']}</div>
                        <div className='event-userInfo-pubTime'>Published {daysBefore} days ago</div>
                    </div>
                </div>
                <div className='downBorder'></div>
                <div className='event-tab-wrapper'>
                        <div className='event-single-tab-container'>
                        {this.state.tab == 'details'?
                            <img src='../SVGs/info-event.svg' className='event-tab-img' /> :
                            <img src='../SVGs/info-outline-event.svg' className='event-tab-img' />
                        }
                            <input type="radio" name="tab-radio" className="event-tab-radio" id="tab-radio-1" defaultChecked />
                            <label htmlFor="tab-radio-1" className="event-tab-handler" onClick={(e) => this.handleClickDetailsTab(e)}>Details</label>
                        </div>
                        <div className='separator'></div>
                        <div className='event-single-tab-container'>
                        {this.state.tab == 'participants'?
                            <img src='../SVGs/people-event.svg' className='event-tab-img' /> :
                            <img src='../SVGs/people-outline-event.svg' className='event-tab-img' />
                        }
                            <input type="radio" name="tab-radio" className="event-tab-radio" id="tab-radio-2" />
                            <label htmlFor="tab-radio-2" className="event-tab-handler" onClick={(e) => this.handleClickParticipantsTab(e)}>Participants</label>
                        </div>
                        <div className='separator'></div>
                        <div className='event-single-tab-container'>
                        {this.state.tab == 'past'?
                            <img src='../SVGs/comment-event.svg' className='event-tab-img' /> :
                            <img src='../SVGs/comment-outline-event.svg' className='event-tab-img' />
                        }
                        <input type="radio" name="tab-radio" className="event-tab-radio" id="tab-radio-3" />
                        <label htmlFor="tab-radio-3" className="event-tab-handler" href='#comments' onClick={(e) => this.handleClickCommentsTab(e) }>Comments</label>
                        </div>
                </div>
                <div className='downBorder'></div>
                <div className='event-description'>
                    <div className='event-description-words'>
                        {description}
                    </div>
                </div>
                <div className='downBorder'>
                </div>
                <div className='event-when-container'>
                    <div className='event-when-title'>
                        <div className='event-when-decorator'></div>
                        <div className='event-when-words'>When</div>
                    </div>
                    <div className='event-when-time'>
                        <div className='event-when-beginTime'>
                            <div className='event-when-date'>
                                <img src='../SVGs/date-from-event.svg' className='event-when-logo' />
                                <div>{dateFormat(beginTime, "dd mmmm yyyy")}</div>
                            </div>
                            <div className='event-when-hour'>
                            <div className='event-when-hour-hour'>
                                {dateFormat(beginTime, "H:MM")}
                            </div>
                            <div className='event-when-hour-am'>
                                {dateFormat(beginTime, "tt")}
                            </div>
                            </div>
                        </div>
                        <div className='event-when-separator'></div>
                        <div className='event-when-endTime'>
                            <div className='event-when-date'>
                                <img src='../SVGs/date-to-event.svg' className='event-when-logo' />
                                <div>{dateFormat(endTime, "dd mmmm yyyy")}</div>
                            </div>
                            <div className='event-when-hour'>
                                <div className='event-when-hour-hour'>
                                    {dateFormat(beginTime, "H:MM")}
                                </div>
                                <div className='event-when-hour-am'>
                                    {dateFormat(beginTime, "tt")}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='downBorder'>
                </div>
                <div className='event-where-container'>
                    {/* the same with when style*/}
                    <div className='event-where-title'>
                        <div className='event-where-decorator'></div>
                        <div className='event-where-words'>Where</div>
                    </div>
                    <div className='event-where-info'>{postInfo['location']}</div>
                </div>

                <div className='downBorder-30'>
                </div>
                <div id='participants'className='event-going-container'>
                    <img src='../SVGs/check-index.svg' className='event-going-logo' />
                    <div className='event-going-words'>
                        {joinedUsers.length} going
                    </div>
                    <div>
                    {
                        joinedUsers.map(joinedUser =>
                            <img key={joinedUser.id} src={joinedUser.avatar} className='event-going-avatars' />
                        )
                    }
                    </div>
                </div>

                <div className='downBorder-30'>
                </div>

                {/* the same with going */}
                <div className='event-going-container'>
                    <img src='../SVGs/like-index.svg' className='event-going-logo' />
                    <div className='event-going-words'>
                        {likedUsers.length} like
                    </div>
                    <div>
                    {
                        likedUsers.map(likedUser =>
                            <img key={likedUser.id} src={likedUser.avatar} className='event-going-avatars' />
                        )
                    }
                    </div>
                </div>



                <div className='downBorder'>

                </div>
                <div id='comments' className='event-comments-container'>
                    <Comments comments={comments} />
                </div>


                {!commentInput ?
                    <div className='event-operation-container'>
                        <div className='event-operation-purple'>
                            <div className='event-operation-comment' onClick={(e) => this.handleClickComment(e)}>
                                <img src='../SVGs/comment-single.svg' className='event-operation-logo' />
                            </div>
                            <div className='event-operation-like' onClick={(e) => this.handleClickLike(e)}>
                            {this.state.liked?
                                <img src='../SVGs/liked-index.svg' className='event-operation-logo' />:
                                <img src='../SVGs/like-outline.svg' className='event-operation-logo' />
                            }
                            </div>
                        </div>
                        <div className='event-operation-green' onClick={(e) => this.handleClickJoin(e)}>
                        {this.state.joined?
                            <img src='../SVGs/checked-joined.svg' className='event-operation-logo'  />:
                            <img src='../SVGs/check-outline.svg' className='event-operation-logo'  />
                        }
                            <div>{this.state.joined? <p>joined</p>:<p>join</p>}</div>
                        </div>
                    </div>
                    :
                    <div className='event-operation-comment-container'>
                        <div className='event-operation-comment-purple' >
                            <img src='../SVGs/cross.svg' className='event-operation-comment-cancel-logo' onClick={(e) => this.handleClickCancel(e)}/>
                            <CommentInput value={this.state.commentInputContent} handleCommentChange={(e) => this.handleCommentChange(e)}/>
                        </div>
                        <div className='event-operation-comment-green' onClick={(e) => this.handleClickSend(e)}>
                            <img src='../SVGs/send.svg' className='event-operation-comment-logo' />
                        </div>
                    </div>
                }
                <div className='event-bottom-margin'></div>
                {/*!commentInput ?
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
                */}
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



// export const tabStyle = {
//     display: "flex",
//     flexDirection: "row",
//     width: "1000px",
//     height: "120px",
//     backgroundColor: "#EEE",
//     position: "sticky",
//     top: "50vh",
//     position: "-webkit-sticky",
// }


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
{/*
            <span>{endTime.toLocaleDateString() + ' ' + endTime.toLocaleTimeString()}</span>
*/}

export default connect(mapStateToProps)(EventPage)
